/***
 * Controls Session of data
 * 
 */
var isLogged = function() {
    if(window.localStorage.getItem('App_token') != null &&
    window.sessionStorage.getItem('Donor_token') != null && 
    window.sessionStorage.getItem('Donor_credentials') != null ) {
        var exp = window.localStorage.getItem('App_token_exp',(Date.now()));
        if( Date.now() < exp ){
            return true;
        }
    }
    return false;
}

var setLogout = function() {
    window.sessionStorage.clear('Donor_token');
    window.sessionStorage.clear('Donor_credentials')
};

var Session = {
    isLogged: isLogged,
    setLogout: setLogout
};

export default Session;