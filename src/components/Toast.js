import React from 'react';
import ReactDOM from 'react-dom';

export class Toast extends React.Component {
    constructor(props){
        super(props);
        this.deleteElement = this.deleteElement.bind(this);
        let toastContainer =  document.getElementById('toastContainer');
        if( !isNaN(toastContainer.getAttribute('generated')) && toastContainer.getAttribute('generated') != null ){
            toastContainer.setAttribute('generated',( parseInt(toastContainer.getAttribute('generated')) + 1));
        } else {
            toastContainer.setAttribute('generated',1);
        }
        let id_new = Number(toastContainer.getAttribute('generated'));
        this.state = { new_id: id_new};
    }

    deleteElement(){
        ReactDOM.unmountComponentAtNode(document.getElementById('toastContainer'));
    }

    render(){   
        return (
            <div id={'toast-' + this.state.new_id} className={this.props.type + " toast fade show "} role="alert" aria-live="assertive" aria-atomic="true" data-delay="5000">
                <div className="toast-body no-title">{this.props.message}
                <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close"></button></div>
            </div>
        );
    }

    componentDidMount(){
        if( this.props.timer !== undefined){
            setTimeout(this.deleteElement,this.props.timer);
        } else {
            setTimeout(this.deleteElement,1500);
        }
    }

}