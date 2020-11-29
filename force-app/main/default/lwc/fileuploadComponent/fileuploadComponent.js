import { api, LightningElement } from "lwc";
import uploadFile from "@salesforce/apex/FileUploaderController.uploadFile";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class FileuploadComponent extends LightningElement {
	@api recordId;
	fileData;

	openfileUpload(event) {
		const file = event.target.files[0];
		let reader = new FileReader();

		reader.onload = () => {
			let base64 = reader.result.split(",")[1];
			this.fileData = {
				filename: file.name,
				base64: base64,
				recordId: this.recordId
			};

			console.log(this.fileData);
		};

		reader.readAsDataURL(file);
	}

	handleClick() {
		const { base64, filename, recordId } = this.fileData;

		uploadFile({ base64: base64, filename: filename, recordId: recordId })
			.then((result) => {
				this.fileData = null;
				console.log({ result });
				let title = `${filename} uploaded successfully!`;
				this.ShowToastMessage(title);
			})
			.catch((error) => {
				console.log({ error });
			});
	}

	ShowToastMessage(title) {
		const toastEvnt = new ShowToastEvent({
			title: title,
			variant: "success"
		});
		this.dispatchEvent(toastEvnt);
	}
}
