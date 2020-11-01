import { LightningElement } from "lwc";

export default class PicklistExample extends LightningElement {
	selectedValue = "inProgress";

	get options() {
		return [
			{ label: "New", value: "new" },
			{ label: "In Progress", value: "inProgress" },
			{ label: "Finished", value: "finished" }
		];
	}

	handleChange(event) {
		this.selectedValue = event.detail.value;
	}
}
