var MMORPG = function (x, y, options) {

    this.start_text = "*============================================*\n";
    this.start_text += "* MMORPG By @k4rliky (karliky@gmail.com)     *\n";
    this.start_text += "* " + (new Date()) + "   *\n";
    this.start_text += "*============================================*\n";

    this.x = x;
    this.y = y;
    this.canvas = null;
    this.ctx = null;
    this.options = {
        wireframe: true,
        tiles: {
            x: Math.ceil(window.innerWidth / this.x),
            y: Math.ceil(window.innerHeight / this.y)
        }
    }

    this._createCanvas = function () {
        console.log(this.start_text);
        this.canvas = document.createElement("canvas");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.id = "canvas";
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
    };

    this.point2D = {
        x: 0,
        y: 0
    }

    this._drawWireframe = function () {

        this.ctx.beginPath();

        var x = 0;
        var y = 0;

        for (i = 0; i < this.options.tiles.y; i++) {
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(window.innerWidth, y);
            y += 32;
        };

        x = 0;
        y = 0;

        for (i = 0; i < this.options.tiles.x; i++) {
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x, window.innerHeight);
            x += 32;
        };

        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = '#000000';
        this.ctx.stroke();
    };

    this.init = function () {
        this._createCanvas();

        var that = this;
        (function animloop(){
          requestAnimFrame(animloop);
          that.start();
        })();
    };

    this.clearCanvas = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    this.start = function () {
        this.clearCanvas();

        if (this.options.wireframe)
            this._drawWireframe();

    }
}


window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();