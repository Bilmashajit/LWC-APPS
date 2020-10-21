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

	renderedCallback() {
		let canvasElement = this.template.querySelector("canvas");
		let ctx = canvasElement.getContext("2d");

		paint = new DrawInCanvas(this.template, canvasElement, ctx);

		this.template.querySelectorAll("[data-tool]").forEach((el) => {
			el.addEventListener("click", (e) => {
				this.setSelectedItem(el);
				//console.log(e.target.alt);

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
