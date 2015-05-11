var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

// multiply with an angle in degrees to get an angle in radians
var degreesToRadians  = Math.PI / 180

canvas.height = 1000;
canvas.width = canvas.height;

var canvasRadius = canvas.height / 2
var clockRadius = canvasRadius * 0.75

// dictionary containing length, color, time and rotation values of pointers
var pointers = {
	hour: {
		length: {
			start: 0.07,
			end: 0.7
		},
		color: "black",
		width: 5,
		currentTimeValue: 0,
		getTimeRotation: function() {
			return this.currentTimeValue * 30 * degreesToRadians;
		}
	},
	minute: {
		length: {
			start: 0.07,
			end: 0.9,
		},
		color: "black",
		width: 5,
		currentTimeValue: 0,
		getTimeRotation: function() {
			return this.currentTimeValue * 6 * degreesToRadians;
		}
	},
	second: {
		length: {
			start: 0.07,
			end: 0.9
		},
		color: "red",
		width: 2,
		currentTimeValue: 0,
		getTimeRotation: function() {
			return this.currentTimeValue * 6 * degreesToRadians;
		}
	}
}

var secondsPointerValue = 0;
var minutesPointerValue = 0;
var hoursPointerValue = 0;

// change the anchorpoint to the center
context.translate(canvasRadius, canvasRadius);

window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
	canvas.width = document.body.clientWidth
	canvas.height = document.body.clientHeight

	canvasRadius = canvas.width > canvas.height ? canvas.height / 2: canvas.width / 2;
	clockRadius = canvasRadius * 0.8

	context.translate(canvas.width / 2, canvas.height / 2);
}

function drawFrame() {
	/* start clock frame */
	context.beginPath();
	context.arc(0, 0, clockRadius, 0, 2 * Math.PI, false);
	context.lineWidth = 5;
	context.fillStyle = "white";
	context.fill();
	context.strokeStyle = "black";
	context.lineWidth = 5;
	context.stroke();
	/* end clock frame */

	// draw hour lines
	for (var i = 0; i < 12; i++) {
		context.save();
		context.rotate(i * 30 * degreesToRadians );
		context.beginPath();
		context.moveTo(0, clockRadius);
		context.lineTo(0, clockRadius * 0.9);
		context.stroke();
		context.closePath();
		context.restore();
	};

	// draw minute lines
	for (var i = 0; i < 60; i++) {
		context.save();
		context.rotate(i * 6 * degreesToRadians );
		context.beginPath();
		context.lineWidth = 0.5
		context.moveTo(0, clockRadius);
		context.lineTo(0, clockRadius * 0.95);
		context.stroke();
		context.closePath();
		context.restore();
	};
}

// draw any pointer, the pointerType must be a key of the pointers dictionary
function drawPointer(pointerType) {

	context.save();
	context.rotate(pointers[pointerType].getTimeRotation());
	context.lineWidth = pointers[pointerType].width;
	context.beginPath();
	context.strokeStyle = pointers[pointerType].color;
	context.moveTo(0, pointers[pointerType].length.start * clockRadius)
	context.lineTo(0, -clockRadius * pointers[pointerType].length.end)
	context.stroke();
	context.closePath();
	context.restore();

}

function tick() {

	var currentTime = new Date()
	pointers.second.currentTimeValue = currentTime.getSeconds() + (currentTime.getMilliseconds() / 1000)
	pointers.minute.currentTimeValue = currentTime.getMinutes() + (pointers.second.currentTimeValue / 60)
	pointers.hour.currentTimeValue = currentTime.getHours() + (pointers.minute.currentTimeValue / 60)

	drawFrame();
	drawPointer("hour");
	drawPointer("minute");
	drawPointer("second");

	requestAnimationFrame(tick);
}

resizeCanvas();
tick();
