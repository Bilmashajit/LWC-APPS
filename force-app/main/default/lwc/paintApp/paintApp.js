import { LightningElement } from "lwc";
import {
	TOOL_LINE_ICON,
	TOOL_RECTANGLE_ICON,
	TOOL_CIRCLE_ICON,
	TOOL_TRIANGLE_ICON,
	TOOL_LINE,
	TOOL_RECTANGLE,
	TOOL_CIRCLE,
	TOOL_TRIANGLE
} from "./paintTool.js";

import DrawInCanvas from "./drawInCanvas.js";

let paint = null;
export default class PaintApp extends LightningElement {
	TOOL_LINE_ICON = TOOL_LINE_ICON;
	TOOL_RECTANGLE_ICON = TOOL_RECTANGLE_ICON;
	TOOL_CIRCLE_ICON = TOOL_CIRCLE_ICON;
	TOOL_TRIANGLE_ICON = TOOL_TRIANGLE_ICON;

	TOOL_LINE = TOOL_LINE;
	TOOL_RECTANGLE = TOOL_RECTANGLE;
	TOOL_CIRCLE = TOOL_CIRCLE;
	TOOL_TRIANGLE = TOOL_TRIANGLE;
	initialRender = false;

	renderedCallback() {
		if (this.initialRender) return;

		this.initialRender = true;
		let canvasElement = this.template.querySelector("canvas");
		let ctx = canvasElement.getContext("2d");

		console.log("renderedCallback");

		paint = new DrawInCanvas(this.template, canvasElement, ctx);
		paint.activeTool = TOOL_LINE;

		this.template.querySelectorAll("[data-tool]").forEach((el) => {
			el.addEventListener("click", (e) => {
				this.setSelectedItem(el);

				let selectedTool = el.getAttribute("data-tool");
				paint.activeTool = selectedTool;
			});
		});
	}

	setSelectedItem(el) {
		this.template.querySelector("[data-tool].active").classList.toggle("active");
		el.classList.toggle("active");
	}
}
