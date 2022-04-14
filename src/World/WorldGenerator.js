const { existsSync } = require("fs");
const World = require("./World");
const WorldDataSaver = require("./WorldDataSaver");

class WorldGenerator {

    constructor() {
    }

    generateNewWorld(worldName, worldMaximumHeightLimit, worldMinimumHeightLimit) {
        let world = new World();

        if (existsSync(`${process.cwd()}${worldName}`)) {
            return this.loadWorld(worldName);
        }

        world.worldName = worldName;
        world.maximumBlockHeight = worldMaximumHeightLimit;
        world.minimumBlockHeight = worldMinimumHeightLimit;

        return world;
    }

    loadWorld(worldFolder) {
        return WorldDataSaver.loadWorld(worldFolder);
    }

}

module.exports = WorldGenerator;