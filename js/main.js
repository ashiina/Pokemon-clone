
var KEY_START = -2;
var KEY_NONE = -1;

// キーコードはこれを参照
// http://faq.creasus.net/04/0131/CharCode.html
var KEY_A = 65;
var KEY_D = 68;
var KEY_W = 87;
var KEY_S = 83;
var KEY_M = 77;
var KEY_J = 74;
var KEY_K = 75;
var KEY_RET = 13;
var KEY_ESC = 27;

var STAGE_HEIGHT = 480;
var STAGE_WIDTH = 640;
var FRAME_RATE = 30;

var PLAYER_WIDTH = 24;
var PLAYER_HEIGHT = 33;

var MONSTER_ENCOUNT_PROBABILITY = 0.05;

var SCREEN_STAGE = 1;
var SCREEN_MENU = 2;
var SCREEN_BATTLE = 3;

var OBJECTS = {};

$("#base").css("width", STAGE_WIDTH);
$("#base").css("height", STAGE_HEIGHT);

// game logic
$(function(){
	console.log("start");

	// initializing objects
    var screen_id = SCREEN_STAGE;
    var prev_key = KEY_START;
	OBJECTS.stage = new Stage();
	OBJECTS.stage.initObjects();
	OBJECTS.player = new Player();
	OBJECTS.enemy = new Enemy();
	OBJECTS.menu = new Menu();
	OBJECTS.battle = new Battle();

	// gameQuery start
	$.playground().startGame();

    var stage_callback = function (key) {
        var newx = OBJECTS.player.node.x();
        var newy = OBJECTS.player.node.y();
        switch (key) {
            case KEY_M: if (key != prev_key) show_menu(); return;
            case KEY_RET: interact_stage({x:newx, y:newy}); return;
            case KEY_A: newx -= 5; break;
            case KEY_S: newy += 5; break;
            case KEY_D: newx += 5; break;
            case KEY_W: newy -= 5; break;
        }
        OBJECTS.player.make_animation(key, prev_key);

        if (newx < 0) newx = 0;
        if (newx > STAGE_WIDTH - PLAYER_WIDTH) newx = STAGE_WIDTH - PLAYER_WIDTH;
        if (newy > STAGE_HEIGHT - PLAYER_HEIGHT) newy = STAGE_HEIGHT - PLAYER_HEIGHT;
        if (newy < 0) newy = 0;

        var c = $("#player").collision("#stage,#stage_objects,.object_1", {x:newx, y:newy});
        if (c.length > 0) {
            return;
        }
        var c2 = $("#player").collision("#stage,#stage_objects,.object_2");
        if (c2.length > 0 && key != KEY_NONE) {
			var r = Math.random();
			if (r < MONSTER_ENCOUNT_PROBABILITY) {
				show_battle();
			}
		}

        OBJECTS.player.node.x(newx);
        OBJECTS.player.node.y(newy);
    }

	var interact_stage = function (opts) {
		var newx = opts.x;
		var newy = opts.y;
		switch (OBJECTS.player.direction) {
			case PlayerConst.DIR_UP: newy -= 5; break;
			case PlayerConst.DIR_LEFT: newx -= 5; break;
			case PlayerConst.DIR_RIGHT: newx += 5; break;
			case PlayerConst.DIR_DOWN: newy += 5; break;
		}
        var c = $("#player").collision("#stage,#stage_objects,.pkcenter", {x:newx, y:newy});
        if (c.length > 0) {
			console.log("heal pokemon");
			OBJECTS.player.healAllPokemons();
            return;
        }
	}

    var menu_callback = function (key) {
        switch (key) {
            case KEY_M: if (key != prev_key) show_stage(); return;
        }
		OBJECTS.menu.handleKey(key);
    }

    var battle_callback = function (key) {
        if (key == prev_key) return;
		var response = OBJECTS.battle.handleKey(key);
        if (response == CLOSE) show_stage();
    }

    var get_key = function () {
        var keys = jQuery.gameQuery.keyTracker;
        var key = KEY_NONE;
        if (keys[KEY_M]) key = KEY_M;
        else if (keys[KEY_A]) key = KEY_A;
        else if (keys[KEY_S]) key = KEY_S;
        else if (keys[KEY_D]) key = KEY_D;
        else if (keys[KEY_W]) key = KEY_W;
        else if (keys[KEY_J]) key = KEY_J;
        else if (keys[KEY_K]) key = KEY_K;
        else if (keys[KEY_RET]) key = KEY_RET;
        return key;
    }

	var show_menu = function () {
		OBJECTS.menu.show();
		screen_id = SCREEN_MENU;
	}

	var show_stage = function () {
		OBJECTS.menu.hide();
		OBJECTS.battle.hide();
		screen_id = SCREEN_STAGE;
	}

	var show_battle = function () {
		OBJECTS.menu.hide();
		OBJECTS.battle.show();
		screen_id = SCREEN_BATTLE;
	}

	// game logic is here
	$.playground().registerCallback(function(){
        var key = get_key();
        switch (screen_id) {
            case SCREEN_STAGE: stage_callback(key); break;
            case SCREEN_MENU: menu_callback(key); break;
            case SCREEN_BATTLE: battle_callback(key); break;
        }
        prev_key = key;
	}, FRAME_RATE);
});


