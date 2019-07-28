
    window.RAF = (function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();
    window.CRAF = function(id) {
        window.cancelAnimationFrame ? window.cancelAnimationFrame(id) :
            window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(id) :
            window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(id) :
            window.oCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame(id) :
            window.msCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame(id) :
            window.clearTimeout(id);
    };
function Scene(canvas) {	
        this.canvas = canvas;
        this.contex = canvas.getContext('2d');
        this.shapes = [];
        this.drawFrameId = null;
        this.start = bind(this.start, this);

    
    function bind(fn, that) {
        return function() {
            fn.call(that);
        }
    }
   }

    Scene.prototype.drawFrame = function() {
        this.canvas.width += 1;
        this.canvas.width -= 1;
        var l = this.shapes.length;
        for (var i = 0; i < l; i++) {
            this.contex.save();
            this.shapes[i].paint(this.contex);
            this.contex.restore();
        }

    };

    Scene.prototype.start = function() {

        this.drawFrame();
        this.drawFrameId = RAF(this.start);
    };

    Scene.prototype.stop = function() {
        CRAF(this.drawFrameId);
        this.drawFrameId = null;

    };
    Scene.prototype.clear = function() {
        this.shapes = [];

    };

    Scene.prototype.addShape = function(shape) {
        this.shapes.push(shape);

    };
    Scene.prototype.removeShape = function(shape) {
        var i = this.shapes.indexOf(shape);
        this.shapes.splice(i, 1);
    };