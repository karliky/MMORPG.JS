window.onload = function(){
	var map = new MMORPG(32,32);
	map.init();
	window.onresize = function() {
		map.setBounds(window.innerWidth, window.innerHeight);
	}
};