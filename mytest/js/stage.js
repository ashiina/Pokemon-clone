
var OBJECT_TYPE_STRUCTURE = 1;
var OBJECT_TYPE_GRASS = 2;

var MAP_SPRITE_FILENAME = "img/map_sprite.png";
var TS = 15;

var Stage = function () {
	this.animations = {};
	this.objects = {};
	this._contructor = function () {
		$("#stage").playground({height:STAGE_HEIGHT, width:STAGE_WIDTH, keyTracker:true})
			.addGroup("bg", {width:STAGE_WIDTH, height:STAGE_HEIGHT}).end()
			.addGroup("objects", {width:STAGE_WIDTH, height:STAGE_HEIGHT}).end()
			.addGroup("actors", {width:STAGE_WIDTH, height:STAGE_HEIGHT});

		this.animations.bg = new $.gQ.Animation({imageURL:"img/bg.png"});
		$("#bg").addSprite("bg_ground", {animation:this.animations.bg,
				width:STAGE_WIDTH, height:STAGE_HEIGHT });
	};
	this._contructor();

	this.initObjects = function () {
		var house = new $.gQ.Animation({imageURL:MAP_SPRITE_FILENAME,
			width:TS*4,height:TS*5,offsetx:TS*39-2,offsety:TS*14
		});
		this.placeObject(house, TS*4,TS*5,100,100,OBJECT_TYPE_STRUCTURE);
		this.placeObject(house, TS*4,TS*5,300,100,OBJECT_TYPE_STRUCTURE);

		var pkcenter = new $.gQ.Animation({imageURL:MAP_SPRITE_FILENAME,
			width:TS*8,height:TS*5,offsetx:TS*49,offsety:TS*14
		});
		this.placeObject(pkcenter,TS*8,TS*5,100,300,OBJECT_TYPE_STRUCTURE);

	};

	this.placeObject = function (animation, w, h, x, y, type) {
		var objId = Math.floor(Math.random() * 10000);
		this.objects[objId] = animation;
		$("#objects").addSprite("obj_"+objId, {animation:this.objects[objId],
			width:w, height:h, posx:x, posy:y
		});
		if (type === OBJECT_TYPE_STRUCTURE || 
			type === OBJECT_TYPE_GRASS ) {
			$("#obj_"+objId).addClass("object_"+type);
		}
	};
};


