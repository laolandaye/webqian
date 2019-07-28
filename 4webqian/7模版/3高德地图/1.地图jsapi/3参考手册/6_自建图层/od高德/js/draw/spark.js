function SparkArc(pstart, pend, opts) {
	this._opts = {
		color: "rgb(255, 255, 255)",
		lineWidth: 5,
		loop: false,
		speed: 1
	};
	this.circleLineData = null;
	this.opts = null;
	this.start = null;
	this.end = null;
	this.center = null;
	this.radius = null;
	this.angle = null;
	this.arcFrag = Math.PI / 800;
	this.arcs = 40;
	this.speed = 0.05; //l/ms
	this.slowSpeed = 0.0177;
	this.opts = null;
	this.tempAngle = 0;
	this.tempEnd = 0;
	if(pstart && pend && opts) {
		this.setLocation(pstart, pend, opts);
	}
}

SparkArc.prototype.drawArc = function(ctx, x, y, r, sa, ea, lw, anti, color) {
	ctx.save();
	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.lineWidth = lw || 2;
	ctx.arc(x, y, r, sa, ea, anti);
	ctx.stroke();
	ctx.restore();
}

SparkArc.prototype.play = function() {
	createjs.Tween.get(this, {
		loop: true,
		override: true //  当再次调用play方法时，将原来的
	}).to({
		angle: (this.start > this.end && this.end < 0) ? (2 * Math.PI + this.end) : this.end
	}, this.circleLineData.l >= 50 ? (this.circleLineData.l / this.speed) : (this.circleLineData.l / this.slowSpeed), createjs.Ease.linear);
}

SparkArc.prototype.paint = function(ctx) {
	var end = this.end;
	var spark_width = this.opts.lineWidth;
	ctx.lineCap = "round";
	var color;
	var temp = this.opts.color + "";
	var spark_color_rgba = temp.replace("rgb", "rgba").replace(")", "") + ",";

	//逆时针
	if(this.angle > this.start + this.arcFrag * this.arcs) {
		var times = this.arcs;
	} else {
		var times = Math.round((this.angle - this.start) / this.arcFrag);
	}

	for(var i = times; i > 0; i--) {
		if(i < 4) {
			color = 'rgba(255,255,255,' + 1 / i + ')';
		} else {
			color = spark_color_rgba + 3 / i + ')';
		}
		var start = this.angle - i * this.arcFrag;
		var end = start + this.arcFrag;
		var start1 = this.end - (end - this.start);
		var end1 = this.end - (start - this.start)
		//白色
		this.drawArc(ctx, this.center.x, this.center.y, this.radius, start, end, spark_width, false, color);
		//逆时针白点
		this.drawArc(ctx, this.center.x, this.center.y, this.radius, start1, end1, spark_width, false, color);
		color = spark_color_rgba + 0.35 / (i + 10) + ')';
		//阴影
		this.drawArc(ctx, this.center.x, this.center.y, this.radius, start, end, this.circleLineData.l >= 50 ? 26 : 10, false, color);
		//逆时针阴影
		this.drawArc(ctx, this.center.x, this.center.y, this.radius, start1, end1, this.circleLineData.l >= 50 ? 26 : 10, false, color);
	}
};

SparkArc.prototype.setLocation = function(pstart, pend, opts) {
	this.circleLineData = Arc.prototype.getCircle(pstart, pend);
	var start = this.circleLineData.startAngle,
		end = this.circleLineData.endAngle,

		centerX = this.circleLineData.x,
		centerY = this.circleLineData.y,
		radius = this.circleLineData.radius,
		center = {
			x: centerX,
			y: centerY
		}

	this.opts = mixin(this._opts, opts);

	this.start = start;
	this.end = end;
	this.tempEnd = end;
	this.center = center;
	this.radius = radius;
	this.angle = start;

}