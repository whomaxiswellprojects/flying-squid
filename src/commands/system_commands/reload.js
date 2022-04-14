const Server = require("../../..");
const { createSperator } = require("../../../utils/Sperators");
const Command = require("../Command");

class reload extends Command {

    /**
     * @param {Server} server 
     */
    constructor(server) {
        super("reload");
        this.server = server;
    }

    onExecute(args) {

        this.logger.warn(createSperator("This command is not completed it might make plugins return errors!"));

        this.server.reloadServer();

    }
}

module.exports = reload;