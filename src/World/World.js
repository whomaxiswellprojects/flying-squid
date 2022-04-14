const fs = require('fs');
const WorldDataSaver = require('./WorldDataSaver');

class World {

    constructor() {
        this.players = [];
        this.worldName = "";
        this.maximumBlockHeight = 256;
        this.minimumBlockHeight = 0;
    }

    saveWorldState() {
        new WorldDataSaver(this).saveWorld();
        return this;
    }

}

module.exports = World;