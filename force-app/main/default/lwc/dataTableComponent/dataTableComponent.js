import { LightningElement, wire } from "lwc";
import getAccounts from "@salesforce/apex/TableController.getAccounts";
import { refreshApex } from "@salesforce/apex";

const COLUMN = [
	{ label: "Account Name", fieldName: "Name", type: "text" },
	{
		label: "AnnualRevenue",
		fieldName: "AnnualRevenue",
		type: "currency",
		cellAttributes: {
			class: { fieldName: "amountColor" },
			iconName: { fieldName: "iconName" },
			iconPosition: "right"
		}
	},
	{ label: "Industry", fieldName: "Industry", type: "text" },
	{ label: "Phone", fieldName: "Phone", type: "phone" }
];

export default class DataTableComponent extends LightningElement {
	accountsResponse;
	columns = COLUMN;
	tableData;

	// * Setting processing variable to true initially
	processing = true;

	@wire(getAccounts)
	accountsHandler(response) {
		this.accountsResponse = response;
		let data = response.data;
		let error = response.error;

		if (data || error) {
			this.processing = false;
		}

		if (data) {
			this.tableData = data.map((item) => {
				let amountColor = "";
				let iconName = "";
				if (item.AnnualRevenue) {
					amountColor = item.AnnualRevenue < 50000 ? "slds-text-color_error" : "slds-text-color_success";
					iconName = item.AnnualRevenue < 50000 ? "utility:down" : "utility:up";
				}

				return { ...item, amountColor: amountColor, iconName: iconName };
			});
			console.log(this.tableData);
		} else if (error) {
			console.log({ error });
		}
	}

	refreshAccountList() {
		// * Set processing variable to true
		this.processing = true;
		/*
		 *   It'll refresh the data in browser cache only
		 *   if there is a change on the server side
		 */
		refreshApex(this.accountsResponse).finally(() => (this.processing = false));
		// * Set processing variable to false after receiving response from salesforce
	}
}
