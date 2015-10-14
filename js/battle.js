
var Battle = function () {
	this.currentCursorPos;
    this.node;
	this.animations = {};
	this.objects = {};
	this._contructor = function () {
		this.animations.bg = new $.gQ.Animation({imageURL:"img/menu_bg.jpg"});
		$.playground().addGroup("battle", {width:STAGE_WIDTH, height:STAGE_HEIGHT});
	};
	this._contructor();

	this.drawBattle = function () {
		if (!this.node) return false;
	};

	this.show = function () {
		console.log("show battle!");
		$("#battle").addSprite("bg_battle", {animation:this.animations.bg,
				width:STAGE_WIDTH, height:STAGE_HEIGHT })
				.z(100);
		this.node = $("#bg_battle");
		this.drawMenu();

		this.currentCursorPos = 1;
		this.drawCursor(this.currentCursorPos);
	};

	this.hide = function () {
		if (!this.node) return false;
		this.node.remove();
	};

	this.drawCursor = function (y) {
		var posY = 110+(ROW_HEIGHT*y);
		$("#battle_cursor").remove();
		this.node.append('<div id="battle_cursor" style="position:absolute;top:'+posY+'px;left:10px;width:400px;color:#000;font-size:20px;">*</div>');
		this.currentCursorPos = y;
	};

	this.handleKey = function (key) {
		var newy = this.currentCursorPos;
		switch (key) {
			case KEY_W: newy -= 1; break;
			case KEY_S: newy += 1; break;
		}
		if (newy > OBJECTS.player.owned_pokemons.length) 
			newy = OBJECTS.player.owned_pokemons.length;
		if (newy < 1) newy = 1;
		this.drawCursor(newy);
	};
};




