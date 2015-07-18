

var KEY_NONE = -1;
var KEY_A = 65;
var KEY_D = 68;
var KEY_W = 87;
var KEY_S = 83;

var STAGE_HEIGHT = 480;
var STAGE_WIDTH = 640;
var FRAME_RATE = 30;

var PLAYER_WIDTH = 24;
var PLAYER_HEIGHT = 33;

var MONSTER_ENCOUNT_PROBABILITY = 0.015;

$("#stage").css("width", STAGE_WIDTH);
$("#stage").css("height", STAGE_HEIGHT);

// game logic
$(function(){
	console.log("start");

	var stage = new Stage();
	stage.initObjects();
	var player = new Player();
	$.playground().startGame();

	$.playground().registerCallback(function(){
        var keys = jQuery.gameQuery.keyTracker;
        var newx = player.node.x();
        var newy = player.node.y();
        var key = KEY_NONE;
        if (keys[KEY_A]) { key = KEY_A; newx -= 5; }
        else if (keys[KEY_S]) { key = KEY_S; newy += 5; }
        else if (keys[KEY_D]) { key = KEY_D; newx += 5; }
        else if (keys[KEY_W]) { key = KEY_W; newy -= 5; }

        player.make_animation(key);
        player.prev_key = key;

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

	}, FRAME_RATE);
});


