
var Player = function () {
    this.node;
	this.owned_pokemons = [];

    this._contructor = function () {
        console.log("init player");

		$.playground().addGroup("actors", {width:STAGE_WIDTH, height:STAGE_HEIGHT});
        $("#actors").addSprite("player", {
            width:PLAYER_WIDTH,
            height:PLAYER_HEIGHT,
            posx:STAGE_WIDTH/2,
            posy:STAGE_HEIGHT/2
        });
        this.node = $("#player");

		// TODO set default pokemon, just for test.
		this.addPokemon(new Pikachu());
		this.addPokemon(new Hitokage());

		// TODO debug display
		for (var i=0; i<this.owned_pokemons.length; i++) {
			console.log("owns: "+ this.owned_pokemons[i].name);
		}
    };

    this.make_animation = function (key, prev_key) {
        if (key == prev_key) return;
        var type = 0;
        var offset_x = 0;
        var offset_y = 0;
        var cond_key = KEY_NONE;
        if (key == KEY_NONE) { //キーが押されてなかった時は直前のキーに応じて画像を選択
            offset_x = 0 * PLAYER_WIDTH;
            cond_key = prev_key;
        } else { //キーに応じてアニメーション
            type = $.gQ.ANIMATION_PINGPONG | $.gQ.ANIMATION_HORIZONTAL;
            cond_key = key;
        }
        switch (cond_key) {
            case KEY_W: offset_y = 1 * PLAYER_HEIGHT; break;
            case KEY_A: offset_y = 2 * PLAYER_HEIGHT; break;
            case KEY_D: offset_y = 3 * PLAYER_HEIGHT; break;
            case KEY_S:
            default: offset_y = 0 * PLAYER_HEIGHT; break;
        }
        var animation = new $.gQ.Animation({
            imageURL:"img/players.png",
            numberOfFrame: 3,
            delta: 25,
            rate: 180,
            type: type,
            offsetx: offset_x,
            offsety: offset_y
        });
        this.node.setAnimation(animation, null);
    };

	this.addPokemon = function (pokemon) {
		if (!Pokemon.prototype.isPrototypeOf(pokemon)) {
			console.log("Invalid:only addPokemon() only takes Pokemon class");
			return;
		}
		this.owned_pokemons.push(pokemon);
	}

	this.removePokemon = function (index) {
		if (index < 0 || index > this.owned_pokemons.length-2) {
			console.log("Invalid:OoB");
			return;
		}
		this.owned_pokemons.splice(index, 1);
	}

    this._contructor();

};


