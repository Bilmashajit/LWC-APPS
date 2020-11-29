import { LightningElement } from "lwc";

export default class SpinnerContainer extends LightningElement {
	showFirst = false;
	showSecond = false;
	showThird = false;
	handleSpinner(event) {
		const { name } = event.target;
		this[name] = true;
		let timer = window.setTimeout(() => {
			console.log({ event });
			this[name] = false;
			window.clearTimeout(timer);
		}, 200000);
	}
}
