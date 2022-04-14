const Command = require("../../../src/commands/Command");
const CraftPackets = require("../craftpackets");
const fs = require('fs');
const Configurator = require("easy-configurator");

class CraftInit extends Command {

    /**
    * 
    * @param {CraftPackets} plugin 
    */
    constructor(plugin) {
        super("craftinit")
    }

    /**
     * 
     * @param {string[]} args 
     */
    onExecute(args) {
        if (!fs.existsSync("classicCraftPackets")) {
            fs.mkdirSync("classicCraftPackets");

            fs.writeFileSync("classicCraftPackets/dev.cpacket", "SourceData: new SourceData()\nState: SourceData.CraftPacketState\nSourceExit: new SourceOut(SourceData).Exit\nSourceExit(0)");
            fs.writeFileSync("classicCraftPackets/printed.cpacket", "");
        } else {
            this.logger.info("Craft Packet already inited!");
        }
        return;
    }
}

module.exports = CraftInit;