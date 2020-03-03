import React from 'react';
import ReactDOM from 'react-dom'; 
import {MenuContainer} from './MenuContainer';
import Session from '../services/Session';
import {LoginContainer} from './LoginContainer';
import Utils from './Utils';
import '../css/general.css';



export class MainContainer extends React.Component {


    constructor(props){
        super(props);
        //verify if user has login
        this.state = {
            isLogged: Session.isLogged(),
            content: Utils.main_template,
            step_one: {},
            step_two: {},
            actual_step: 1
        };
        Utils.unlockScreen();
        this.handleChangePage = this.handleChangePage.bind(this);
        this.saveState = this.saveState.bind(this);
        this.getState = this.getState.bind(this);
    }

    handleChangePage(page){
        if(page.type === this.state.content.type ){ //same page, nothing changes, unlock
            Utils.unlockScreen();
        } else {
            Utils.lockScreen();
            this.setState({content: page});
        }
        
    }


    saveState(name,state){
        this.setState({[name] : state});
    }

    getState(name){
        return this.state[name];
    }


    render(){
        if(!this.state.isLogged){
            ReactDOM.render(<LoginContainer></LoginContainer>);
            return; 
        }
        return (
            <div className="root_container">
                <MenuContainer storeState={this.saveState} getState={this.getState} pageChange={this.handleChangePage} ></MenuContainer>
                <div id="root_view"  className="main_back_container">
                    {this.state.content}
                </div>
            </div>
        )
    }

}