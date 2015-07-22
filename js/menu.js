
var MAP_SPRITE_FILENAME = "img/map_sprite.png";
var TS = 15;

var Menu = function () {
	this.animations = {};
	this.objects = {};
	this._contructor = function () {
		this.animations.bg = new $.gQ.Animation({imageURL:"img/menu_bg.jpg"});
		$.playground().addGroup("menu", {width:STAGE_WIDTH, height:STAGE_HEIGHT});
	};
	this._contructor();

	this.initObjects = function () {
	};

	this.show = function () {
		console.log("show menu!");
		$("#menu").addSprite("bg_menu", {animation:this.animations.bg,
				width:STAGE_WIDTH, height:STAGE_HEIGHT })
				.z(100);
	};

	this.hide = function () {
		$("#bg_menu").remove();
	};
};


