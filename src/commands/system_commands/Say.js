const Command = require("../Command");

class Say extends Command {
    constructor() {
        super("say");
    }

    onExecute(args) {
        this.logger.info("[CHAT]:" + args.join(" "));
    }
}

module.exports = Say;