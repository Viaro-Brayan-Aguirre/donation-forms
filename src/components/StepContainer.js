import React from 'react';
import {StepView} from './StepView';
//component to handle each step render content. 
//props: 
// setStyle => array with style properties 
// id => id to the component
// step => actual step number
export class StepContainer extends React.Component {

    render(){
        return(
            <div className="container form_full_height" id={this.props.id} style={this.props.setStyle}>
                <div className="row form_full_height" >
                    <div className="col-12 col-xs-12 col-md-12 col-lg-8 col-xl-7 d-flex align-items-center form-container"> 
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <StepView step={this.props.step}></StepView>
                                </div>
                                <div className="col-12">
                                    {this.props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}