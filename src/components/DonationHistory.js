import React from 'react';
import '../css/history.css';


export class DonationHistory extends React.Component {

    constructor(props){
        super(props);
        this.generateTableContent = this.generateTableContent.bind(this);
    }

    render(){
        
        return (
            <div className="main_history_container" >
                <div className="container">
                    <div className="row">
                        <div className="col-12 content" >
                            <h2> {this.props.history_data.PledgeSummaryDesignationsTitle} </h2>
                            <p>{this.props.history_data.DonationHistoryInstructions}</p>
                            <div className="center_table">
                                <table className="table table-responsive">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Campaign</th>
                                        <th scope="col">Pledge</th>
                                        <th scope="col">Payment Type</th>
                                        <th scope="col">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.generateTableContent(this.props.history_data)}
                                </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    //generate rows of table 
    generateTableContent(){
        if(this.props.history_data === undefined ) {
            return;
        }
        if(this.props.history_data.DonationHistoryInstructions === undefined ){
            return;
        }
        //iterates over the content data
        let donation_key = 0;
        let payment_type = ["Cero","One","Credit card","three","Four","Cash","Six","Seven"];
        return  this.props.history_data.PledgeList.map(pledge => { 
            let date = new Date(pledge.DateCreated);
            let display_date = ("0" + (date.getMonth()+1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2) + "/" + date.getFullYear();
            let quantity = "" + pledge.PaymentTotalValue; 
            if(quantity.indexOf(".") === -1){
                quantity += ".00";
            }
            return(
                <tr name={donation_key} className="table_row" key={'pledge-' + donation_key} onClick={this.props.handleClick}>
                    <th scope="row">{++donation_key}</th>
                    <td>{display_date}</td>
                    <td className="campaign_name" title={pledge.CampaignName}>{pledge.CampaignName}</td>
                    <td>{pledge.DisplayTransactionNumber}</td>
                    <td>{payment_type[pledge.PaymentType]}</td>
                    <td className="amount_show">{quantity}</td>  
                </tr>
            );
        });
    }


} 