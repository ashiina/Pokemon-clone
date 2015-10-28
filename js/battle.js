
var OPTION_Y = 300;
var ROW_HEIGHT = 68;
var NONE = 0;
var CONTINUE = 1;
var CLOSE = 2;

var Battle = function () {
	this.enemy_pokemon_list = [];
    this.my_pokemon;
    this.enemy_pokemon;
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
		this.animations.bg = new $.gQ.Animation({imageURL:"img/battle_bg.png"});
		$.playground().addGroup("battle", {width:STAGE_WIDTH, height:STAGE_HEIGHT});
        this.my_pokemon = OBJECTS.player.owned_pokemons[0];

		this.initializeEnemyList();
	};

	this.initializeEnemyList = function () {
		this.enemy_pokemon_list.push('Hitokage');
		this.enemy_pokemon_list.push('Kabigon');
		this.enemy_pokemon_list.push('Gyarados');
	}

    this.drawBattle = function () {
        if (!this.node) return false;

        // 先頭のポケモンを表示
        $("#pokemon").remove();
        this.node.append(
            '<div id="pokemon" style="position:absolute;top:280px;left:50px;width:400px;color:#000;line-height:40px;">'
            + '<img src="' + this.my_pokemon.imageUrl + '" style="width:150px" >'
            + '</div>'
        );
        $("#pokemon_status").remove();
        this.node.append(
            '<div id="pokemon_status" style="position:absolute;top:430px;left:40px;width:400px;color:#000;line-height:40px;">'
            + this.my_pokemon.name + " HP: " + this.my_pokemon.hp + ' / ' + this.my_pokemon.max_hp
            + '</div>'
        );

        // 敵のポケモンを表示
        $("#enemy").remove();
        this.node.append(
            '<div id="enemy" style="position:absolute;top:30px;left:450px;width:400px;color:#000;line-height:40px;">'
            + '<img src="' + this.enemy_pokemon.imageUrl + '" style="width:150px" >'
            + '</div>'
        );
        $("#enemy_status").remove();
        this.node.append(
            '<div id="enemy_status" style="position:absolute;top:200px;left:450px;width:400px;color:#000;line-height:40px;">'
            + this.enemy_pokemon.name + " HP: " + this.enemy_pokemon.hp + ' / ' + this.enemy_pokemon.max_hp
            + '</div>'
        );

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
        this.enemy_pokemon = this.chooseEnemyPokemon();
		$("#battle").addSprite("bg_battle", {animation:this.animations.bg,
				width:STAGE_WIDTH, height:STAGE_HEIGHT })
				.z(100);
		this.node = $("#bg_battle");
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
            this.enemy_pokemon.hp -= 20;
            break;
        case 1:
            console.log('HEALING');
            this.my_pokemon = OBJECTS.player.owned_pokemons[0];
            this.my_pokemon.hp += 50;
            if (this.my_pokemon.hp > this.my_pokemon.max_hp) {
                this.my_pokemon.hp = this.my_pokemon.max_hp;
            }
            break;
        case 2:
            console.log('ESCAPED...');
            return CLOSE;
        }
        this.enemy_action();
        this.drawBattle();
        if (this.enemy_pokemon.hp <= 0) {
            console.log('DEFEATED!!');
            return CLOSE;
        }
        if (this.my_pokemon.hp < 0) {
            console.log('LOSE...');
            return CLOSE;
        }
        return CONTINUE;
    };

    this.enemy_action = function () {
        this.my_pokemon.hp -= 30;
    };

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
		// get random from name list
		var enemy_pokemon_classname = this.enemy_pokemon_list[Math.floor(Math.random()*this.enemy_pokemon_list.length)];
		// instantiate with string
		return new window[enemy_pokemon_classname];
    };

	this.dealDamage = function (source_pokemon, target_pokemon) {
		
	}

	this._contructor();

};



