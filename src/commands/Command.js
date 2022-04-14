const logger = require("../logger-util/logger");

class Command {

    constructor(name) {
        this.name = name;
        this.logger = logger;
    }

    /**
     * Returns the name of the command
     * @returns
     */
    getName() {
        return this.name;
    }

    /**
     * Command Executor
     * @param {string[]} args 
     */
    onExecute(args) {
    }

}

module.exports = Command;