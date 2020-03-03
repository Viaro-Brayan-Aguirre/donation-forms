import React from 'react';
import '../css/donate_form.css';
import {Modal} from './Modal';
import {FormSection} from './FormSection';
import {StepContainer} from './StepContainer';
import {StepFooterButtons} from './StepFooterButtons';



let default_amount = '';
let default_frequency = '';
let default_country= ''; 
let default_state= '';
let default_card_type =  '';

let card_expressions = [
    "4[0-9]{12}(?:[0-9]{3})?",
    "(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))",
    "3[47][0-9]{13}",
    "65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})",
    "3(?:0[0-5]|[68][0-9])[0-9]{11}"
];


export class DonationFormStepOne extends React.Component {
    constructor(props){
        super(props);
        //use to fill default related data
        this.state = {
            send_default_amount: false,
            send_default_frequency: false, 
            send_default_country: false, 
            send_default_state: false,
            send_fault_card_type: false,
            country_selected: false,
            show_modal: false,
            style: {display: 'none'}
        }

        this.generateAmounts  = this.generateAmounts.bind(this);
        this.generateCountries = this.generateCountries.bind(this);
        this.generateStates = this.generateStates.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handlesChangeAmount = this.handlesChangeAmount.bind(this);
        this.handleChangeCustomAmount = this.handleChangeCustomAmount.bind(this);
        this.handleNextStep = this.handleNextStep.bind(this);
        this.setFieldsBasedOnCountry = this.setFieldsBasedOnCountry.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal(){
        this.setState({show_modal: true})
    }

    closeModal(){
        this.setState({show_modal: false});
    }

    render(){
        let label_classes = "col-xs-12 col-md-5 d-flex align-items-center";
        let input_classes = "col-xs-12 col-md-7";
         return (
             <StepContainer id="form_step_one" setStyle={this.state.style} step={1} >
                <Modal show={this.state.show_modal} close={this.closeModal}  title="Whats is CSV?" >
                    <img alt="CSV helper" src="media/img/helper/credit-card-csv.png"/>
                    <p>The CSV Code (Card Security Value) is a three or four digit number that is unique to your credit or debit card.
                    The security code is close to 100% proof that a credit card is in your possession when ordering something on the phone or Internet.</p>
                </Modal>
                <FormSection id="amount_form" title={this.props.data.PaymentTypeLabel}>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <p>{this.props.data.PaymentInstructions}</p>
                                <p>{this.props.data.PaymentQuestion}</p>
                            </div>
                        </div>
                        <div className="row">
                            {this.generateAmounts(this.props.data)}
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <p>{this.props.data.FrequencyInstructions}</p>
                            </div>
                        </div>
                        <div className="row">
                            {this.generateFrequency(this.props.data)}
                        </div>
                    </div>
                </FormSection>
                <FormSection id="form_card_information" title={this.props.data.PaymentTypeLabel + " Information"} >
                    <div className="container">
                        <div className="row">
                            <div className={label_classes}>
                                <label className="required">Card Type</label>
                            </div>
                            <div className={input_classes}>
                                <select className="form-control form-control-sm" name="cardType" 
                                onChange={this.props.handleChange}
                                value={this.props.previous_state.cardType} required>
                                    {this.generateCreditCardTypes(this.props.data)}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className={label_classes}>
                                <label className="required">Card Number</label>
                            </div>
                            <div className={input_classes}>
                                <input id="card_number" className="form-control form-control-sm" type="text" placeholder="Card Number"
                                name="cardNumber" onChange={this.props.handleChange} 
                                value={this.props.previous_state.cardNumber} 
                                pattern={card_expressions[this.props.previous_state.cardType - 1]} 
                                onKeyPress={this.onlyNumbers} required></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className={label_classes}>
                                <label className="required">Card Verification Number</label>
                            </div>
                            <div className={input_classes}>
                                <input id="card_csv" className="form-control form-control-sm" type="text" placeholder="CSV" 
                                name="csv" onChange={this.props.handleChange} 
                                value={this.props.previous_state.csv} 
                                pattern="[0-9]{3}" maxLength={3} onKeyPress={this.isCSV} required></input>
                                <label className="csv_helper" onClick={this.openModal} >What is this?</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className={label_classes}>
                                <label className="required">Name On Card</label>
                            </div>
                            <div className={input_classes}>
                                <input id="card_name" className="form-control form-control-sm" type="text" placeholder="Name On Card"
                                name="nameOnCard" onChange={this.props.handleChange} 
                                value={this.props.previous_state.nameOnCard} 
                                pattern=".+[ ]+.+" required></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className={label_classes}>
                                <label className="required">Expiration Date</label>
                            </div>
                            <div className={input_classes}>
                                <input className="form-control form-control-sm expiration" type="number" placeholder="Month" min={1} max={12}
                                name="expirationDateMonth" onChange={this.props.handleChange} 
                                value={this.props.previous_state.expirationDateMonth}  required>
                                    </input> / <input className="form-control form-control-sm expiration"  type="number" placeholder="Year"
                                    min={parseInt(new Date().getFullYear().toString().substr(-2))} max={99} 
                                    name="expirationDateYear" onChange={this.props.handleChange} 
                                    value={this.props.previous_state.expirationDateYear}  required></input> 
                            </div>
                        </div>
                        <div className="row">
                            <div className={label_classes}>
                                <label className="">Contact Email Address</label>
                            </div>
                            <div className={input_classes}>
                                <input id="contact_email" className="form-control form-control-sm" type="email" placeholder="Contact Email Address"
                                name="contactEmail" onChange={this.props.handleChange} 
                                value={this.props.previous_state.contactEmail} 
                                pattern="[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*" ></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className={label_classes}>
                                <label className="required">Country</label>
                            </div>
                            <div className={input_classes}>
                                <select className="form-control form-control-sm" onChange={this.handleCountryChange} 
                                name="country" value={this.props.previous_state.country} required>
                                    {this.generateCountries()}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className={label_classes}>
                                <label className="required">Address 1</label>
                            </div>
                            <div className={input_classes}>
                                <input className="form-control form-control-sm" type="text" placeholder="Address" 
                                name="address1" onChange={this.props.handleChange} 
                                value={this.props.previous_state.address1} required></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className={label_classes}>
                                <label className="">Address 2</label>
                            </div>
                            <div className={input_classes}>
                                <input className="form-control form-control-sm" type="text" placeholder="Address"
                                name="address2" onChange={this.props.handleChange} 
                                value={this.props.previous_state.address2} ></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className={label_classes}>
                                <label className="required">City</label>
                            </div>
                            <div className={input_classes}>
                                <input className="form-control form-control-sm" type="text" placeholder="City" 
                                name="city" onChange={this.props.handleChange} value={this.props.previous_state.city}
                                required ></input>
                            </div>
                        </div>
                        <div className="row us_related">
                            <div className={label_classes}>
                                <label className="required">State</label>
                            </div>
                            <div className={input_classes}>
                                <select className="form-control form-control-sm" 
                                name="state" onChange={this.props.handleChange} 
                                value={this.props.previous_state.state} >
                                    {this.generateStates()}
                                </select>
                            </div>
                        </div>
                        <div className="row us_related">
                            <div className={label_classes}>
                                <label className="required">Zip Code</label>
                            </div>
                            <div className={input_classes}>
                                <input className="form-control form-control-sm zip_code" type="text" placeholder="Zip Code" 
                                name="zipCode" onChange={this.props.handleChange} 
                                value={this.props.previous_state.zipCode} onKeyPress={this.onlyNumbers} pattern="[0-9]{5}" 
                                title="Must have 5 digits" maxLength="5"  ></input>
                                <input id="zip_code_ext" className="form-control form-control-sm zip_code_ext" type="text" placeholder="Zip Code Extension"
                                name="zipCodeExtension" onChange={this.props.handleChange} 
                                value={this.props.previous_state.zipCodeExtension}  onKeyPress={this.onlyNumbers} pattern="[0-9]{4}" 
                                title="Must have 4 digits." maxLength="4"  ></input>
                            </div>
                        </div>
                        <div className="row no_us_related" style={{display: 'none'}}>
                            <div className={label_classes}>
                                <label className="required">Province</label>
                            </div>
                            <div className={input_classes}>
                                <input className="form-control form-control-sm" type="text" placeholder="Province" 
                                name="province" onChange={this.props.handleChange}  
                                value={this.props.previous_state.province} ></input>
                            </div>
                        </div>
                        <div className="row no_us_related" style={{display: 'none'}}>
                            <div className={label_classes}>
                                <label className="required">Postal Code</label>
                            </div>
                            <div className={input_classes}>
                                <input className="form-control form-control-sm" type="text" placeholder="Postal Code"
                                name="postalCode" onChange={this.props.handleChange} value={this.props.previous_state.postalCode} 
                                onKeyPress={this.onlyNumbers}  ></input>
                            </div>
                        </div>
                    </div>
                </FormSection>
                <StepFooterButtons right="Next Step" right_action={this.handleNextStep} />
             </StepContainer>
         );
    }


    componentDidMount(){
        //sets the custom validation messages for inputs with pattern 
        document.getElementById('card_number').title = "Insert a valid credit card number without dashes.";
        document.getElementById('card_csv').title = "Must have 3 digits.";
        document.getElementById('card_name').title = "At least one name and one lastname.";
        document.getElementById('contact_email').title = "Insert a valid email address.";

        if(this.props.previous_state.cardType !== 0){
            if(this.props.countries.length > 0 && !this.state.country_selected){
                this.setFieldsBasedOnCountry(this.props.previous_state.country);
                this.setState({country_selected: true});
            }
            this.setState({send_default_country: true});
            this.setState({send_default_frequency: true});
            this.setState({send_default_state: true});
            this.setState({send_default_amount: true});
            this.setState({send_fault_card_type: true});
            return; //has a previous step
        }
    }

    componentDidUpdate(){
        if(this.props.data.AmountQuestions != null){
            document.getElementById('form_step_one').style.display = 'block';
        }
        //if we have a previous state, select correct data 
        
        //controls pre selected data
        var e = {};
        e.target = {};
        if(default_country !== '' && this.state.send_default_country === false){
            e.target.name = 'country';
            e.target.value = default_country;
            this.props.handleChange(e);
            this.setState({send_default_country: true});
            this.setFieldsBasedOnCountry(default_country);
        }
        if(default_frequency !== '' && this.state.send_default_frequency === false){
            e.target.name = 'frequency';
            e.target.value = default_frequency;
            this.props.handleChange(e);
            this.setState({send_default_frequency: true});
        }
        if(default_state !== '' && this.state.send_default_state === false){
            e.target.name = 'state';
            e.target.value = default_state;
            this.props.handleChange(e);
            this.setState({send_default_state: true});
        }
        if(default_amount !== '' && this.state.send_default_amount === false){
            e.target.name = 'amount';
            e.target.value = default_amount;
            this.props.handleChange(e);
            this.setState({send_default_amount: true});
        }
        if(default_card_type !== '' && this.state.send_fault_card_type === false){
            e.target.name = 'cardType';
            e.target.value = default_card_type;
            this.props.handleChange(e);
            this.setState({send_fault_card_type: true});
            document.getElementById('card_number').setAttribute('pattern',card_expressions[default_card_type - 1]);
        }

            
    }

    generateCountries(){
        let i = 0;
        return this.props.countries.map(country => {
            i++;
            if(i === 1){
                default_country = country.ISO;
            }
            return <option key={i} value={country.ISO}>{country.CountryName}</option>
        });
    }

    generateStates(){
        let i = 0;
        return this.props.us_states.map(state => {
            i++;
            if(i === 1){
                default_state = state.Code;
            }
            return <option key={i} value={state.Code}>{state.Name}</option>
        });
    }

    generateCreditCardTypes(data){
        if(data.CreditCardTypeList == null){
            return (<option></option>)
        }
        let i = 0;
        return data.CreditCardTypeList.map(type => {
            let text = "";
            i++;
            if(i === 1){
                default_card_type = type;
            }
            switch(type){
                case 1:
                    text = "Visa";
                    break;
                case 2:
                    text = "Master Card";
                    break;
                case 3:
                    text = "American Express";
                    break;
                case 4:
                    text = "Discover";
                    break;
                case 5:
                    text = "Diners Club";   
                    break;
                default:
            }
        return <option key={i} value={type}>{text}</option>
        });

    }

    handlesChangeAmount(e){
        var evt2 = {};
        evt2.target = {};
        evt2.target.name = "amount_value";
        if(e.target.id !== "custom_amount_radio"){
            document.getElementById('custom_amount').value = "";
            document.getElementById('custom_amount').required = false;
            evt2.target.value = e.target.value;
            this.props.handleChange(evt2);
        } else {
            document.getElementById('custom_amount').required = true;
            evt2.target.value = '';
            this.props.handleChange(evt2);
        }
        this.props.handleChange(e);
    }

    handleChangeCustomAmount(e){
        let input_radio = document.getElementById('custom_amount_radio');
        if(!input_radio.checked){
            input_radio.checked = true;
            //update the amount value 
            let event_update = {};
            event_update.target = {name: "amount", value: input_radio.value };
            this.props.handleChange(event_update);
        }
        e.target.name = "amount_value";
        this.props.handleChange(e);
    }

    isNumberKey(evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        var actualVal = evt.target.value; 
        var hasPoint = actualVal.includes(".");
        if(hasPoint && charCode=== 46){ //one point only
            evt.preventDefault();
        }
        if(hasPoint && actualVal.substr((actualVal.indexOf("."))).length === 3){
            //only two digits after point
            evt.preventDefault();
        }
        if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)){
            evt.preventDefault();
        }
        return true;
    }

    onlyNumbers(evt){
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ( charCode > 31 && (charCode < 48 || charCode > 57)){
            evt.preventDefault();
        }
        return true;
    }

    isCSV(evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        var actualVal = evt.target.value; 
        if(actualVal.length === 3 && (charCode < 48 || charCode > 57) ){
            evt.preventDefault();
        }
        if ( charCode > 31 && (charCode < 48 || charCode > 57)){
            evt.preventDefault();
        }
        return true;
    }

    generateAmounts(data){
        if(data.AmountQuestions == null){
            return (<div></div>)
        }
        let i = 0;
        let amount_classes = "amount col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4"; 
        var pre_value = this.props.previous_state.amount;
        return data.AmountQuestions[0].AmountOptions.map( amount => {
            i++;
            var is_custom_value = false;
            if(i === 1 && !this.state.send_default_amount //have not set a default value upper
                
                ){
                default_amount = amount.Amount; //only one time
                pre_value = amount.Amount;
            }
            if(amount.AmountLabel.length > 0){
                return (
                    <div className={amount_classes}  key={i}>
                        <div className="amount_container">
                            <input className="check" type="radio" name="amount" onChange={this.handlesChangeAmount} value={amount.Amount} 
                            defaultChecked={( parseFloat(amount.Amount) === parseFloat( pre_value)  )} /><label>{amount.AmountLabel}</label>
                        </div>
                    </div>);
            } 
            return (
                <div className={amount_classes} key={i}>
                    <div className="amount_container">
                        <input id="custom_amount_radio"  type="radio" name="amount" value={amount.Amount} 
                        onChange={this.handlesChangeAmount}
                        defaultChecked={is_custom_value = ( parseFloat(amount.Amount) === parseFloat(pre_value) )}/>
                        <label>$<input id="custom_amount" className="form-control form-control-sm variable" type="number" placeholder="Amount"
                        min={(this.props.data.MinimumDonationAmount > 0 ? this.props.data.MinimumDonationAmount : 0.01)} step="0.01" 
                        pattern="[0-9]+[.]{0,1}[0-9]{0,2}" title={"Minimum  $" + this.props.data.MinimumDonationAmount } 
                        onKeyPress={this.isNumberKey} onChange={this.handleChangeCustomAmount}
                          value={is_custom_value ? this.props.previous_state.amount_value : '' }
                         /></label>
                    </div>
                </div>);
        });
    }

    generateFrequency(data){
        if(data.FrequencyTypeList == null){
            return (<div></div>)
        }
        var i = 0;
        let frequency_classes = "frequency col-6 col-sm-6 col-md-3 col-lg-3";
        var pre_value = this.props.previous_state.frequency;
        return data.FrequencyTypeList.map( frequency => {
            i++;
            var frequency_text = "";
            switch(frequency){
                case 1:
                    frequency_text = "One-time";
                    break;
                case 2:
                    frequency_text = "Monthly";
                    break;
                case 3:
                    frequency_text = "Quarterly";
                    break;
                case 4:
                    frequency_text = "Semi-annual";
                    break;
                default:
            }
            if(i === 1 && !this.state.send_default_frequency){
                default_frequency = frequency;
                pre_value = frequency;
            }
            return (
                <div className={frequency_classes}  key={i}>
                    <div className="frequency_container">
                        <input className="check" type="radio" name="frequency" onChange={this.props.handleChange} value={frequency} 
                        defaultChecked={(parseInt(pre_value) === parseInt(frequency))}/><label>{frequency_text}</label>
                    </div>
                </div>);
        });
    }

    //if country is US, show related fields, otherwise hide and show normal fields
    handleCountryChange(e){
        let code = e.target.value;
        this.setFieldsBasedOnCountry(code);
        this.props.handleChange(e);
    }

    setFieldsBasedOnCountry(code){
        var evt = {};
        evt.target = {};
        evt.target.value = "";
        if(code === 'us'){
            document.querySelectorAll('.us_related').forEach(component => {
                component.style.display = 'flex';
            });
            document.querySelectorAll('.us_related input').forEach(component => {
                component.required = true;
            });
            document.getElementById('zip_code_ext').required = false;
            document.querySelectorAll('.no_us_related').forEach(component => {
                component.style.display = 'none';
            });
            document.querySelectorAll('.no_us_related input').forEach(component => {
                component.required = false;
            });
            evt.target.name = "province";
            this.props.handleChange(evt);
            evt.target.name = "postalCode";
            this.props.handleChange(evt);
        } else {
            document.querySelectorAll('.us_related').forEach(component => {
                component.style.display = 'none ';
            });
            document.querySelectorAll('.us_related input').forEach(component => {
                component.required = false;
            });
            document.querySelectorAll('.no_us_related').forEach(component => {
                component.style.display = 'flex';
            });
            document.querySelectorAll('.no_us_related input').forEach(component => {
                component.required = true;
            });
            evt.target.name = "zipCode";
            this.props.handleChange(evt);
            evt.target.name = "zipCodeExtension";
            this.props.handleChange(evt);
        }
    }

    handleNextStep(){
        let amount_form = document.getElementById('amount_form');
        if(!amount_form.reportValidity()){
            return;
        }
        let amount_custom = document.getElementById('custom_amount');
        if(amount_custom.value !== ''){
            if(amount_custom.value < this.props.data.MinimumDonationAmount){
                alert("Invalid number");
                return;
            }
        }
        let form = document.getElementById('form_card_information');
        if(!form.reportValidity()){
            return;
        }
        this.props.changeStep(2);
    }

}

/*
<div className="container">
    <div className="row" >
        <div className="col-12 col-xs-12 col-md-12 col-lg-10 col-xl-10 d-flex align-items-center form_out_container">
            <div className="form-container">
                <show-step step="1"></show-step>
                
                <div className="section_container" style="display: none;" id="section_1">
                    <div className="section_title_container">
                        <label className="section_title">{{info.PaymentTypeLabel}}</label>
                    </div>
                    <div className="section_content">
                        <p className="instructions">{{info.PaymentInstructions}}</p>
                        <p className="questions">{{info.PaymentQuestion}}</p>
                        <div className="amount_container">
                            <div ng-repeat="amount in info.AmountQuestions.AmountOptions">
                                
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <p> {{ info }}</p> -->
            </div>
        </div>
    </div>
</div>*/