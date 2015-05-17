var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

// multiply with an angle in degrees to get an angle in radians
var degreesToRadians  = Math.PI / 180

canvas.height = 800;
canvas.width = canvas.height;

var canvasRadius = canvas.height / 2
var clockRadius = canvasRadius * 0.75
var pointerCircleRadius = 8;

var clockFrameColor = "#F7FCE7";

// dictionary containing length, color, time and rotation values of pointers
var pointers = {
 	hour: {
		length: {
			start: 0.1,
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
			start: 0.1,
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
			start: 0.1,
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

var manImg;

function drawMan(strDataURI, context, coords) {
    if (!manImg) {
      var img = new window.Image();
      img.addEventListener("load", function () {
          manImg = img;
          context.drawImage(manImg, coords.x, coords.y);
      });
      img.setAttribute("src", strDataURI);
    } else {
          context.drawImage(manImg, coords.x, coords.y);
    }
}

var sunImg;

function drawSun(strDataURI, context, coords) {
    if (!sunImg) {
      var img = new window.Image();
      img.addEventListener("load", function () {
          sunImg = img;
          context.drawImage(sunImg, coords.x, coords.y);
      });
      img.setAttribute("src", strDataURI);
    } else {
          context.drawImage(sunImg, coords.x, coords.y);
    }
}

var numberCoords = [

	{ x: 100, y: -200 },
	{ x: 180, y: -120 },
	{ x: 200, y:  10 },
	{ x: 180, y: 130 },
	{ x: 110, y: 230 },
	{ x: -30, y: 270 },
	{ x: -160, y: 220 },
	{ x: -230, y: 140 },
	{ x: -260, y: 20 },
	{ x: -230, y: -120 },
	{ x: -140, y: -200 },
	{ x: -40, y: -240 }

];

var numberSymbols = [

	"I",
	"II",
	"III",
	"IV",
	"V",
	"VI",
	"VII",
	"VIII",
	"IX",
	"X",
	"XI",
	"XII",
]

var numberSymbols = [

	"I",
	"II",
	"III",
	"IV",
	"V",
	"VI",
	"VII",
	"VIII",
	"IX",
	"X",
	"XI",
	"XII",
]

var secondsPointerValue = 0;
var minutesPointerValue = 0;
var hoursPointerValue = 0;

// change the anchorpoint to the center
context.translate(canvasRadius, canvasRadius);


function drawFrame() {
	/* start clock frame */
	context.beginPath();
	context.arc(0, 0, clockRadius, 0, 2 * Math.PI, false);
	context.lineWidth = 5;
	context.fillStyle = clockFrameColor;
	context.fill();
	context.strokeStyle = "black";
	context.lineWidth = 5;
	context.stroke();
	/* end clock frame */

	// Draw time
	context.fillStyle = "black";
	context.font = "20px Georgia";
	context.fillText("TIME", -20, -120);
  context.fillText("PINK FLOYD", -50, -90);

  context.fillText("So you run", -40, 80);
  context.fillText("And you run", -45, 110);
  context.fillText("To catch up with the sun", -100, 140);


	// draw hour lines
	for (var i = 0; i < 12; i++) {
		context.save();
		context.rotate(i * 30 * degreesToRadians - (60 * degreesToRadians));
		context.beginPath();
		context.moveTo(0, clockRadius);
		context.lineTo(0, clockRadius * 0.95);


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
	context.arc(0, 0, pointerCircleRadius, 0, 2 * Math.PI, false);
	context.lineWidth = 5;
	context.fillStyle = pointers[pointerType].color;
	context.strokeStyle = pointers[pointerType].color;
	context.fill();
	context.restore();

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

function drawImages() {
    drawMan("../img/run-frames/run-1.png", context, { x: -240, y: -80});
    drawSun("../img/sun.png", context, { x: 30, y: -80});
}

function drawNumbers() {

	// text
	for (var i = 0; i < 12; i++) {
		context.save();
		context.fillStyle = "black";
		context.font = "50px Georgia";
		context.fillText(numberSymbols[i], numberCoords[i].x, numberCoords[i].y);
		context.restore();
	}

}

function tick() {

	var currentTime = new Date()
	pointers.second.currentTimeValue = currentTime.getSeconds();
	pointers.minute.currentTimeValue = currentTime.getMinutes() + (pointers.second.currentTimeValue / 60);
	pointers.hour.currentTimeValue = currentTime.getHours() + (pointers.minute.currentTimeValue / 60);

	drawFrame();
  drawImages();
	drawNumbers();
	drawPointer("hour");
	drawPointer("minute");
	drawPointer("second");

	requestAnimationFrame(tick);
}

tick();
