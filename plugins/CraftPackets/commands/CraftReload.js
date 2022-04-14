const Command = require("../../../src/commands/Command");
const CraftPackets = require("../craftpackets");

class CraftReload extends Command {

    /**
     * 
     * @param {CraftPackets} plugin 
     */
    constructor(plugin) {
        super("craftreload")
        this.plugin = plugin;
    }

    onExecute(args) {

        this.plugin.reloadPlugin();

    }

}

module.exports = CraftReload;