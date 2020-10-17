import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

//step-1
import CAR_OBJECT from "@salesforce/schema/Car__c";
//step-2
import CAR_NAME_FIELD from "@salesforce/schema/Car__c.Name";
import CONTACT_FIELD from "@salesforce/schema/Car__c.Contact__c";
import BUILD_YEAR_FIELD from "@salesforce/schema/Car__c.Build_Year__c";
import PER_DAY_RENT_FIELD from "@salesforce/schema/Car__c.Per_Day_Rent__c";
import CAR_TYPE from "@salesforce/schema/Car__c.Car_Type__c";
import WORKER_TYPE from "@salesforce/schema/Car__c.Worker_Type__c";

export default class CarCreator extends LightningElement {
	objectApiName = CAR_OBJECT;
	fields = [CAR_NAME_FIELD, CONTACT_FIELD, BUILD_YEAR_FIELD, PER_DAY_RENT_FIELD, CAR_TYPE, WORKER_TYPE];

	handleSuccess(event) {
		const toastEvent = new ShowToastEvent({
			title: "Car created",
			message: "Record ID: " + event.detail.id,
			variant: "success"
		});
		this.dispatchEvent(toastEvent);
	}
}
