import { LightningElement, track, api, wire } from "lwc";
import saveAccounts from "@salesforce/apex/AccountCreationController.createAccounts";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
//To get the picklist values in lightning web components we can use 'getPicklistValues' or 'getPicklistValuesByRecordType' wire adapters, these wire adapters uses the lightning/uiObjectInfoApi scoped module to get the picklist values based on specific Field or based on Record Type.
import { getPicklistValuesByRecordType } from "lightning/uiObjectInfoApi";
import { getObjectInfo } from "lightning/uiObjectInfoApi";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";

export default class CascadePicklist extends LightningElement {
	@api layoutType = "space";
	@track keyIndex = 0;
	@track error;
	@track message;
	@track accountRecList = [
		{
			Name: "",
			Industry: "",
			Phone: ""
		}
	];
	allData;
	@track picklistLevelDetails = [
		// { apiName: "Account_Country__c", label: "Account Country", selectedValue: "", dataFilter: "parent" },
		{
			apiName: "AccountSource",
			label: "Account Country",
			selectedValue: "",
			dataFilter: "parent",
			dataSource: [],
			controlValues: []
		},
		//{ apiName: "Account_State__c", label: "Account State", selectedValue: "", dataFilter: "child" },
		{ apiName: "Active__c", label: "Account State", selectedValue: "", dataFilter: "child" },
		{ apiName: "City__c", label: "Account City", selectedValue: "", dataFilter: "grandChild" },
		{ apiName: "Street__c", label: "Account Street", selectedValue: "", dataFilter: "grandGrandChild" }
	];

	get options() {
		return [
			{ label: "New", value: "new" },
			{ label: "In Progress", value: "inProgress" },
			{ label: "Finished", value: "finished" }
		];
	}

	get getParentDataSource() {
		console.log("datasouce:::", this.picklistLevelDetails[0].dataSource);
		return this.picklistLevelDetails[0].dataSource;
	}

	handleChange(event) {
		const value = event.detail.value;

		const itemIndex = event.target.dataset.index;
		const filterArray = this.picklistLevelDetails[itemIndex];

		if (value) filterArray.selectedValue = value;
	}

	// Account object info
	@wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
	objectInfo;

	// '012000000000000AAA',
	@wire(getPicklistValuesByRecordType, {
		objectApiName: ACCOUNT_OBJECT,
		recordTypeId: "$objectInfo.data.defaultRecordTypeId"
	})
	countryPicklistValues({ error, data }) {
		if (data) {
			this.error = null;
			this.allData = data;

			const currentData = this.getCurrentPicklistValues(this.picklistLevelDetails[0].apiName);
			const controlData = this.getCurrentPicklistControlValues(this.picklistLevelDetails[0].apiName);
			const formatData = this.formatPicklistValues(currentData);
			this.picklistLevelDetails[0].dataSource = formatData;
			this.picklistLevelDetails[0].controlValues = controlData;
			//const temp = data.picklistFieldValues[this.picklistLevelDetails[0].apiName].controllerValues;

			console.log("controlValues:::", currentData);
			console.log("totalDependentValues:::", formatData);
		} else if (error) {
			this.error = JSON.stringify(error);
		}
	}
	getCurrentPicklistValues(apiName) {
		return this.allData.picklistFieldValues[apiName].values;
	}
	getCurrentPicklistControlValues(apiName) {
		return this.allData.picklistFieldValues[apiName].controllerValues;
	}
	formatPicklistValues(currentData) {
		let options = [{ label: "--None--", value: "--None--" }];
		currentData.forEach((key) => {
			options.push({
				label: key.label,
				value: key.value
			});
		});
		return options;
	}
}
