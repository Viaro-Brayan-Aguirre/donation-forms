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
import {ThankYou } from '../components/ThanksForDonate';
import {DonationHistoryContainer} from './DonationHistoryContainer';
import {DonationFormStepFour} from '../components/DonationFormStepFour';

export class MenuContainer extends React.Component {

    constructor(props){
        super(props);
        this.handleChangeStep = this.handleChangeStep.bind(this);
        this.handleSelectedOption = this.handleSelectedOption.bind(this);
        this.state = {actual_step: 1};
    }

    handleSelectedOption(event){
        Utils.lockScreen();
        let page = "main_page";
        if(event !== undefined){
            page = event.target.name;
        }
        switch(page){
            case 'logout':
                Session.setLogout();
                ReactDOM.render(<LoginContainer></LoginContainer>, document.getElementById('root'));
                break;
            case 'donation':
                this.handleChangeStep(this.state.actual_step);
                break;
            case 'history':
                this.props.pageChange(<DonationHistoryContainer></DonationHistoryContainer>);
                break;
            case 'main_page':
                this.props.pageChange(Utils.main_template);
                Utils.unlockScreen();
                break;
            default:
                this.props.pageChange(Utils.main_template);
                Utils.unlockScreen();
                break;
        }
    }

    handleChangeStep(target_step){
        if(target_step === 4 ){
            this.setState({actual_step: 1});
        } else {
            this.setState({actual_step: target_step});
        }
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
            case 4: 
                //clean states to restart app
                //this.props.pageChange(<ThankYou saveState={this.props.storeState}  handleClick={this.handleSelectedOption}></ThankYou>);
                this.props.pageChange(<DonationFormStepFour saveState={this.props.storeState}  handleClick={this.handleSelectedOption}></DonationFormStepFour>);
                break;
            default:
                this.handleSelectedOption();
        }
    }

    render(){
        return (<Menu handleSelect={this.handleSelectedOption}  ></Menu>);
    }

} 