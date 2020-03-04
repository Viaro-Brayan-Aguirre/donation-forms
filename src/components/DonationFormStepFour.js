import React from 'react'; 
import {StepContainer} from './StepContainer';
import Utils from '../containers/Utils';


export class DonationFormStepFour extends React.Component {

    constructor(props){
        super(props);
        this.props.saveState('step_one',{});
        this.props.saveState('step_two',{});
    }

    render(){
        return (
            <StepContainer id="form_step_three" step={4}>
                <div className="container">
                    <div className="row">
                        <div className="col-12 thankyou_content" style={{textAlign: "center"}}>
                            <h2 style={{fontWeight: 'bold' , padding: '25px 0px'}}>Thank you, we appreciate your support.</h2>
                            <button name="main_page" onClick={this.props.handleClick} 
                            className="btn btn-primary">Continue</button>
                        </div>
                    </div>
                </div>
            </StepContainer>
        );
    }

    componentDidMount(){
        Utils.unlockScreen();
    }

}