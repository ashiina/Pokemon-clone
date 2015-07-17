

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

        player.move(jQuery.gameQuery.keyTracker);

	}, FRAME_RATE);
});


