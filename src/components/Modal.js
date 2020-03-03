import React from 'react';
import '../css/modal.css';

export class Modal extends React.Component {

    render(){
        let show = this.props.show ? 'show_modal' : 'hide_modal';
        return (
            <div className={ show + " modal_component " } >
                <div onClick={this.props.close} className="helper_background"></div>
                <div className="helper_container" >
                    <div className="helper_title_section">
                        <i className="close_helper fa  fa-times " onClick={this.props.close} ></i>
                        <div className="helper_title">{this.props.title}</div>
                    </div>
                    <div className="helper_content_container">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }

}