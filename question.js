function QuestionMark(argument, color) {
	this.arg = argument || Math.random() * 2 * Math.PI;
	this.x = QuestionMark.radius * Math.cos(this.arg) + window.innerWidth/2;
	this.y = QuestionMark.radius * Math.sin(this.arg) + window.innerHeight/2;
	this.color = color || QuestionMark.randomColor();
	this.el = document.createElement("span");
	this.el.className = "question-mark";
	this.prepareElement();
	this.animate();
	setTimeout(function() {
		this.destroy();
	}, QuestionMark.lifetime);
};
QuestionMark.prototype.prepareElement = function() {
	this.el.style.left = this.x + "px";
	this.el.style.top = this.y + "px";
	this.el.style.color = this.color;
	QuestionMark.container.appendChild(this.el);
};
QuestionMark.prototype.animate = function() {
	this.el.style.left = (window.innerWidth  - this.x) + "px";
	this.el.style.top  = (window.innerHeight - this.y) + "px";
}
QuestionMark.randomColor = function(offset=50) {
	return "rgb(" + [... new Array(3)].map(function() { return offset+Math.floor((256-offset) * Math.random()); }).join(',') + ")";
};
QuestionMark.container = null;
QuestionMark.radius = null;
QuestionMark.lifetime = 10000;

window.onload = function() {
	QuestionMark.radius = Math.sqrt(Math.pow(window.innerHeight, 2) + Math.pow(window.innerWidth, 2)) + 250;
	QuestionMark.container = document.getElementById("question-marks");
	setInterval(function() {
		new QuestionMark();
	}, 10);
};
