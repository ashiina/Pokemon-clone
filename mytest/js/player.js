
var Player = function () {
    this.animations = {};
    this.node;
    this._contructor = function () {
        console.log("init player");
        this.animations.player_idle = new $.gQ.Animation({imageURL:"img/player.png"});
        $("#actors").addSprite("player", {animation:this.animations.player_idle,
            width:56, height:62, posx:STAGE_WIDTH/2, posy:STAGE_HEIGHT/2});
        this.node = $("#player");
    };

    this.move = function (keys) {
        var newx = this.node.x();
        var newy = this.node.y();
        if (keys[KEY_A]) newx -= 5;
        else if (keys[KEY_S]) newy += 5;
        else if (keys[KEY_D]) newx += 5;
        else if (keys[KEY_W]) newy -= 5;
        if (newx < 0) newx = 0;
        if (newx > STAGE_WIDTH-56) newx = STAGE_WIDTH-56;
        if (newy > STAGE_HEIGHT-62) newy = STAGE_HEIGHT-62;
        if (newy < 0) newy = 0;

        var c = $("#player").collision("#objects,.object_1", {x:newx, y:newy});
        if (c.length > 0) {
            console.log("COLLIDED!!");
            return;
        }

        this.node.x(newx);
        this.node.y(newy);
    };

    this._contructor();
};


