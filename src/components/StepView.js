import React from 'react'; 
import '../css/step.css';
import PropTypes from 'prop-types';

export class StepView extends React.Component {

    render(){
        return (
            <div className="step_container">
                <div className={this.props.step >= 1 ? 'step_section selected' : 'step_section' } >
                    <div className="step_bar_container transparent">
                        <div className="step_bar">

                        </div>
                    </div>
                    <div className="step_icon">
                        <div className="step_icon_container">
                            <i className="fa fa-credit-card"></i>
                        </div>
                    </div>
                    <div className="step_bar_container">
                        <div className="step_bar">

                        </div>
                    </div>
                </div>
                <div className={this.props.step >= 2 ? 'step_section selected' : 'step_section' }>
                    <div className="step_bar_container ">
                        <div className="step_bar">

                        </div>
                    </div>
                    <div className="step_icon">
                        <div className="step_icon_container">
                            <i className="fa fa-user"></i>
                        </div>
                    </div>
                    <div className="step_bar_container">
                        <div className="step_bar">

                        </div>
                    </div>
                </div>
                <div className={this.props.step >= 3 ? 'step_section selected' : 'step_section' }>
                    <div className="step_bar_container ">
                        <div className="step_bar">

                        </div>
                    </div>
                    <div className="step_icon">
                        <div className="step_icon_container">
                            <i className="fa fa-check-square"></i>
                        </div>
                    </div>
                    <div className="step_bar_container">
                        <div className="step_bar">

                        </div>
                    </div>
                </div>
                <div className={this.props.step >= 4 ? 'step_section selected' : 'step_section' }>
                    <div className="step_bar_container ">
                        <div className="step_bar">

                        </div>
                    </div>
                    <div className="step_icon">
                        <div className="step_icon_container">
                            <i className="fa fa-file-text"></i>
                        </div>
                    </div>
                    <div className="step_bar_container transparent">
                        <div className="step_bar">

                        </div>
                    </div>
                </div>

            </div>
        );
    }

}

StepView.propTypes = {
    step: PropTypes.number.isRequired
};