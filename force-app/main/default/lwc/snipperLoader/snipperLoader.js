import { api, LightningElement } from "lwc";

export default class SnipperWork extends LightningElement {
	@api spinnerSize = "medium";
	@api spinnerText = "";
	@api variant = "base";

	get helpText() {
		return this.spinnerText ? this.spinnerText : "Loading spinner";
	}

	get className() {
		return `loader ${this.variant === "inverse" ? "inverse" : ""}`;
	}
}
