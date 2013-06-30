MMORPG.prototype.GUI = function(parentObj){
    this.parent = parentObj;

    this.open_box = function(){
        if(GUI.parent == null) throw new Error("Parent obj is null, use this.GUI.setInstance(this);");
    }; 

    this.createUI = function(){
        if(GUI.parent == null) throw new Error("Parent obj is null, use this.GUI.setInstance(this);");

        GUI.getTemplate("assets/templates/main.html",function(html){
            GUI.insertTemplate(html);
        }.bind(this));

        GUI.getTemplate("assets/templates/tile_selector.html",function(html){
            GUI.insertTemplate(html);
            
            var create_tile_set = document.getElementById("create_tile_set");
            var create_tile_from_url = document.getElementById("create_tile_set");
            var tile_mapper = document.getElementById("tile_mapper");
            create_tile_set.addEventListener("click",function(){
                if(tile_mapper.style.display != "block"){
                    tile_mapper.style.display = "block";
                    tile_mapper.style.left = ((window.innerWidth / 2) - (tile_mapper.clientWidth / 2))+"px";
                }
            }.bind(this), false);
            create_tile_from_url.addEventListener("click",function(){
                var url = prompt("Image URL","assets/TileA2.png");
                GUI.makeGrid(url);
            }.bind(this), false);
            $( "#tile_selector" ).draggable({ handle: ".title" });
            $( "#tile_mapper" ).draggable({ handle: ".title:first-child" });

        }.bind(this));
    }; 
    this.makeGrid = function(path){
        var img = document.createElement("image");
        img.onload = function(){
            var grid_mapper = document.getElementById("grid_mapper");
            grid_mapper.appendChild(img);
        };
        img.onerror = function(){
            alert("There was an error trying to load the image.");
        };
        img.src = path;
    }; 
    this.insertTemplate = function(html){
        var el = document.createElement('div');
        el.innerHTML = html;
        document.body.insertBefore(el, document.body.firstChild);
    }; 
    this.getTemplate = function(path,callback){
        if(GUI.parent == null) throw new Error("Parent obj is null, use this.GUI.setInstance(this);");

        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function(){
            if (httpRequest.readyState === 4) {
              if (httpRequest.status === 200) {
                GUI.parent.log("Template loaded: "+path);
                callback(httpRequest.responseText);
              } else {
                GUI.parent.log("There was a problem with the request.");
              }
            }
        }.bind(this);
        httpRequest.open('GET', path + "?rndm="+new Date());
        httpRequest.send();

    }; 

    var GUI = this;

    return {
        createUI : this.createUI
    }

};