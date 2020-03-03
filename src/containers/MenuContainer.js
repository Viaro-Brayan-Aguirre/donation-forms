import React from 'react';
import ReactDOM from 'react-dom';
import {Menu} from '../components/Menu';
import Session from '../services/Session';
import {LoginContainer} from './LoginContainer';
import Utils from './Utils';

//menu options
import { DonationFormStepOneContainer } from './DonationFormStepOneContainer';
import { DonationFormsStepTwoContainer } from './DonationFormsStepTwoContainer';
import { DonationFormStepThreeContainer } from './DonationFormStepThreeContainer';

export class MenuContainer extends React.Component {

    constructor(props){
        super(props);
        this.handleDonation = this.handleDonation.bind(this);
        this.handleMainPage = this.handleMainPage.bind(this);
        this.handleChangeStep = this.handleChangeStep.bind(this);
        this.state = {actual_step: 1};
    }

    handleLogout(){
        Session.setLogout();
        Utils.lockScreen();
        ReactDOM.render(<LoginContainer></LoginContainer>, document.getElementById('root'));
    }

    handleDonation(){
        this.handleChangeStep(this.state.actual_step);
    }

    handleChangeStep(target_step){
        this.setState({actual_step: target_step});
        switch(target_step){
            case 1:
                this.props.pageChange(<DonationFormStepOneContainer 
                    saveState={this.props.storeState} 
                    getState={this.props.getState} 
                    changeStep={this.handleChangeStep} />);
                    break;
            case 2: 
                this.props.pageChange(
                    <DonationFormsStepTwoContainer
                        saveState={this.props.storeState} 
                        getState={this.props.getState} 
                        changeStep={this.handleChangeStep}
                    />
                );
                break;
            case 3: 
                this.props.pageChange(<DonationFormStepThreeContainer
                    getState={this.props.getState} 
                    changeStep={this.handleChangeStep}
                />);
                break;
            default:
                this.handleMainPage();
        }
    }

    handleMainPage(){
        this.props.pageChange(Utils.main_template);
        Utils.unlockScreen();
    }

    render(){
        return (<Menu logout={this.handleLogout} 
            donate={this.handleDonation} 
            home={this.handleMainPage} ></Menu>);
    }

} 