import React from 'react';
import ReactDOM from 'react-dom';
import {Login} from '../components/Login'; 
import {Toast} from '../components/Toast';
import Utils from './Utils';
import DonationAPI from '../services/DonationAPI';
import {MainContainer} from './MainContainer';
import '../css/general.css';
import '../css/login.css';



export class LoginContainer extends React.Component {
    
    //initiate the constructor, we store the user data inside the state 
    constructor(props){
        super(props);
        this.state = {
            campaignCode: '',
            username: '',
            password: '',
            campaignCode_validate: '',
            username_validate: '',
            password_validate: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClickLoginButton = this.handleClickLoginButton.bind(this);
    }
    

    componentDidMount(){
        function okAuthApp() {
            Utils.unlockScreen();
        }
        function errorOnAuthApp(params) {
            ReactDOM.render(<Toast message="No API connection." type="error"></Toast>,
            document.getElementById('toastContainer'));
        }
        DonationAPI.authApplication(okAuthApp,errorOnAuthApp);

    }

    handleInputChange(e){
        var val = e.target.value; 
        var name = e.target.name; 
        var is_valid =  false;
        if(val.length > 0){
            is_valid = true;
        }
        this.setState({ [name + '_validate'] : is_valid });
        this.setState({[name]: val});
    }


    //try to login
    handleClickLoginButton(){
        if(!document.getElementById('login_form').checkValidity()){
                ReactDOM.render(<Toast message="Review require data." type="error"></Toast>,
                document.getElementById('toastContainer'));      
            return;
        }
        Utils.lockScreen();
        function okLogin() {
            ReactDOM.render(<Toast message={"Welcome " } timer="1500"></Toast>, document.getElementById('toastContainer'));
            ReactDOM.render(<MainContainer></MainContainer>,document.getElementById('root'));
        }
        function notOkLogin() {
            ReactDOM.render(<Toast message="Invalid credentials" type="error" timer="1500"></Toast>, document.getElementById('toastContainer'));
            Utils.unlockScreen();
        }
        var form_data = {
            campaignCode: this.state.campaignCode,
            username: this.state.username,
            password: this.state.password
        };
        DonationAPI.authDonor(form_data,okLogin,notOkLogin);

    }

    componentDidUpdate(prevProps, prevState) {
        this.validateLoginForm();
    }
    
    //validates info on the inputs of the form
    validateLoginForm(){

    }

    render(){
        return (<Login onChange={this.handleInputChange} 
            campaignCodeValidation={this.state.campaignCode_validate}
            usernameValidation={this.state.username_validate}
            passwordValidation={this.state.password_validate}
            onClickLogin={this.handleClickLoginButton}
            ></Login>);
    }

}

