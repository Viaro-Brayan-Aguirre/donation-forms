import React from 'react';
import {StepView} from './StepView';
import '../css/donate_form.css';
import ReactDOM from 'react-dom';
import {Toast} from './Toast';
import {FormSection} from './FormSection';
import {StepContainer} from './StepContainer';


export class DonationFormStepTwo extends React.Component {

    constructor(props){
        super(props);
        this.handlePreviousStep = this.handlePreviousStep.bind(this);
        this.handleNextStep = this.handleNextStep.bind(this);
        this.generateItemList = this.generateItemList.bind(this);
        this.handleListCheck = this.handleListCheck.bind(this);
        this.state = {restored: false,
            style: {display: 'none'}}
    }
    
    render(){
    return(
        <StepContainer id="form_step_two" setStyle={this.state.style}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <StepView step={2}></StepView>
                    </div>
                    <div className="col-12">
                        <FormSection title={this.props.panel_data.PanelTitle}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 form_section_list_container">
                                        {this.generateItemList()}
                                    </div>
                                </div>
                            </div>
                        </FormSection>
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
        </StepContainer>
     );
    }
    

    componentDidUpdate(){
        if(this.props.panel_data != null){
            document.getElementById('form_step_two').style.display = 'block';
        }
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