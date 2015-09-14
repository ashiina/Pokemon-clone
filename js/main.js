
var KEY_START = -2;
var KEY_NONE = -1;
var KEY_A = 65;
var KEY_D = 68;
var KEY_W = 87;
var KEY_S = 83;
var KEY_M = 77;

var STAGE_HEIGHT = 480;
var STAGE_WIDTH = 640;
var FRAME_RATE = 30;

var PLAYER_WIDTH = 24;
var PLAYER_HEIGHT = 33;

var MONSTER_ENCOUNT_PROBABILITY = 0.015;

var SCREEN_STAGE = 1;
var SCREEN_MENU = 2;

var OBJECTS = {};

$("#stage").css("width", STAGE_WIDTH);
$("#stage").css("height", STAGE_HEIGHT);

// game logic
$(function(){
	console.log("start");

	// initializing objects
    var screen_id = SCREEN_STAGE;
    var prev_key = KEY_START;
	OBJECTS.stage = new Stage();
	OBJECTS.stage.initObjects();
	OBJECTS.player = new Player();
	OBJECTS.menu = new Menu();

	// gameQuery start
	$.playground().startGame();

    var stage_callback = function (key) {
        var newx = OBJECTS.player.node.x();
        var newy = OBJECTS.player.node.y();

        switch (key) {
            case KEY_M: if (key != prev_key) show_menu(); return;
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

        var c = $("#player").collision("#objects,.object_1", {x:newx, y:newy});
        if (c.length > 0) {
            console.log("Structure collision");
            return;
        }
        var c2 = $("#player").collision("#objects,.object_2");
        if (c2.length > 0 && key != KEY_NONE) {
			var r = Math.random();
			if (r < MONSTER_ENCOUNT_PROBABILITY) console.log("Monster!");
		}

        OBJECTS.player.node.x(newx);
        OBJECTS.player.node.y(newy);
    }

    var menu_callback = function (key) {
		var newy = OBJECTS.menu.currentCursorPos;
        switch (key) {
            case KEY_M: if (key != prev_key) show_stage(); return;
			case KEY_W: newy -= 1; break;
			case KEY_S: newy += 1; break;
        }
		if (newy > OBJECTS.player.owned_pokemons.length) newy = OBJECTS.player.owned_pokemons.length;
		if (newy < 1) newy = 1;
		OBJECTS.menu.drawCursor(newy);
    }

    var get_key = function () {
        var keys = jQuery.gameQuery.keyTracker;
        var key = KEY_NONE;
        if (keys[KEY_M]) key = KEY_M;
        else if (keys[KEY_A]) key = KEY_A;
        else if (keys[KEY_S]) key = KEY_S;
        else if (keys[KEY_D]) key = KEY_D;
        else if (keys[KEY_W]) key = KEY_W;
        return key;
    }

	var show_menu = function () {
		OBJECTS.menu.show();
		screen_id = SCREEN_MENU;
	}

	var show_stage = function () {
		OBJECTS.menu.hide();
		screen_id = SCREEN_STAGE;
	}

	// game logic is here
	$.playground().registerCallback(function(){
        var key = get_key();
        switch (screen_id) {
            case SCREEN_STAGE: stage_callback(key); break;
            case SCREEN_MENU: menu_callback(key); break;
        }
        prev_key = key;
	}, FRAME_RATE);
});


