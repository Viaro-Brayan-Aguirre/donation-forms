import React from 'react';

//Component to render buttons on footer of each steps 
//props for component 
// left=> text for left button
// left_action => function to call in case of click event
// center=> text for center button
// center_action => function to call in case of click event
// right=> text for right button
// right_action => function to call in case of click event
// if you do not set left | center | right, the unset button will not appear
export class StepFooterButtons extends React.Component {

    render(){
        return(
            <div className="container">
                <div className="row ">
                    <div className="col-3 ">
                        {
                            (this.props.left !== undefined &&  this.props.left.length > 0 ? 
                                <button onClick={this.props.left_action } className="btn btn-sm btn-secondary" type="button">{this.props.left}</button>
                                : ''
                                )
                        }      
                    </div>
                    <div className="col-6">
                        {
                            (this.props.center !== undefined && this.props.center.length > 0 ? 
                                <button onClick={this.props.center_action } className="btn btn-sm btn-secondary" type="button">{this.props.center}</button>
                                : ''
                                )
                        }
                    </div>
                    <div className="col-3  ">
                        {
                            (this.props.right !== undefined && this.props.right.length > 0 ? 
                                <button onClick={this.props.right_action} className="btn btn-sm btn-secondary" type="button">{this.props.right}</button>
                                : ''
                                )
                        }
                    </div>
                </div>
            </div>
        );
    }
}