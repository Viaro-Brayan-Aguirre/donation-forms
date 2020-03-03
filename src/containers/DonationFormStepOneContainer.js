import React from 'react';
import {DonationFormStepOne} from '../components/DonationFormStepOne';
import Utils from './Utils';
import DonationAPI from '../services/DonationAPI';

export class DonationFormStepOneContainer extends React.Component {

    constructor(props){
        super(props);
        let form_data = {
            amount: 0,
            amount_value: 0,
            frequency: 0,
            cardType: 0,
            cardNumber: '',
            expirationDateMonth: '',
            expirationDateYear: '',
            contactEmail: '',
            country: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            zipCode: '',
            zipCodeExtension: '',
            province: '',
            postalCode: '',
            csv: '',
            nameOnCard: ''
        };
        var previous_state = this.props.getState('step_one'); 
        if(previous_state !== {}){
            Object.assign(form_data,previous_state);
        }

        this.state = {data: "state",
                      countries: [],
                      us_states: [],
                      form_data: form_data
                };
        this.processData = this.processData.bind(this);
        this.errorOnData = this.errorOnData.bind(this);
        this.insertCountries = this.insertCountries.bind(this);
        this.insertStates = this.insertStates.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        

    }


    render(){
        return <DonationFormStepOne data={this.state.data} 
        countries={this.state.countries} 
        us_states={this.state.us_states}
        previous_state={this.state.form_data}
        handleChange={this.handleInputChange} 
        changeStep={this.props.changeStep}></DonationFormStepOne>;
    }

    //component mount, so call Api for information 
    componentDidMount(){
        DonationAPI.getUsStates(null,this.insertStates,this.errorOnData)
        DonationAPI.getCountries(null,this.insertCountries,this.errorOnData);
        DonationAPI.paymentTypeConfig(null,this.processData,this.errorOnData); 
    }

    //component gone, stores state 
    componentWillUnmount(){
        this.props.saveState('step_one',this.state.form_data); 
    }

    insertStates(data){
        this.setState({us_states: data});
    }

    insertCountries(data){
        this.setState({countries: data});
    }

    processData(data) {
        Utils.unlockScreen();
        this.setState({data: data});
    }

    //handles all inputs forms
    handleInputChange(e){
        var form_state = this.state.form_data; 
        form_state[e.target.name] = e.target.value;
        this.setState({form_data: form_state});
    }


    errorOnData(){
        Utils.unlockScreen();
        //this.setState({data: "API ERROR"});
    }




}