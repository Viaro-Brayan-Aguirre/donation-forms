import React from 'react';
import PropTypes from 'prop-types';

export class Login extends React.Component {

    render(){
        return (
    <div className="container login_view">
        <div className="row justify-content-center">
            <div className="col-12 col-sm-12 col-md-8 col-lg-6 col-xl-6 d-flex align-items-center">
                <div className="login_form container">
                    <div className="login_icon_container">
                        <img className="login_icon " src="../media/img/Donation_icon.png" alt="Donation icon"/>
                    </div>
                    <form name="loginForm" id="login_form" onSubmit={this.props.onClickLogin} >
                        <div className="row login_row_shows">
                            <div className="col-12 col-sm-5 col-md-4 d-flex align-items-center">
                                <span className="align-middle">Campaign Code</span>
                            </div>
                            <div className="col-12 col-sm-7 col-md-8 inp_control">
                                <input type="text" placeholder="Campaign Code"  name="campaignCode" 
                                onChange={this.props.onChange}
                                className={(this.props.campaignCodeValidation !== '' ? ( this.props.campaignCodeValidation ? 'is-valid' : 'is-invalid' ) : '') + ' form-control' } required/>
                            </div>
                            <div className="col-12 col-sm-5 col-md-4 d-flex align-items-center">
                                <span className="align-middle">Username</span>
                            </div>
                            <div className="col-12 col-sm-7 col-md-8 inp_control">
                                <input ng-keyup="user_mod = true" type="text"placeholder="Username" name="username"
                                onChange={this.props.onChange}
                                className={(this.props.usernameValidation !== '' ? ( this.props.usernameValidation ? 'is-valid' : 'is-invalid' ) : '') + ' form-control' }
                                required/>
                            </div>
                            <div className="col-12 col-sm-5 col-md-4 d-flex align-items-center">
                                <span className="align-middle">Password</span>
                            </div>
                            <div className="col-12 col-sm-7 col-md-8 inp_control">
                                <input ng-keyup="pass_mod = true" type="password" 
                                placeholder="Password" name="password"
                                onChange={this.props.onChange}
                                className={(this.props.passwordValidation !== '' ? ( this.props.passwordValidation ? 'is-valid' : 'is-invalid' ) : '') + ' form-control' }
                                required/>
                            </div>
                            <div className=" col-12 btn_container">
                                <button onClick={this.props.onClickLogin}  className="btn btn-primary" type="button">Login</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>);
    }

}; 

Login.propTypes = {
    onChange: PropTypes.func.isRequired,
    onClickLogin: PropTypes.func.isRequired
};