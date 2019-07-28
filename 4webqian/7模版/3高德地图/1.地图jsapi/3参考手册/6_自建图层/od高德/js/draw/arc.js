 function Arc(lineCanvas) {
        this.ctx = lineCanvas.getContext('2d');
}
 Arc.prototype.getCircle = function(start, dest) {
        var x, y;
        var x1 = start[0],
            y1 = start[1],
            x2 = dest[0],
            y2 = dest[1];

        var L = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)); //定值
        var V_AB = [x2 - x1, y2 - y1]; //定值

        var m = (x1 + x2) / 2;
        var n = (y1 + y2) / 2; //定值
        var factor = 0.6;

        x = (y1 - y2) * factor + m;
        y = (x2 - x1) * factor + n;

        var radius = Math.sqrt(Math.pow(L / 2, 2) + Math.pow(L * factor, 2));
        var startAngle = Math.atan2(y1 - y, x1 - x);
        var endAngle = Math.atan2(y2 - y, x2 - x);

        var arc = {
            x: x,
            y: y,
            radius: radius,
            startAngle: startAngle,
            endAngle: endAngle,
            l: L
        }
        return arc;
    }

 Arc.prototype.drawArc = function(start, dest,opts) {
        var arcData = this.getCircle(start, dest);

        this.ctx.beginPath();
        this.ctx.strokeStyle = opts;
        this.ctx.lineWidth = 2;
        this.ctx.arc(arcData.x, arcData.y, arcData.radius, arcData.startAngle, arcData.endAngle);
        this.ctx.stroke();
    }

 Arc.prototype.clearRect = function() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.width);
    }