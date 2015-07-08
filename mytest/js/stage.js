
var Stage = function () {
	this.animations = {};
	this.objects = {};
	this._contructor = function () {
		console.log("init background");
		$("#stage").playground({height:STAGE_HEIGHT, width:STAGE_WIDTH, keyTracker:true})
			.addGroup("bg", {width:STAGE_WIDTH, height:STAGE_HEIGHT}).end()
			.addGroup("objects", {width:STAGE_WIDTH, height:STAGE_HEIGHT}).end()
			.addGroup("actors", {width:STAGE_WIDTH, height:STAGE_HEIGHT});

		this.animations.bg = new $.gQ.Animation({imageURL:"img/bg.gif"});
		$("#bg").addSprite("bg_map", {animation:this.animations.bg,
				width:STAGE_WIDTH, height:STAGE_HEIGHT });

		var _objId = 100;
		this.objects[_objId] = new $.gQ.Animation({});
		$("#objects").addSprite("obj_"+_objId, {animation:this.objects[_objId],
			width:50, height:50, posx:100, posy:100})
		$("#obj_"+_objId).addClass("object_group");
	};
	this._contructor();

};


