
var Pokemon = function () {
	// metadata
	this.name = "";
	this.imageUrl = "-";

	// pokemon stats
	this.attack = 0;
	this.defense = 0;
	this.hp = 1;
	this.max_hp = 1;
	this.speed = 0;
};
Pokemon.prototype.setHp = function (value) {
	this.hp = value;
};

var Pikachu = function () { };
Pikachu.prototype = Object.create(Pokemon.prototype);
Pikachu.prototype.name = "ピカチュウ";
Pikachu.prototype.hp = Pikachu.prototype.max_hp = 100;
Pikachu.prototype.attack = 70;
Pikachu.prototype.defense = 50;
Pikachu.prototype.speed = 80;
Pikachu.prototype.imageUrl = "http://cdn.bulbagarden.net/upload/thumb/0/0d/025Pikachu.png/250px-025Pikachu.png";

var Hitokage = function () { };
Hitokage.prototype = Object.create(Pokemon.prototype);
Hitokage.prototype.name = "ヒトカゲ";
Hitokage.prototype.hp = Hitokage.prototype.max_hp = 100;
Hitokage.prototype.attack = 90;
Hitokage.prototype.defense = 50;
Hitokage.prototype.speed = 50;
Hitokage.prototype.imageUrl = "http://cdn.bulbagarden.net/upload/thumb/7/73/004Charmander.png/250px-004Charmander.png";


