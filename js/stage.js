
var StageConst = {
	OBJECT_TYPE_STRUCTURE: 1,
	OBJECT_TYPE_GRASS: 2,
	MAP_SPRITE_FILENAME: "img/map_sprite.png",
	TS: 15
};

var Stage = function () {
	this.animations = {};
	this.objects = {};
	this._contructor = function () {
		$("#base").playground({height:STAGE_HEIGHT, width:STAGE_WIDTH, keyTracker:true})
			.addGroup("stage", {width:STAGE_WIDTH, height:STAGE_HEIGHT})
				.addGroup("stage_bg", {width:STAGE_WIDTH, height:STAGE_HEIGHT}).end()
				.addGroup("stage_objects", {width:STAGE_WIDTH, height:STAGE_HEIGHT});

		this.animations.bg = new $.gQ.Animation({imageURL:"img/bg.png"});
		$("#stage_bg").addSprite("bg_ground", {animation:this.animations.bg,
				width:STAGE_WIDTH, height:STAGE_HEIGHT });
	};
	this._contructor();

	this.initObjects = function () {
		var _ts = StageConst.TS;

		var house = new $.gQ.Animation({imageURL:StageConst.MAP_SPRITE_FILENAME,
			width:_ts*4,height:_ts*5,offsetx:_ts*39-2,offsety:_ts*14
		});
		this.placeObject(house, _ts*4,_ts*5,100,100,StageConst.OBJECT_TYPE_STRUCTURE);
		this.placeObject(house, _ts*4,_ts*5,300,100,StageConst.OBJECT_TYPE_STRUCTURE);

		var pkcenter = new $.gQ.Animation({imageURL:StageConst.MAP_SPRITE_FILENAME,
			width:_ts*8,height:_ts*5,offsetx:_ts*49,offsety:_ts*14
		});
		var pkcenter_id = this.placeObject(pkcenter,_ts*8,_ts*5,100,300,StageConst.OBJECT_TYPE_STRUCTURE);
		$(pkcenter_id).addClass("pkcenter");

		var grass = new $.gQ.Animation({imageURL:StageConst.MAP_SPRITE_FILENAME,
			width:_ts,height:_ts,offsetx:0,offsety:0
		});
		for (var x=0;x<5;x++) {
			for (var y=0;y<5;y++) {
				this.placeObject(grass, _ts,_ts,450+(x*_ts),200+(y*_ts),StageConst.OBJECT_TYPE_GRASS);
			}
		}
	};

	this.placeObject = function (animation, w, h, x, y, type) {
		var objId = Math.floor(Math.random() * 10000);
		this.objects[objId] = animation;
		$("#stage_objects").addSprite("obj_"+objId, {animation:this.objects[objId],
			width:w, height:h, posx:x, posy:y
		});
		if (type === StageConst.OBJECT_TYPE_STRUCTURE || 
			type === StageConst.OBJECT_TYPE_GRASS ) {
			$("#obj_"+objId).addClass("object_"+type);
		}

		return "#obj_"+objId;
	};

};


