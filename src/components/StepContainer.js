import React from 'react';

//component to handle each step render content. 
//props: 
// setStyle => array with style properties 
// id => id to the component
export class StepContainer extends React.Component {

    render(){
        return(
            <div className="container form_full_height" id={this.props.id} style={this.props.setStyle}>
                <div className="row form_full_height" >
                    <div className="col-12 col-xs-12 col-md-12 col-lg-8 col-xl-7 d-flex align-items-center form-container"> 
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }

}