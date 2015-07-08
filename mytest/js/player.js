
var Player = function () {
	this.animations = {};
	this.node;
	this._contructor = function () {
		console.log("init player");
		this.animations.player_idle = new $.gQ.Animation({imageURL:"img/player.png"});
		$("#actors").addSprite("player", {animation:this.animations.player_idle,
			width:56, height:62, posx:STAGE_WIDTH/2, posy:STAGE_HEIGHT/2});
		this.node = $("#player");
	};
	this._contructor();
};


