import React from 'react';
import {DonationFormStepTwo} from '../components/DonationFormStepTwo'; 
import DonationAPI from '../services/DonationAPI';
import Utils from './Utils';


export class DonationFormsStepTwoContainer extends React.Component {

    constructor(props){
        super(props);
        var form_data =  {
            agency: '',
            agency_data : {}
        };
        var previous_state = this.props.getState('step_two'); 
        if(previous_state !== {}){
            Object.assign(form_data,previous_state);
        }
        this.state  = {
            panel_data: {}, 
            form_data: form_data
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.sendPanelInfo = this.sendPanelInfo.bind(this);
    }

    handleInputChange(e){
        var form_state = this.state.form_data; 
        form_state[e.target.name] = e.target.value;
        //if is and agency option 
        if(e.target.name === 'agency' && this.state.panel_data != null){
            let agency_index = this.state.panel_data.PanelItemList.length; 
            let found = false;
            while(agency_index--){
                if(this.state.panel_data.PanelItemList[agency_index].EntityId === e.target.value){
                    form_state["agency_data"] = this.state.panel_data.PanelItemList[agency_index];
                    found = true;
                    break;
                }
            }
            if(!found){
                form_state["agency_data"] = {};
            }
        }
        this.setState({form_data: form_state});
        this.props.saveState('step_two',form_state); //save current state on main container
    }

    render(){
        return (
            <DonationFormStepTwo
            pre_selected_amount = {10}
            panel_data={this.state.panel_data}
            previous_state={this.state.form_data}
            handleChange={this.handleInputChange} 
            changeStep={this.props.changeStep} ></DonationFormStepTwo>
        )
    }

    componentWillUnmount(){
        console.log("Saving form two state", this.state.form_data);
        this.props.saveState('step_two',this.state.form_data);
    }

    sendPanelInfo(data){
        Utils.unlockScreen();
        this.setState({panel_data: data});
    }

    errorOnData(){
        Utils.unlockScreen();
        //this.setState({data: "API ERROR"});
    }

    componentDidMount(){
        DonationAPI.getIntroductoryPanel(null,this.sendPanelInfo,this.errorOnData);
    }

}

