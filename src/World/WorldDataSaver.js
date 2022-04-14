const World = require("./World");
const fs = require('fs');
const Configurator = require("easy-configurator");

class WorldDataSaver {

    /**
     * Saves a World
     * @param {World} World 
     */
    constructor(World) {
        this.world = World;
    }

    saveWorld() {

        if (!fs.existsSync(this.world.worldName)) {
            fs.mkdirSync(this.world.worldName);
        } else {
        }

        let wrldName = this.world.worldName;

        if (!fs.existsSync(`${wrldName}/data.json`)) {
            fs.writeFileSync(`${wrldName}/data.json`, "{}");
        }

        let worldData = new Configurator(`${wrldName}/data.json`).load();

        worldData.set("worldName", wrldName);
        worldData.set("maximumBlockHeight", this.world.maximumBlockHeight);
        worldData.set("minimumBlocksHeight", this.world.minimumBlockHeight);
        this.world.players = [];

        worldData.save();
    }

    static loadWorld(worldDirectory) {

        let world = new World();

        if (!fs.existsSync(`${worldDirectory}`)) {
            throw new Error("World Folder is not found!");
        } else if (!fs.existsSync(`${worldDirectory}\\data.json`)) {
            throw new Error("World Data File Is not found in " + worldDirectory);
        }

        let worldDataFile = new Configurator(`${worldDirectory}\\data.json`).load();

        world.worldName = worldDataFile.get("worldName");
        world.maximumBlockHeight = worldDataFile.get("maximumBlockHeight");
        world.minimumBlockHeight = worldDataFile.get("minimumBlockHeight");
        world.players = [];

        return world;
    }

}

module.exports = WorldDataSaver;