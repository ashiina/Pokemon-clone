
var Player = function () {
    this.animations = {};
    this.node;
    this.prev_key;

    this._contructor = function () {
        console.log("init player");
        this.animations.player_idle = new $.gQ.Animation({imageURL:"http://veekun.com/static/pokedex/downloads/diamond-pearl-frame2.png"});
        $("#actors").addSprite("player", {animation:this.animations.player_idle,
            width:56, height:62, posx:STAGE_WIDTH/2, posy:STAGE_HEIGHT/2});
        this.node = $("#player");
    };

    this.make_animation = function (key) {
        if (key == this.prev_key) return;
        var type = '';
        var offset_x = 0;
        var offset_y = 0;
        if (key == KEY_NONE) {
            offset_x = 75;
            switch (this.prev_key) {
                case KEY_A: offset_y = 0; break;
                case KEY_D: offset_y = 75; break;
                case KEY_W: offset_y = 150; break;
                case KEY_S: offset_y = 225; break;
            }
        } else {
            type = $.gQ.ANIMATION_PINGPONG | $.gQ.ANIMATION_HORIZONTAL;
            switch (key) {
                case KEY_A: offset_y = 0; break;
                case KEY_D: offset_y = 75; break;
                case KEY_W: offset_y = 150; break;
                case KEY_S: offset_y = 225; break;
            }
        }
        var animation = new $.gQ.Animation({
            imageURL:"http://veekun.com/static/pokedex/downloads/diamond-pearl-frame2.png",
            numberOfFrame: 3,
            delta: 75,
            rate: 180,
            type: type,
            offsetx: offset_x,
            offsety: offset_y
        });
        this.node.setAnimation(animation, null);
    };

    this.move = function (keys) {
        var newx = this.node.x();
        var newy = this.node.y();
        var key = KEY_NONE;
        if (keys[KEY_A]) { key = KEY_A; newx -= 5; }
        else if (keys[KEY_S]) { key = KEY_S; newy += 5; }
        else if (keys[KEY_D]) { key = KEY_D; newx += 5; }
        else if (keys[KEY_W]) { key = KEY_W; newy -= 5; }

        this.make_animation(key);
        this.prev_key = key;

        if (newx < 0) newx = 0;
        if (newx > STAGE_WIDTH - 56) newx = STAGE_WIDTH-56;
        if (newy > STAGE_HEIGHT - 62) newy = STAGE_HEIGHT-62;
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


