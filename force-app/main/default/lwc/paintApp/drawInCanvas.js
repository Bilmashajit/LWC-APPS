import Utility from "./paintAppUtility.js";
import { TOOL_LINE, TOOL_RECTANGLE, TOOL_CIRCLE, TOOL_TRIANGLE } from "./paintTool.js";
export default class DrawInCanvas {
	tool = null;
	appCanvas = null;
	appContext = null;
	template = null;
	startPos = null;
	savedImage = null;
	template = null;

	constructor(template, canvasElement, ctx) {
		this.template = template;
		this.appCanvas = canvasElement;
		this.appContext = ctx;
		this.boundMouseDown = this.boundMouseDown.bind(this);
		this.boundMouseMove = this.boundMouseMove.bind(this);
		this.boundMouseUp = this.boundMouseUp.bind(this);

		this.init();
	}
	set activeTool(tool) {
		this.tool = tool;
		console.log(tool);
	}

	init() {
		this.appCanvas.addEventListener("mousedown", this.boundMouseDown);
	}
	boundMouseDown(e) {
		this.savedImage = this.appContext.getImageData(
			0,
			0,
			this.appContext.canvas.width,
			this.appContext.canvas.height
		);

		this.appCanvas.addEventListener("mousemove", this.boundMouseMove);
		this.template.addEventListener("mouseup", this.boundMouseUp);

		this.startPos = Utility.getMouseCoordsOnCanvas(this.appCanvas, e);
	}

	boundMouseMove(e) {
		this.currentPos = Utility.getMouseCoordsOnCanvas(this.appCanvas, e);

		switch (this.tool) {
			case TOOL_LINE:
			case TOOL_RECTANGLE:
			case TOOL_CIRCLE:
			case TOOL_TRIANGLE:
				this.drawShape();
				break;
			default:
				break;
		}
	}
	boundMouseUp(e) {
		this.appCanvas.removeEventListener("mousemove", this.boundMouseMove);
		this.template.removeEventListener("mouseup", this.boundMouseUp);
	}

	drawShape() {
		this.appContext.putImageData(this.savedImage, 0, 0);
		this.appContext.beginPath();

		if (TOOL_LINE === this.tool) {
			this.appContext.moveTo(this.startPos.x, this.startPos.y);
			this.appContext.lineTo(this.currentPos.x, this.currentPos.y);
		} else if (TOOL_RECTANGLE === this.tool) {
			this.appContext.rect(
				this.startPos.x,
				this.startPos.y,
				this.currentPos.x - this.startPos.x,
				this.currentPos.y - this.startPos.y
			);
		} else if (TOOL_CIRCLE === this.tool) {
			let distance = Utility.calcHypotenuse(this.startPos, this.currentPos);
			this.appContext.arc(this.startPos.x, this.startPos.y, distance, 0, 2 * Math.PI, false);
		} else if (TOOL_TRIANGLE === this.tool) {
			this.appContext.moveTo(this.startPos.x + (this.currentPos.x - this.startPos.x) / 2, this.startPos.y);
			this.appContext.lineTo(this.startPos.x, this.currentPos.y);
			this.appContext.lineTo(this.currentPos.x, this.currentPos.y);
			this.appContext.closePath();
		}
		this.appContext.stroke();
	}
}
