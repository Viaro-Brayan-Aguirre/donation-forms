import DonationAPI from './DonationAPI';

/***
 *  Stack of Http Request. handles request throws 401 and 403 status 
 * 
 * Instructions, you must call controlRequest for every request you want to handle 
 * Max number of tries of each request is 3
 * you have to add a request_id on the params  for the controlled request 
 * if request_id is not present, no error handler will be apply 
 */

 //stores request in process
var stack_of_request = []; 
var _request_id = 0;


//controls users http request to handle error 401 and 403
var controlRequest = function(target_function,input_params, ok_callback, bad_callback) {
    _request_id++;
    var new_request = {
      request_id: _request_id, 
      params: input_params,
      ok_callback: ok_callback,
      bad_callback: bad_callback,
      function: target_function,
      status: 'P',
      retries: 0
    };
    stack_of_request.push(new_request); 
    return new_request.request_id;
};

var clean_stack = function(completed){
    var completed_index = completed.length; 
    while(completed_index > 0 ){
      completed_index--;
      stack_of_request.splice(completed[completed_index],1);
    }
  };

  var sendRequest =  function (target_id){
    var completed_task = [];
    var max = stack_of_request.length; 
    var request_aux = 0;
    while(request_aux <  max){
        var val = stack_of_request[request_aux];
        if(val.request_id === target_id){
            //send request again
            val.retries++;
            if(val.retries === 3){
              val.status = 'F';
              val.bad_callback();
            } else {
              val.status = 'C';
              val.function(val.params,val.ok_callback,val.bad_callback );
            }
            
          }
          if(val.status === 'C'){
            completed_task.push(request_aux);
          }
          request_aux++;
    }
    clean_stack(completed_task);
  }

  var sendRequestFail =  function (target_id){
    var completed_task = [];
    var max = stack_of_request.length; 
    var task_index = 0;
    while(task_index <  max){
        var val = stack_of_request[task_index];
        if(val.request_id === target_id){
            val.status = 'C'
            val.bad_callback();
            return false; //break
        }
        if(val.status === 'C'){
            completed_task.push(task_index);
        }
        task_index++;
    }
    clean_stack(completed_task);
  }

  function setRequestOk(target_id){
    var stack_index = stack_of_request.length; 
    while(stack_index > 0 ){
      stack_index--;
      if(stack_of_request[stack_index].request_id === target_id){
        stack_of_request.splice(stack_of_request[stack_index],1);
        break;
      }
    }
  }

  //function test badRequest
  /*const _simulateFail = false;
  function fakeFail() {
      if(!_simulateFail){
          return false;
      }
      var fail_case = Math.round(Math.random() * 10); 
      var response = 
      return fail_case > 5;
  }
*/

  //validates response of request
  function validatesResponse(data){
      if(data.status == null || data.status === undefined || data.status === 500 || data.status === 404){
        return true; //no retries 
      }
      var request_id  = data.config.params.request_id;
      if(data.status === 200){
        //mark as good 
        setRequestOk(request_id);
        return true;
      }
      if(data.status === 401  ){ //app token has expired 
        DonationAPI.authApplication(sendRequest, sendRequestFail,request_id); 
      } else if (data.status === 403 ){ //Donor token has expired
        var credential = JSON.parse(window.sessionStorage.getItem('Donor_credentials'));
        DonationAPI.authDonor( credential,sendRequest, sendRequestFail,request_id);
      } else {
        sendRequestFail(request_id);
      }
      return false;
  }


  var RequestHandler = {
    controlRequest: controlRequest,
    validatesResponse: validatesResponse
    
  }

  export default RequestHandler; 


