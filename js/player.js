
var Player = function () {
    this.node;
    this.prev_key;

    this._contructor = function () {
        console.log("init player");
        $("#actors").addSprite("player", {
            width:PLAYER_WIDTH,
            height:PLAYER_HEIGHT,
            posx:STAGE_WIDTH/2,
            posy:STAGE_HEIGHT/2
        });
        this.node = $("#player");
    };

    this.make_animation = function (key) {
        if (key == this.prev_key) return;
        var type = 0;
        var offset_x = 0;
        var offset_y = 0;
        var cond_key = KEY_NONE;
        if (key == KEY_NONE) { //キーが押されてなかった時は直前のキーに応じて画像を選択
            offset_x = 0 * PLAYER_WIDTH;
            cond_key = this.prev_key;
        } else { //キーに応じてアニメーション
            type = $.gQ.ANIMATION_PINGPONG | $.gQ.ANIMATION_HORIZONTAL;
            cond_key = key;
        }
        switch (cond_key) {
            case KEY_W: offset_y = 1 * PLAYER_HEIGHT; break;
            case KEY_A: offset_y = 2 * PLAYER_HEIGHT; break;
            case KEY_D: offset_y = 3 * PLAYER_HEIGHT; break;
            case KEY_S:
            default: offset_y = 0 * PLAYER_HEIGHT; break;
        }
        var animation = new $.gQ.Animation({
            imageURL:"img/players.png",
            numberOfFrame: 3,
            delta: 30,
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
			if (r < 0.01) console.log("Monster!");
		}

        this.node.x(newx);
        this.node.y(newy);
    };

    this._contructor();
};


