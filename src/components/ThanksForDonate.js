import React from 'react';
import '../css/thankyou_animation.css';
import Utils from '../containers/Utils';    

//simple page for show thanks 
export class ThankYou extends React.Component {

    constructor(props){
        super(props);
        this.props.saveState('step_one',{});
        this.props.saveState('step_two',{});
    }
    render(){
        return (
            <div className="thanks_you_page">
                <div className="hero"> 
                    <div className="hero__title">Thank you, we appreciate your support.<button onClick={this.props.handleClick} 
                    className="btn btn-dark">Continue</button></div>
                    <div className="cube"></div>
                    <div className="cube"></div>
                    <div className="cube"></div>
                    <div className="cube"></div>
                    <div className="cube"></div>
                    <div className="cube"></div>
                </div>
                
            </div>
        );
    }

    componentDidMount(){
        Utils.unlockScreen();
    }

}
