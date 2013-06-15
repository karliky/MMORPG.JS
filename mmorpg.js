var MMORPG = function (x, y, options) {

    this.start_text = "*============================================*\n";
    this.start_text += "* MMORPG By @k4rliky (karliky@gmail.com)     *\n";
    this.start_text += "* " + (new Date()) + "   *\n";
    this.start_text += "*============================================*";

    this.x = x;
    this.y = y;
    this.assets = {
        list:[]
    };
    this.canvas = null;
    this.ctx = null;
    this._isMouseMoving = false;
    this.window_width = window.innerWidth;
    this.window_height = window.innerHeight;
    this.options = {
        wireframe: true,
        wireframe_tile: [],
        tiles: {
            x: this.window_width / this.x,
            y: this.window_height / this.y
        }
    }

    this.assets.addImage = function(src){
        this.assets.list.push(src);
    }.bind(this);
    
    this.assets.addImage("assets/TileA2.png");
    this.assets.addImage("assets/grass.png");

    this._createCanvas = function () {
        console.log(this.start_text);
        this.canvas = document.createElement("canvas");
        this.canvas.width = this.window_width;
        this.canvas.height = this.window_height;
        this.canvas.id = "canvas";
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
    };

    this.point2D = {
        x: 0,
        y: 0
    }
    
    this._bindEvents = function(){
        this.canvas.addEventListener("mousedown",function(e){
            this._isMouseMoving = true;
        }.bind(this),false);
        this.canvas.addEventListener("mouseup",function(e){
            this._isMouseMoving = false;
        }.bind(this),false);
        this.canvas.addEventListener("mousemove",function(e){
            if(!this._isMouseMoving) return;
            this._processTouch(e);
        }.bind(this),false);
        this.canvas.addEventListener("click",function(e){
            this._processTouch(e);
        }.bind(this),false);
        document.body.addEventListener("contextmenu",function(e){
            e.preventDefault();
            this._processTouch(e);
            return false;
        }.bind(this),false);
    };

    this._processTouch = function(e){
    
        var tile = {};
        tile.x = e.clientX / (this.window_width / this.options.tiles.x) | 0,
        tile.y = e.clientY / (this.window_height / this.options.tiles.y) | 0,
        tile.n = this.options.tiles.x * (tile.y) + tile.x,
        tile.n_x = (this.window_width / this.options.tiles.x) * tile.x,
        tile.n_y = (this.window_height / this.options.tiles.y) * tile.y

        switch (e.which) {
            case 1:
                this.options.wireframe_tile[tile.n] = tile;
                break;
            case 3:
                this.options.wireframe_tile[tile.n] = undefined;
            break;
        }
        
    };

    this._drawWireframe = function () {

        this.ctx.beginPath();

        var x = 0;
        var y = 0;

        for (i = 0; i < this.options.tiles.y; i++) {
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(this.window_width, y);
            y += this.y;
        };

        x = 0;
        y = 0;

        for (i = 0; i < this.options.tiles.x; i++) {
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x, this.window_height);
            x += this.x;
        };

        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = '#000000';
        this.ctx.stroke();
    };

    this._drawTiles = function(){
        this.options.wireframe_tile.forEach(function(data,i){
            if(typeof data != "undefined")
                this.ctx.drawImage(this.assets.list["grass.png"],data.n_x,data.n_y);
        }.bind(this));
    }

    this.init = function () {
        this._createCanvas();
        this._bindEvents();

        var loadedimages = 0;
        var imagesToLoad = this.assets.list;
        var totalImages = imagesToLoad.length;
        this.assets.list = [];

        for (var i = 0; i < imagesToLoad.length ; i++) {
            var src = imagesToLoad[i];
            var fileName = (src.split("/"))[src.split("/").length - 1];

            this.assets.list[fileName] = document.createElement("image");
            
            this.assets.list[fileName].onload = function(){
                loadedimages++;
                if (loadedimages==totalImages){
                    this.log(totalImages+" images loaded");
                    this.log("STARTING THE GAME!");

                    this.GUI.setInstance(this);
                    this.GUI.createUI();
                    this._createLoop();
                }
            }.bind(this);
            
            this.assets.list[fileName].onerror = function(){
                this.log("ERROR: Fail to fetch image");
            }.bind(this);
            this.assets.list[fileName].src = src;  
        };
    };

    this._createLoop = function(){
        var that = this;
        (function animloop(){
          requestAnimFrame(animloop);
          that.loop();
        })();
    };

    this.clearCanvas = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    this.log = function(log){
        console.log("* [LOG]",log);
    };
    this.setBounds = function(width,height){
        this.window_width = width;
        this.window_height = height;
        this.options.tiles.x = width / this.x;
        this.options.tiles.y = height / this.y;
        this.canvas.width = this.window_width;
        this.canvas.height = this.window_height;
    }
    this.loop = function () {
        this.clearCanvas();

        if (this.options.wireframe)
            this._drawWireframe();

        this._drawTiles();
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