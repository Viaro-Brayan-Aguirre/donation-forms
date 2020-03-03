import React from 'react'; 
import { DonationFormStepThree } from '../components/DonationFormStepThree';
import Utils from './Utils';
//import DonationAPI from '../services/DonationAPI';

//let ip_address = "";
export class DonationFormStepThreeContainer extends React.Component {

    constructor(props){
        super(props);
        let step_one = this.props.getState('step_one');
        let step_two = this.props.getState('step_two');
        let state_data = {
            form_one: step_one,
            form_two: step_two
        };
        this.state = state_data;
        this.confirmDonation =  this.confirmDonation.bind(this);
    }
    
    render (){

        return <DonationFormStepThree 
            form_data={this.state}
            changeStep={this.props.changeStep}
            getTotalAmount={this.getTotalAmount}
            confirmDonation = {this.confirmDonation}
        />

    }



    componentDidMount(){
        /*Utils.findIP.then(ip => {
            ip_address = ip;
            Utils.unlockScreen();
        } ).catch(e =>{
            console.error(e);
            Utils.unlockScreen();
        } );*/
        Utils.unlockScreen();
    }

    //creates the object for donation, starts the API call. 
    confirmDonation(){
        Utils.lockScreen();
        let form_one = this.state.form_one;
        form_one.total_amount = this.getTotalAmount(form_one.frequency,form_one.amount_value);
        let form_two = this.state.form_two.agency_data;

        let request_object = {
            "CampaignId" : "ac58aac5-2baa-41a0-9395-898bcb939cda",
            "PledgeStatusType" : 0,
            "DonationSourceType" : 9,
            "Pa" : 5,
            "FrequencyType": form_one.frequency,
            "PaymentAmountType" : 1,
            "PaymentTotalValue" : form_one.total_amount,
            "AddOnTotalValue" : 0,
            "PaymentAmount" : form_one.amount_value,
            "TotalValue" : form_one.total_amount,
            "Payment": {},
            "AddOnList" : [],
            "AddOnTotalList": [],
            "DesignationAmountType" : 1,
            "DesignationWriteInList" : [],
            "NegativeDesignation" : "",
            "DesignationList" : [//form_two.agency_data
                {
                    "CFCAgencyId" : form_two.CFCAgencyId ,
                    "DesignateableEntityType" : (form_two.DesignateableEntityTypeCode == null ? form_two.DesignationEntityType : form_two.DesignateableEntityTypeCode ), 
                    "DesignationId" : "",
                    "DisplayName" : "",
                    "DistributionDesignationId" : "",
                    "EIN": "",
                    "EntityId" : form_two.EntityId,
                    "IsDefaultPanelItem" : false,
                    "IsRejected" : false,
                    "MinimumDonation" : form_two.MinimumDonation,
                    "MinimumTotalDonationForDesignation" : form_two.MinimumTotalDonationForDesignation,
                    "Name" : form_two.Name,
                    "OrganizationNumber" : "",
                    "DesignationAmount" : form_one.total_amount ,
                    "StandardAccountCode" : form_two.StandardAccountCode
                }
                
            ],
            "PaymentIncreaseAmountType" : 1,
            "PaymentIncreaseAmount" : 0,
            "IsImpersonated" : false,
            "ImpersonatedUser" : "",
            "IsConfirmed" : true,
            "CustomField1" : form_one.cardType,
            "CustomField2" : form_one.nameOnCard,
            "CustomField3" : form_one.cardNumber,
            "CustomField4" : form_one.expirationDateMonth + '' + form_one.expirationDateYear,
            "CustomField5" : form_one.contactEmail,
            "CustomField6" : form_one.csv
        };
        console.log("Object: ", request_object);
        /*let ok = function(){
            console.log("O");
        }
        //DonationAPI.saveDonation(request_object,ok,ok);*/
        this.props.changeStep(4);
    }

    


    getTotalAmount(frequency, pledge ){
        switch(parseInt(frequency)){
            case 1:
                return pledge;
            case 2: 
                return 12 * pledge;
            case 3 : 
                return 4 * pledge;
            case 4: 
                return 2 * pledge;
            default:
                return "Please review frequency"
        }
    }


}