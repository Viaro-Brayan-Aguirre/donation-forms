import React from 'react';
import {StepView} from './StepView';
import '../css/donate_form.css';
import ReactDOM from 'react-dom';
import {Toast} from './Toast';


export class DonationFormStepTwo extends React.Component {

    constructor(props){
        super(props);
        this.handlePreviousStep = this.handlePreviousStep.bind(this);
        this.handleNextStep = this.handleNextStep.bind(this);
        this.generateItemList = this.generateItemList.bind(this);
        this.handleListCheck = this.handleListCheck.bind(this);
        this.state = {restored: false}
    }
    
    render(){
    return(
    <div className="container form_full_height" id="form_step_two" style={{display: 'none'}}>
        <div className="row form_full_height" >
            <div className="col-12 col-xs-12 col-md-12 col-lg-8 col-xl-7 d-flex align-items-center form-container">     
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <StepView step={2}></StepView>
                        </div>
                        <div className="col-12">
                            <form  className="form_section show">
                                <div className="form_section_title">
                                    <i className="maximize fa fa-chevron-down" onClick={this.maximize}></i>
                                    <i className="minimize fa fa-chevron-up " onClick={this.minimize}></i>
                                    <div className="section_title">{this.props.panel_data.PanelTitle}</div>
                                </div>
                                <div className="form_section_content">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-12 form_section_list_container">
                                                {this.generateItemList()}
                                            </div>
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
                                        <button onClick={this.handleNextStep} className="btn btn-sm btn-secondary" type="button">Next Step</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> );
    }
    

    componentDidUpdate(){
        if(this.props.panel_data != null){
            document.getElementById('form_step_two').style.display = 'block';
        }
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

    generateItemList(){
        if(this.props.panel_data.PanelItemList == null){
            return <div></div>;
        } 
        var select_value = this.props.previous_state.agency; 
        let i = 0;
        return this.props.panel_data.PanelItemList.map(item => {
            i++;
            return (
                <div key={i} className="list_content" onClick={this.handleListCheck} data-minimum={item.MinimumDonation} >
                    <label><input defaultChecked={item.EntityId === select_value} type="radio" name="agency" value={item.EntityId}></input> {item.Name} </label>
                    <div className={"min_amount  " + (this.props.pre_selected_amount >= item.MinimumDonation ? 'ok_amount' : '')}
                    >$ {item.MinimumDonation} <span className="span_minimum">Minimum amount for donate</span></div>
                </div>
            )
        });
    }

    handleListCheck(e){
        var selected = document.querySelectorAll('.selected_element'); 
        if(selected !== null && selected.length > 0){
            var i = selected.length;
            while(i--){
                selected[i].classList.remove("selected_element");
            }
        }
        e.target.classList.add("selected_element");    
        var radio_input  = e.target.querySelector('input[type="radio"]');
        if(e.target.getAttribute("data-minimum") == null){
            return;
        }
        if( parseFloat(e.target.getAttribute("data-minimum")) <= parseFloat(this.props.pre_selected_amount)){
            radio_input.checked = true;
            var evt = {};
            evt.target = {};
            evt.target.name = "agency";
            evt.target.value = radio_input.value;
            this.props.handleChange(evt);
        } else {
            ReactDOM.render(<Toast message="Minimum amount not reached" type="error"></Toast>,
            document.getElementById('toastContainer'));
        }
    }

    handlePreviousStep(){
        this.props.changeStep(1);
    }

    handleNextStep(){ 
        if(document.querySelector('input[name="agency"]:checked') == null){
            ReactDOM.render(<Toast message="You Must select an agency to continue" type="error"></Toast>,
            document.getElementById('toastContainer'));
            return;
        }
        /*var val = document.querySelector('input[name="agency"]:checked').value;
        alert(val);*/
        this.props.changeStep(3);
    }

}