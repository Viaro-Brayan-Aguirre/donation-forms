import axio from 'axios';
import RequestHandler from './RequestHandler';


var _apiKey = "mCmwcUxb2SRz/CEk9faYqdO8tFZvIN1mHo7fFcd2GUA=";
var _apiUrl = "https://qa-api.truist.com/api/";
var _auth = "Basic QVBJVXNlci1UZXN0OkFQSVVzZXItVGVzdA==";

//----------- calls To API 
//authenticate the app  
var authApplication = function(okCallback,badCallback,callback_params){
    let request_data = {}; 
    let request_config = {
        params: {
            "apiKey": _apiKey
        },
        headers: {
            "Authorization": _auth
        }
    };
    return axio.get(_apiUrl + "Application/Authenticate",request_config,request_data)
    .then(function (data) {
        if(data.status !== 200){
          badCallback(callback_params);
          return;
        }
        //stores the app token 
        window.localStorage.setItem('App_token_exp',(Date.now() + (1000*3600)));
        window.localStorage.setItem('App_token',data.data);
        okCallback(callback_params);
    })
    .catch(function (err) {
          badCallback(callback_params);
          return err;
    });
};


//authenticate the donor, credentials must contains campaignCode, username and password
var authDonor = function(credentials, okCallback, badCallback,callback_params){
    //controls the request
    var request_id = RequestHandler.controlRequest(authDonor,credentials,okCallback,badCallback);
    
    credentials.request_id = request_id;
    credentials.apiKey = _apiKey;

    let request_data = {}; 
    let request_config = {
        params: credentials,
        headers: {
            Authorization:  "Bearer "+window.localStorage.getItem('App_token')
        }
    };
    return axio.get(_apiUrl + "Donor/Authenticate",request_config,request_data)
    .then(function (data) {
        if(!RequestHandler.validatesResponse(data,request_id)){
          return;
        }
        //200 status response
        window.sessionStorage.setItem('Donor_token',data.data.Data.DonorToken);
        window.sessionStorage.setItem('Donor_credentials', JSON.stringify(credentials));
        okCallback((callback_params !== undefined ? callback_params : null));
      }).catch(function (err) {
            if(!RequestHandler.validatesResponse(err)){
              return;
            }
            badCallback((callback_params !== undefined ? callback_params : null));
      });
  };


   //get information from payment config
   var paymentTypeConfig = function(input_params,okCallback,badCallback){
    var request_id = RequestHandler.controlRequest(paymentTypeConfig,input_params,okCallback,badCallback);
    let request_data = {}; 
    let request_config = {
        params: {
            paymentType: 2,
            donorToken: window.sessionStorage.getItem('Donor_token'),
            request_id: request_id,
            apiKey: _apiKey
        },
        headers: {
            Authorization:  "Bearer "+window.localStorage.getItem('App_token')
        }
    };
    return axio.get(_apiUrl + "Configuration/PaymentTypeConfiguration",request_config,request_data) 
        .then(function (data) {
            if(!RequestHandler.validatesResponse(data)){
            return;
            }
            //200 status response
            okCallback(data.data.Data);
        }).catch(function (err) {
                if(!RequestHandler.validatesResponse(err)){
                return;
                }
                badCallback();
        });
  }

  var getCountries = function(input_params,okCallback,badCallback) {
    var request_id = RequestHandler.controlRequest(getCountries,input_params,okCallback,badCallback);
    let request_data = {}; 
    let request_config = {
        params: {
            request_id: request_id,
            apiKey: _apiKey
        },
        headers: {
            Authorization:  "Bearer "+window.localStorage.getItem('App_token')
        }
    };
    return axio.get(_apiUrl + "Configuration/Countries",request_config,request_data) 
        .then(function (data) {
            if(!RequestHandler.validatesResponse(data)){
            return;
            }
            //200 status response
            okCallback(data.data.Data);
        }).catch(function (err) {
            if(!RequestHandler.validatesResponse(err)){
            return;
            }
            badCallback();
        });
  };

  var getUsStates = function(input_params,okCallback,badCallback) {
    var request_id = RequestHandler.controlRequest(getUsStates,input_params,okCallback,badCallback);
    let request_data = {}; 
    let request_config = {
        params: {
            request_id: request_id,
            apiKey: _apiKey
        },
        headers: {
            Authorization:  "Bearer "+window.localStorage.getItem('App_token')
        }
    };
    return axio.get(_apiUrl + "Configuration/USStates",request_config,request_data) 
        .then(function (data) {
            if(!RequestHandler.validatesResponse(data)){
            return;
            }
            //200 status response
            okCallback(data.data.Data);
        }).catch(function (err) {
            if(!RequestHandler.validatesResponse(err)){
            return;
            }
            badCallback();
        });
  };


  var getIntroductoryPanel = function(input_params,okCallback,badCallback) {
    var request_id = RequestHandler.controlRequest(getIntroductoryPanel,input_params,okCallback,badCallback);
    let request_data = {}; 
    let request_config = {
        params: {
            donorToken: window.sessionStorage.getItem('Donor_token'),
            request_id: request_id,
            apiKey: _apiKey
        },
        headers: {
            Authorization:  "Bearer "+window.localStorage.getItem('App_token')
        }
    };
    return axio.get(_apiUrl + "Configuration/IntroductoryPanel",request_config,request_data) 
        .then(function (data) {
            if(!RequestHandler.validatesResponse(data)){
            return;
            }
            //200 status response
            okCallback(data.data.Data);
        }).catch(function (err) {
            if(!RequestHandler.validatesResponse(err)){
            return;
            }
            badCallback();
        });
  };


  var saveDonation = function(input_params,okCallback,badCallback) {
    var request_id = RequestHandler.controlRequest(getIntroductoryPanel,input_params,okCallback,badCallback);
    var request_array = [];
    request_array.push(input_params);
    let request_data = {
        headers: {
            Authorization:  "Bearer "+window.localStorage.getItem('App_token'),
            apiKey: _apiKey,
            Accept: 'application/json'
        },
        params:{
            donorToken: window.sessionStorage.getItem('Donor_token'),
            ipAddress: "181.174.102.176",
            request_id: request_id,
            apiKey: _apiKey
        },
        data: {
            pledge: [{
                "AddOnList": [],
                "AddOnTotalValue": 0,
                "AnnualPayPeriodCount": 0,
                "AutoRenew": true,
                "CampaignId": "string",
                "CampaignName": "string",
                "CustomField1": "string",
                "CustomField10": "string",
                "CustomField10Description": "string",
                "CustomField1Description": "string",
                "CustomField2": "string",
                "CustomField2Description": "string",
                "CustomField3": "string",
                "CustomField3Description": "string",
                "CustomField4": "string",
                "CustomField4Description": "string",
                "CustomField5": "string",
                "CustomField5Description": "string",
                "CustomField6": "string",
                "CustomField6Description": "string",
                "CustomField7": "string",
                "CustomField7Description": "string",
                "CustomField8": "string",
                "CustomField8Description": "string",
                "CustomField9": "string",
                "CustomField9Description": "string",
                "DesignationAmountType": 1,
                "DesignationList": [
                    {
                        "AllowReleaseDonorData": true,
                        "CFCAgencyId": 0,
                        "CustomField1": "string",
                        "CustomField1Description": "string",
                        "CustomField2": "string",
                        "CustomField2Description": "string",
                        "CustomField3": "string",
                        "CustomField3Description": "string",
                        "DeclinedMatch": true,
                        "DesignateableEntityType": 1,
                        "DesignationAmount": 0,
                        "DesignationStatusType": 0,
                        "DisplayName": "string",
                        "DistributionDesignationId": "string",
                        "EIN": "string",
                        "EntityId": "string",
                        "EntityIdentifier": "string",
                        "IsRejected": true,
                        "MatchOfferStatusType": 1,
                        "Name": "string",
                        "OrganizationNumber": "string",
                        "OriginalData": {
                        },
                        "SpecialInstructions": "string",
                        "StandardAccountCode": "string"
                    }
                ],
                "DonationSourceType": 9,
                "FrequencyType": 0,
                "ImpersonationUser": "string",
                "IsCancelAllowed": true,
                "IsCancelled": true,
                "IsEditAllowed": true,
                "IsImpersonated": true,
                "IsRemoveAllowed": true,
                "OrganizationId": "string",
                "OrganizationName": "string",
                "OriginalData": {
                },
                "Pa": 5,
                "Payment": {},
                "PaymentAmount": 10,
                "PaymentAmountType": 10,
                "PaymentIncreaseAmount": 0,
                "PaymentIncreaseAmountType": 1,
                "PaymentTotalValue": 10,
                "PledgeStatusType": 0,
                "SignatureRequiredQuestionAnswer": "string",
                "TotalValue": 10
            }]

           // pledge: JSON.stringify(input_params)
        }
    }; 
    let request_config = {
        
    };
    return axio.post(_apiUrl + "Donation/Save",request_config,request_data) 
    .then(function (data) {
        if(!RequestHandler.validatesResponse(data)){
            return;
        }
        console.log("REQUEST RESPONSE: " ,data);
        //200 status response
        okCallback(data.data.Data);
    }).catch(function (err) {
        console.log("REQUEST RESPONSE: " ,err);
        if(!RequestHandler.validatesResponse(err)){
        return;
        }
        badCallback();
    });

  }


const DonationAPI = {
    authApplication : authApplication,
    authDonor: authDonor,
    paymentTypeConfig: paymentTypeConfig,
    getCountries: getCountries,
    getUsStates: getUsStates,
    getIntroductoryPanel: getIntroductoryPanel,
    saveDonation: saveDonation
}

export default DonationAPI; 