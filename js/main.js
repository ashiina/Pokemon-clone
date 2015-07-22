
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

$("#stage").css("width", STAGE_WIDTH);
$("#stage").css("height", STAGE_HEIGHT);

// game logic
$(function(){
	console.log("start");

	// initializing objects
    var screen_id = SCREEN_STAGE;
    var prev_key = KEY_NONE;
	var stage = new Stage();
	stage.initObjects();
	var player = new Player();

	// gameQuery start
	$.playground().startGame();

    var stage_callback = function (key) {
        console.log('stage');
        var newx = player.node.x();
        var newy = player.node.y();

        switch (key) {
            case KEY_M: if (key != prev_key) screen_id = SCREEN_MENU; return;
            case KEY_A: newx -= 5; break;
            case KEY_S: newy += 5; break;
            case KEY_D: newx += 5; break;
            case KEY_W: newy -= 5; break;
        }
        player.make_animation(key, prev_key);

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
            console.log("In grass");
			var r = Math.random();
			if (r < MONSTER_ENCOUNT_PROBABILITY) console.log("Monster!");
		}

        player.node.x(newx);
        player.node.y(newy);
    }

    var menu_callback = function (key) {
        console.log('menu');
        switch (key) {
            case KEY_M: if (key != prev_key) screen_id = SCREEN_STAGE; return;
        }
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

	// game logic is here
	$.playground().registerCallback(function(){
        var key = get_key();
        switch (screen_id) {
            case SCREEN_STAGE: stage_callback(key); break;
            case SCREEN_MENU: menu_callback(key); break;
        }
        if (key != KEY_NONE) prev_key = key;
	}, FRAME_RATE);
});


