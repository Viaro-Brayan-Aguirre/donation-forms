import React from 'react';
import {FormSection} from './FormSection';
import {StepContainer} from './StepContainer';
import {StepFooterButtons} from './StepFooterButtons';


export class DonationFormStepThree extends React.Component {

    constructor(props){
        super(props);
        this.renderFormOneDetail = this.renderFormOneDetail.bind(this);
        this.goToStepOne =  this.goToStepOne.bind(this);
        this.goToStepTwo = this.goToStepTwo.bind(this);
        this.handleNextStep = this.handleNextStep.bind(this);
        this.handlePreviousStep = this.handlePreviousStep.bind(this);
    }



    render(){
        let btn_edit1 = <button onClick={this.goToStepOne} className="btn btn-sm btn-secondary btn_edit">Edit <i className="fa fa-pencil"></i></button>;
        let btn_edit2 = <button onClick={this.goToStepTwo} className="btn btn-sm btn-secondary btn_edit">Edit <i className="fa fa-pencil"></i></button>;
        return (
            <StepContainer id="form_step_three" step={3}>
                <FormSection title="Payment Details" title_child={btn_edit1}>
                    <div className="container">
                            {this.renderFormOneDetail(this.props.form_data.form_one)}
                    </div>
                </FormSection>
                <FormSection title="Charity Details" title_child={btn_edit2}>
                    <div className="container">
                        <div className="row">
                            {this.renderFormTwoDetail(this.props.form_data)}
                        </div>
                    </div>
                </FormSection>
                <StepFooterButtons 
                left="Prev Step" left_action={this.handlePreviousStep} 
                right="Finish" right_action={this.handleNextStep} />
            </StepContainer>
        );
    }


    renderFormOneDetail(data){
        let label_classes = "field_name col-xs-12 col-md-5 d-flex align-items-center";
        let input_classes = "field_content col-xs-12 col-md-7";
        return (
            <div className="container">
                <div className="row">
                    <div className={label_classes}>
                        <label>Status</label>
                    </div>
                    <div className={input_classes}>
                        <label>Pending</label>
                    </div>
                </div>
                <div className="row">
                    <div className={label_classes}>
                        <label>Payment Type</label>
                    </div>
                    <div className={input_classes}>
                        <label>
                            { this.getFrequencyName(data.frequency)}
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className={label_classes}>
                        <label>Pledge</label>
                    </div>
                    <div className={input_classes}>
                        <label>{"$" + data.amount_value}</label>
                    </div>
                </div>
                <div className="row">
                    <div className={label_classes}>
                        <label>Payment Detail</label>
                    </div>
                    <div className={input_classes}>
                        <label>Billed On {this.getCurrentDay()}</label>
                    </div>
                </div>
                <div className="row">
                    <div className={label_classes}>
                        <label>Total Annual Amount</label>
                    </div>
                    <div className={input_classes}>
                        <label>{"$" + this.props.getTotalAmount(data.frequency,data.amount_value)}</label>
                    </div>
                </div>
            </div>
        );
    }

    getFrequencyName(frequency){
        switch( parseInt(frequency)){
            case 1:
                return "One-time";
            case 2: 
                return"Monthly";
            case 3 : 
                return "Quarterly";
            case 4: 
                return "Semi-annual";
            default:
                return "Please review frequency"
        }
    }



    getCurrentDay(){
        let today = new Date();
        let day = today.getDate();
        let month = today.getMonth() + 1;
        let year = today.getFullYear(); 
        if( day < 10){
            day= "0"+day;
        }
        if (month < 10){
            month = "0"+month
        }
        return month+"/"+day+"/"+year;
    }

    renderFormTwoDetail(data){
        return (
            <div className="field_name col-12">
                <label>{"$"+ data.form_one.amount_value + " " +data.form_two.agency_data.Name}</label>
            </div>
        );
    }

    goToStepOne(){
        this.props.changeStep(1);
    }

    goToStepTwo(){
        this.props.changeStep(2);
    }

    handlePreviousStep(){
        this.props.changeStep(2);
    }

    handleNextStep(){ 
        this.props.confirmDonation();
    }


}