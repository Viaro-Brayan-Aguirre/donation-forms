import React from 'react';


//Component to handle the maximize and minimize sections on the forms
//you must provide a title, you can send children for title on the property title_child. 
//id: form id  
//title: title to show in header section
//starts: (show | hide) maximize or minimize

export class FormSection extends React.Component {

    render(){
        return (
            <form id={this.props.id} className="form_section show">
                <div className="form_section_title">
                    <i className="maximize fa fa-chevron-down" onClick={this.maximize}></i>
                    <i className="minimize fa fa-chevron-up " onClick={this.minimize}></i>
                    <div className="section_title">{this.props.title} {this.props.title_child}</div>
                </div>
                <div className="form_section_content">
                    {this.props.children}
                </div>
            </form>
        );
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


} 