import React from 'react';
import { StepView } from './StepView';



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

        return (
            <div className="container form_full_height" id="form_step_three" >
                <div className="row form_full_height" >
                    <div className="col-12 col-xs-12 col-md-12 col-lg-8 col-xl-7 d-flex align-items-center form-container">     
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <StepView step={3}></StepView>
                                </div>
                                <div className="col-12">
                                    <form  className="form_section show">
                                        <div className="form_section_title">
                                            <i className="maximize fa fa-chevron-down" onClick={this.maximize}></i>
                                            <i className="minimize fa fa-chevron-up " onClick={this.minimize}></i>
                                            <div className="section_title">Payment Details
                                                <button onClick={this.goToStepOne} className="btn btn-sm btn-secondary btn_edit">Edit <i className="fa fa-pencil"></i></button>
                                            </div>
                                        </div>
                                        <div className="form_section_content">
                                            <div className="container">
                                                {this.renderFormOneDetail(this.props.form_data.form_one)}
                                            </div>
                                        </div>
                                    </form>
                                    <form  className="form_section show">
                                        <div className="form_section_title">
                                            <i className="maximize fa fa-chevron-down" onClick={this.maximize}></i>
                                            <i className="minimize fa fa-chevron-up " onClick={this.minimize}></i>
                                            <div className="section_title">Charity Details 
                                                <button onClick={this.goToStepTwo} className="btn btn-sm btn-secondary btn_edit">Edit <i className="fa fa-pencil"></i></button>
                                            </div>
                                        </div>
                                        <div className="form_section_content">
                                            <div className="container">
                                                <div className="row">
                                                    {this.renderFormTwoDetail(this.props.form_data)}
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="container">
                                        <div className="row ">
                                            <div className="col-3 ">
                                                <button onClick={this.handlePreviousStep} className="btn btn-sm btn-secondary" type="button">Prev Step</button>
                                            </div>
                                            <div className="col-6">

                                            </div>
                                            <div className="col-3  ">
                                                <button onClick={this.handleNextStep} className="btn btn-sm btn-secondary" type="button">Finish</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    renderFormOneDetail(data){
        console.log("Form 1 data",data);
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
        console.log("Form 2 data",data);
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

    maximize(e){
        var parent = e.target.parentNode.parentNode;
        parent.classList.remove('hide'); 
        parent.classList.add('show'); 
    }

    minimize(e){
        var parent = e.target.parentNode.parentNode;
        parent.classList.remove('show'); 
        parent.classList.add('hide'); 
    }

}