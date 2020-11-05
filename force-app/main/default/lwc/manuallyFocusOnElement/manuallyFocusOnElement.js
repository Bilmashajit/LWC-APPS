import { LightningElement } from "lwc";

export default class ManuallyFocusOnElement extends LightningElement {
	isModalOpen = false;

	connectedCallback() {
		this.setFocusOnElement("lightning-button.showPopup");
	}

	setFocusOnElement(controlIdentity) {
		setTimeout(() => {
			const lControl = this.template.querySelector(controlIdentity);
			lControl.focus();
			console.log("constructor", lControl);
		});
	}

	get modalClass() {
		if (this.isModalOpen) {
			return "slds-modal slds-fade-in-open";
		}
		return "slds-modal ";
	}

	get modalBackdropClass() {
		if (this.isModalOpen) {
			return "slds-backdrop slds-backdrop_open";
		}
		return "slds-backdrop";
	}
	handlePopup() {
		console.log("clicked");
		this.isModalOpen = true;
		this.setFocusOnElement("[data-id='popupClose']");
	}

	closeModal() {
		this.isModalOpen = false;
		this.setFocusOnElement("lightning-button.showPopup");
	}
}
