function QuestionMark(abscissa, ordinate, color) {
	this.x = abscissa || Math.random() < .5 ? Math.random() * (-100) : Math.random() * 100 + window.innerWidth;
	this.y = ordinate || Math.random() < .5 ? Math.random() * (-100) : Math.random() * 100 + window.innerHeight;
	this.color = color || QuestionMark.randomColor();
	this.el = document.createElement("span");
	this.el.className = "question-mark";
	this.prepareElement();
};
QuestionMark.prototype.prepareElement = function() {
	this.el.style.left = this.x + "px";
	this.el.style.top = this.y + "px";
	this.el.style.color = this.color;
	QuestionMark.container.appendChild(this.el);
};
QuestionMark.randomColor = function(bitDepth=8) {
	return "rgb(" + [... new Array(3)].map(function() { return Math.floor(Math.pow(2, bitDepth) * Math.random()); }).join(',') + ")";
};
QuestionMark.container = null;

window.onload = function() {
	QuestionMark.container = document.getElementById("question-marks");
	var q = new QuestionMark();
};
