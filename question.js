function QuestionMark(initialArgument, color) {
	this.color = color || QuestionMark.randomColor();
	this.el = document.createElement("span");
	this.el.className = "question-mark";
	this.initialArg = initialArgument || Math.random() * 2 * Math.PI;
	this.destinationArg = this.initialArg + Math.PI + (2 * Math.random() - 1) * QuestionMark.randomArgumentOffset();
	this.placeElement();
	this.animate();
};
QuestionMark.prototype.placeElement = function() {
	var rect = this.el.getBoundingClientRect();
	this.el.style.left = QuestionMark.generateCoordinate(this.initialArg, -rect.width/2, 'x') + 'px';
	this.el.style.top = QuestionMark.generateCoordinate(this.initialArg, -rect.height/2, 'y') + 'px';
	this.el.style.color = this.color;
	QuestionMark.container.appendChild(this.el);
};
QuestionMark.prototype.animate = function() {
	var rect = this.el.getBoundingClientRect();
	this.el.style.left = QuestionMark.generateCoordinate(this.destinationArg, -rect.width/2, 'x') + 'px';
	this.el.style.top = QuestionMark.generateCoordinate(this.destinationArg, -rect.height/2, 'y') + 'px';
};
QuestionMark.prototype.destroy = function() {
	this.el.parentNode.removeChild(this.el);
};
QuestionMark.generateCoordinate = function(argument, correction, direction) {
	switch(direction) {
		case 'x':
			return QuestionMark.radius * Math.cos(argument) + window.innerWidth/2 + correction;
		case 'y':
			return QuestionMark.radius * Math.sin(argument) + window.innerHeight/2 + correction;
	}
}
QuestionMark.randomColor = function(offset=40) {
	return "rgb(" + [... new Array(3)].map(function() { return offset+Math.floor((256-offset) * Math.random()); }).join(',') + ")";
};
QuestionMark.randomArgumentOffset = function() {
	return Math.PI/8;
}
QuestionMark.container = null;
QuestionMark.radius = null;
QuestionMark.lifetime = 3000; // Same as in CSS

window.onload = function() {
	window.onresize();
	QuestionMark.container = document.getElementById("question-marks");
	setInterval(function() {
		var q = new QuestionMark();
		setTimeout(function() {
			q.destroy();
		}, QuestionMark.lifetime);
	}, 100);
};

window.onresize = function() {
	QuestionMark.radius = Math.sqrt(Math.pow(window.innerHeight, 2) + Math.pow(window.innerWidth, 2));
	// QuestionMark.radius = 200;
}
