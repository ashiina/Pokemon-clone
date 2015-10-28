
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

var Gyarados = function () { };
Gyarados.prototype = Object.create(Pokemon.prototype);
Gyarados.prototype.name = "ギャラドス";
Gyarados.prototype.hp = Gyarados.prototype.max_hp = 100;
Gyarados.prototype.attack = 100;
Gyarados.prototype.defense = 50;
Gyarados.prototype.speed = 70;
Gyarados.prototype.imageUrl = "http://cdn.bulbagarden.net/upload/thumb/4/41/130Gyarados.png/250px-130Gyarados.png";

var Kabigon = function () { };
Kabigon.prototype = Object.create(Pokemon.prototype);
Kabigon.prototype.name = "カビゴン";
Kabigon.prototype.hp = Kabigon.prototype.max_hp = 110;
Kabigon.prototype.attack = 40;
Kabigon.prototype.defense = 80;
Kabigon.prototype.speed = 30;
Kabigon.prototype.imageUrl = "http://cdn.bulbagarden.net/upload/thumb/f/fb/143Snorlax.png/250px-143Snorlax.png";




