import { LightningElement, track } from "lwc";

export default class ExtendTextEditorContainer extends LightningElement {
	@track messageFromChild;

	handleTextChange(event) {
		console.log("parent");
		this.messageFromChild = event.detail;
	}
}
