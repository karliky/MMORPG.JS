MMORPG.prototype.GUI = {
    parent : null,
    open_box : function(){
        if(typeof parent == null) throw new Error("Parent obj is null, use this.GUI.setInstance(this);");
    },
    createUI: function(){
        if(typeof parent == null) throw new Error("Parent obj is null, use this.GUI.setInstance(this);");

        this.getTemplate("assets/templates/main.html",function(html){
            var el = document.createElement('div');
            el.innerHTML = html;
            document.body.insertBefore(el, document.body.firstChild);
        });
    },
    getTemplate : function(path,callback){

        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function(){
            if (httpRequest.readyState === 4) {
              if (httpRequest.status === 200) {
                this.parent.log("Template loaded: "+path);
                callback(httpRequest.responseText);
              } else {
                this.parent.log("There was a problem with the request.");
              }
            }
        }.bind(this);
        httpRequest.open('GET', path + "?rndm="+new Date());
        httpRequest.send();

    },
    setInstance : function(obj){
        this.parent = obj;
    }
};