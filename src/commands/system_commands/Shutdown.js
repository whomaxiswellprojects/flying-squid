const Command = require("../Command");

class Shutdown extends Command {

    constructor() {
        super("shutdown");
    }

    onExecute(args) {
        this.logger.info("Shutting down Server");
        process.exit(0);
    } 

}

module.exports = Shutdown;