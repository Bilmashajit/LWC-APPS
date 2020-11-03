import { LightningElement, track } from "lwc";

const columns = [
	{ label: "Snippet", fieldName: "tag" },
	{ label: "Message", fieldName: "message" }
];
export default class ExtendTextEditor extends LightningElement {
	story = "";
	snippetTag = "";
	snippetMessage = "";
	data = [];
	initialRender = false;

	@track snippetList = [
		{ id: 1, tag: "#hwc", message: "Hello you are welcome to Bangladesh." },
		{ id: 2, tag: "#lub", message: "Love you Bangladesh." },
		{ id: 3, tag: "#hse", message: "Hello salesforce." }
	];

	COLUMNS = columns;

	connectedCallback() {
		this.data = [...this.snippetList];
	}
	renderedCallback() {
		if (this.initialRender) return;

		this.initialRender = true;

		const inputArea = this.template.querySelector("lightning-textarea");
		inputArea.focus();
		const inputBox = this.template.querySelector("[data-id='selectId']");
		inputBox.focus();
	}

	handleOnchange(event) {
		const input = event.target.value;
		this.story = input;

		console.log("empty::", input.lastIndexOf("#"));
		const index = input.lastIndexOf("#");
		if (index >= 0) {
			this.isModalOpen = true;
		}

		this.setAllTextForChild();
		console.log(input);
	}

	handleSnippetOnChange(event) {
		//console.log("focus", this.template.querySelector("[data-id='selectId']"));
		const regex = new RegExp(event.target.value, "gi");
		this.data = this.snippetList.filter((row) => regex.test(row.tag));

		this.refreshDataTable();
	}

	setAllTextForChild() {
		console.log("child event fire");
		const event = new CustomEvent("getalltext", { detail: this.story });
		this.dispatchEvent(event);
	}

	handleSnippetTag(event) {
		this.snippetTag = event.target.value;
		console.log("snippetTag::", this.snippetTag);
	}
	handleSnippetMessage(event) {
		this.snippetMessage = event.target.value;
	}

	handleAddSnippet(event) {
		const currentSnippet = { id: this.snippetList + 1, tag: this.snippetTag, message: this.snippetMessage };
		this.snippetList = [currentSnippet, ...this.snippetList];
		this.refreshSearchSnippet();
		this.refreshDataTable();
		this.snippetMessage = "";
		this.snippetTag = "";
	}

	getSelectedName(event) {
		const selectedRows = event.detail.selectedRows;
		this.refreshDataTable();
		if (selectedRows) {
			this.closeModal();
			this.formatStory(selectedRows[0].message);
			this.refreshSearchSnippet();
			this.setAllTextForChild();
		}

		console.log("selectedRows::", selectedRows[0].message);
	}

	formatStory(message) {
		this.story = this.story.slice(0, -1).concat(" " + message);
	}

	refreshDataTable() {
		this.template.querySelector("lightning-datatable").selectedRows = [];
	}

	refreshSearchSnippet() {
		this.data = this.snippetList;
		this.template.querySelector("[data-id='selectId']").value = "";
	}

	isModalOpen = false;
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
	}

	closeModal() {
		this.isModalOpen = false;
	}
}
