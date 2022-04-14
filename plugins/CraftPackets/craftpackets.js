const PluginBase = require("../../src/PluginManager/PluginBase");
const { createSperator } = require("../../utils/Sperators");
const CraftInit = require("./commands/CraftInit");
const CraftPrint = require("./commands/craftprint");
const CraftReload = require("./commands/CraftReload");

class CraftPackets extends PluginBase {

    constructor() {
        super();
    }

    onEnable() {
        this.getLogger().info(createSperator("CraftPackets v" + this.version + " has been enabled!"));
        this.getCommandManager().addCommand(new CraftInit(this));
        this.getCommandManager().addCommand(new CraftReload(this));
        this.getCommandManager().addCommand(new CraftPrint(this));
    }
}

module.exports = CraftPackets;