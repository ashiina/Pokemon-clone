var Enemy = function () {
    this.pokemons = [];

    this._contructor = function () {
        console.log("init enemy");
        this.addPokemon(new Pikachu());
        this.addPokemon(new Hitokage());
        console.log(this.pokemons);
    };

    this.addPokemon = function (pokemon) {
        if (!Pokemon.prototype.isPrototypeOf(pokemon)) {
            console.log("Invalid:only addPokemon() only takes Pokemon class");
            return;
        }
        this.pokemons.push(pokemon);
    }

    this._contructor();
};
