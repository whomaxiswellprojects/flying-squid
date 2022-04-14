const Command = require("../Command");
const CommandManager = require("../CommandManager");

class help extends Command {

    /**
     * @param {CommandManager} cmdManager
     */
    constructor(cmdManager) {
        super("help");
        this.cmdManager = cmdManager;
    }

    onExecute(args) {
        let str = "";

        this.cmdManager.commands.forEach((cmd) => {
            str += cmd.name + ", ";
        });

        str = str.slice(0, -2);

        this.logger.info("Commands: " + str);
    } 

}

module.exports = help;