var MMORPG = function (x, y, chunk_size, options) {

    this.start_text = "*============================================*\n";
    this.start_text += "* MMORPG By @k4rliky (karliky@gmail.com)     *\n";
    this.start_text += "* " + (new Date()) + "   *\n";
    this.start_text += "*============================================*\n";

    this.x = x;
    this.y = y;
    this.canvas = null;
    this.ctx = null;
    this.options = {
        wireframe: true
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

        var pos = this.point2D;
        console.log("* Creating " + (this.x * this.y) + " map");
        for (i = 0; i <= this.x; i++) {
            
        }
    };

    this.init = function () {
        this._createCanvas();
        if (this.options.wireframe)
            this._drawWireframe();
    };
}