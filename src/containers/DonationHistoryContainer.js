import React from 'react';
import {DonationHistory} from '../components/DonationHistory';
import {Modal} from '../components/Modal';
import DonationAPI from '../services/DonationAPI';
import Utils from './Utils';


export class DonationHistoryContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            history: {},
            show: false,
            transaction: {},
            modal_show: false
        };
        this.hasHistory =  this.hasHistory.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    render(){
        let styles_visible = {display: (this.state.show? 'block' : 'none')};
        let title_classes = "col-12 receipt_title";
        let blond_classes = "col-12 description";
        let info_classes = "col-12 receipt_value";
        return(
            <div className="mainHistoryContainer" style={styles_visible}>
                <DonationHistory 
                    history_data={this.state.history}
                    handleClick={this.handleClick}/>
                <Modal title="Pledge Details" show={this.state.modal_show} close={this.handleCloseModal}  >
                    <div className="container">
                        <div className="row receipt_view">
                            <div className={title_classes}>
                                <label>Transaction #{this.state.transaction.TransactionNumber}</label>
                            </div>
                            <div className={blond_classes}>
                                <label>Date created</label>
                            </div>
                            <div className={info_classes}>
                                <label>{this.state.transaction.DateCreated} </label>
                            </div>
                            <div className={blond_classes}>
                                <label>Status</label>
                            </div>
                            <div className={info_classes}>
                                <label>I can't found the property</label>
                            </div>
                            <div className={blond_classes}>
                                <label>Payment Type</label>
                            </div>
                            <div className={info_classes}>
                                <label>{Utils.getTypeOfPayment(this.state.transaction.PaymentType) } </label>
                            </div>
                            <div className={blond_classes}>
                                <label>Pledge</label>
                            </div>
                            <div className={info_classes}>
                                <label>{ this.getQuantityAsText(this.state.transaction.PaymentTotalValue)}</label>
                            </div>
                            <div className={blond_classes}>
                                <label>Total Annual Amount</label>
                            </div>
                            <div className={info_classes}>
                                <label>{this.state.transaction.displayTotalAmount}</label>
                            </div>
                            <div className={title_classes}>
                                <label>Charity Details</label>
                            </div>
                        </div>
                        {this.state.transaction.charity_details}
                    </div>
                </Modal>
            </div>
        );
    }

    hasHistory(data){
        this.setState({show: true,
            history: data});
        Utils.unlockScreen();
    }

    componentDidMount(){
        DonationAPI.getHistory(null,this.hasHistory,this.hasHistory);
    }


    handleClick(e){
        let pos = e.currentTarget.getAttribute('name'); 
        let element = this.state.history.PledgeList[parseInt(pos)];
        if(element === null || element === undefined){
            return; //no data to process
        }
        //add the total amount, is used many times 
        element.displayTotalAmount = this.getQuantityAsText(Utils.getTotalAmount(element.FrequencyType,element.PaymentTotalValue));
        let charities_details = element.DesignationList;
        element.charity_details = charities_details.map(charity => {
            let quantity = this.getQuantityAsText(charity.DesignationAmount);
            return <div className=" row receipt_view">
                    <div className="col-4 charity_detail">
                        <label style={{fontWeight: 'bold'}}>{quantity}</label>
                    </div>
                    <div className="col-8">
                        {charity.Name}
                    </div>
                </div>
        });

        this.setState({
            modal_show: true,  
            transaction: element
        });
    }

    getQuantityAsText(quantity){
        if(quantity === undefined){
            quantity = "0.00";
        }
        if(("" + quantity).indexOf(".") === -1){
            quantity += ".00";
        }
        return "$ "+quantity;
    }


    handleCloseModal(){
        this.setState({
            modal_show: false,  
            transaction: {}
        });
    }

} 