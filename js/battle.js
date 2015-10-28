
var OPTION_Y = 300;
var ROW_HEIGHT = 68;
var NONE = 0;
var CONTINUE = 1;
var CLOSE = 2;

var Battle = function () {
	this.myPokemon;
	this.enemyPokemon;
	this.currentCursorPos;
    this.node;
	this.animations = {};
	this.objects = {};
    this.options = [
        'たたかう',
        'かいふく',
        'にげる',
    ];
	this._contructor = function () {
		this.animations.bg = new $.gQ.Animation({imageURL:"img/menu_bg.jpg"});
		$.playground().addGroup("battle", {width:STAGE_WIDTH, height:STAGE_HEIGHT});
	};
	this._contructor();

	this.drawBattle = function () {
		if (!this.node) return false;
	};

    this.drawBattle = function () {
        if (!this.node) return false;

        // 先頭のポケモンを表示
        this.myPokemon = OBJECTS.player.owned_pokemons[0];
        console.log(this.myPokemon);
        this.node.append(
            '<div style="position:absolute;top:280px;left:50px;width:400px;color:#000;line-height:40px;">'
            + '<img src="' + this.myPokemon.imageUrl + '" style="width:150px" >'
            + '</div>'
        );
        this.node.append(
            '<div style="position:absolute;top:430px;left:40px;width:400px;color:#000;line-height:40px;">'
            + this.myPokemon.name + " HP: <span id='my_current_hp'>" + this.myPokemon.hp + '</span> / ' + this.myPokemon.max_hp
            + '</div>'
        );

		// 敵ポケモンを表示

        // 行動の選択肢を表示
        for (var i = 0; i < this.options.length; i++) {
            this.node.append(
                '<div style="position:absolute;top:' + (OPTION_Y + ROW_HEIGHT * i) + 'px;left:400px;width:400px;color:#000;line-height:40px;font-size:30px">'
                + this.options[i] + '</div>'
            );
        }
    };

	this.show = function () {
		console.log("show battle!");
		$("#battle").addSprite("bg_battle", {animation:this.animations.bg,
				width:STAGE_WIDTH, height:STAGE_HEIGHT })
				.z(100);
		this.node = $("#bg_battle");
		this.chooseEnemyPokemon();
		this.drawBattle();

		this.currentCursorPos = 0;
		this.drawCursor(this.currentCursorPos);
	};

	this.hide = function () {
		if (!this.node) return false;
		this.node.remove();
	};

	this.drawCursor = function (y) {
		var posY = OPTION_Y + (ROW_HEIGHT * y);
		$("#battle_cursor").remove();
		this.node.append('<div id="battle_cursor" style="position:absolute;top:' + posY + 'px;left:380px;width:400px;color:#000;font-size:30px;">*</div>');
		this.currentCursorPos = y;
	};

    this.select = function (key) {
        switch (this.currentCursorPos) {
        case 0:
            console.log('ATTACK!!');
            return CONTINUE;
        case 1:
            console.log('HEALING!');
			this.myPokemon.setHp(this.myPokemon.max_hp);
			$("#my_current_hp").html(this.myPokemon.hp);
            return CONTINUE;
        case 2:
            console.log('ESCAPED...');
            return CLOSE;
        }
    }

	this.handleKey = function (key) {
		var newy = this.currentCursorPos;
        var response = NONE;
		switch (key) {
			case KEY_W: newy -= 1; break;
			case KEY_K: newy -= 1; break;
			case KEY_J: newy += 1; break;
			case KEY_S: newy += 1; break;
			case KEY_RET: response = this.select(); break;
		}
		if (newy >= this.options.length) newy = 0;
        else if (newy < 0) newy = this.options.length - 1;
		this.drawCursor(newy);
        return response;
	};

	this.chooseEnemyPokemon = function () {
		// TODO randomize
		this.enemyPokemon = new Hitokage();
	};
};




