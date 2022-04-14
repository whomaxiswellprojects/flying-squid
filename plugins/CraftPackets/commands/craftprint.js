const { writeFileSync } = require("fs");
const Command = require("../../../src/commands/Command");
const CraftPackets = require("../craftpackets");

class CraftPrint extends Command {

    /**
     * 
     * @param {CraftPackets} plugin 
     */
    constructor(plugin) {
        super("craftprint");
        this.plugin = plugin;
        this.str = "";
    }

    onExecute(args) {
        let opts = "";
        args.forEach((strx) => {
            this.str += strx + "\n";
            opts += strx + " ";
        });

        this.str = this.str.slice(0, -1);
        opts = opts.slice(0, -1);

        writeFileSync("classicCraftPackets/printed.cpacket", this.str);
        this.logger.info("[CraftPackets] / [Printer]: Printed: \"" + opts + "\" to classicCraftPackets/printed.cpacket");
    }
}

module.exports = CraftPrint;