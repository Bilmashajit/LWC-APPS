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
			apiName: "A__c",
			label: "Account Country",
			selectedValue: "",
			dataFilter: "parent",
			dataSource: [],
			controlValues: []
		},
		//{ apiName: "Account_State__c", label: "Account State", selectedValue: "", dataFilter: "child" },
		{
			apiName: "Account_State__c",
			label: "Account State",
			selectedValue: "",
			dataFilter: "child",
			dataSource: [],
			controlValues: []
		},
		{
			apiName: "CustomerPriority__c",
			label: "Customer Priority",
			selectedValue: "",
			dataFilter: "grandChild",
			dataSource: [],
			controlValues: []
		},
		{
			apiName: "SLA__c",
			label: "SLA",
			selectedValue: "",
			dataFilter: "grandGrandChild",
			dataSource: [],
			controlValues: []
		}

		//{ apiName: "City__c", label: "Account City", selectedValue: "", dataFilter: "grandChild" },
		//{ apiName: "Street__c", label: "Account Street", selectedValue: "", dataFilter: "grandGrandChild" }
	];

	get options() {
		return [
			{ label: "New", value: "new" },
			{ label: "In Progress", value: "inProgress" },
			{ label: "Finished", value: "finished" }
		];
	}

	datasourceIndex = 0;
	get getParentDataSource() {
		const data = this.picklistLevelDetails[this.datasourceIndex].dataSource;

		console.log("getSomeValue", data);
		this.datasourceIndex = this.datasourceIndex + 1;

		return data ? data : [];
		//return this.picklistLevelDetails[0].dataSource;
	}

	handleChange(event) {
		const value = event.detail.value;
		console.log("this.picklistLevelDetails.length", this.picklistLevelDetails.length);
		const itemIndex = event.target.dataset.index;
		console.log(
			"this.picklistLevelDetails.controlValues",
			JSON.stringify(this.picklistLevelDetails[itemIndex + 1].controlValues)
		);
		if (itemIndex < this.picklistLevelDetails.length - 1 && value) {
			//const filterArray = this.picklistLevelDetails[itemIndex + 1];
			//filterArray.selectedValue = value;
		}
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

			if (!data) return;

			for (let index = 0; index < this.picklistLevelDetails.length; index++) {
				console.log(
					"this.allData.picklistFieldValues[apiName]",
					this.allData.picklistFieldValues[this.picklistLevelDetails[index].apiName]
				);
				const currentData = this.getCurrentPicklistValues(this.picklistLevelDetails[index].apiName);
				const formatData = this.formatPicklistValues(currentData);
				this.picklistLevelDetails[index].dataSource = formatData;

				let controlData = this.getCurrentPicklistControlValues(this.picklistLevelDetails[index].apiName);

				this.formatPicklistControlValues(currentData, controlData);

				// if (index !== 0 && index !== this.picklistLevelDetails.length - 1) {
				// 	let controlData = this.getCurrentPicklistControlValues(
				// 		this.picklistLevelDetails[index + 1].apiName
				// 	);

				// 	let temp = this.formatPicklistControlValues(currentData, controlData);

				// 	//this.picklistLevelDetails[index].controlValues = temp;
				// }
			}
			//const temp = data.picklistFieldValues[this.picklistLevelDetails[0].apiName].controllerValues;

			this.datasourceIndex = 0;
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

	formatPicklistControlValues(currentData, controlData) {
		console.log("currentData", currentData);
		console.log("controlData", controlData);
	}
}
