import { api, LightningElement, track, wire } from "lwc";
import getRelatedFilesByRecordId from "@salesforce/apex/filePreviewAndDownloadController.getRelatedFilesByRecordId";
import { NavigationMixin } from "lightning/navigation";

export default class FilePreviewAndDownload extends NavigationMixin(LightningElement) {
	@track
	filesList = [];
	@api recordId = "0012w00000NJSoDAAX";
	@wire(getRelatedFilesByRecordId, { recordId: "$recordId" })
	wiredResult({ data, error }) {
		if (data) {
			//console.log({ data });
			this.filesList = Object.keys(data).map((item) => ({
				label: data[item],
				value: item,
				url: `/sfc/servlet.shepherd/document/download/${item}`
			}));

			console.log("filesList", JSON.stringify(this.filesList));
		}
		if (error) {
			console.log({ error });
		}
	}

	previewHandler(event) {
		const id = event.target.dataset.id;
		console.log({ id });

		this[NavigationMixin.Navigate]({
			type: "standard__namedPage",
			attributes: {
				pageName: "filePreview"
			},
			state: {
				selectedRecordId: id
			}
		});
	}
}
