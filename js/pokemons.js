
var Pokemon = function () {
	// metadata
	this.name = "";
	this.imageUrl = "";

	// pokemon stats
	this.attack = 0;
	this.defense = 0;
	this.hp = 1;
	this.speed = 0;
};

var Pikachu = function () { };
Pikachu.prototype = Object.create(Pokemon.prototype);
Pikachu.prototype.name = "ピカチュウ";
Pikachu.prototype.hp = 100;
Pikachu.prototype.attack = 70;
Pikachu.prototype.defense = 50;
Pikachu.prototype.speed = 80;

var Hitokage = function () { };
Hitokage.prototype = Object.create(Pokemon.prototype);
Hitokage.prototype.name = "ヒトカゲ";
Hitokage.prototype.hp = 100;
Hitokage.prototype.attack = 90;
Hitokage.prototype.defense = 50;
Hitokage.prototype.speed = 50;



