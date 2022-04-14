const CommandManager = require("./CommandManager");
const readline = require("readline");
const Command = require("./Command");
const rl = readline.createInterface(
    {
        input: process.stdin,
        output: process.stdout,
    }
);

class CommandInputManager {
    /**
     * 
     * @param {CommandManager} CommandManager 
     */
    constructor(CommandManager) {
        this.cmdManager = CommandManager;
    }

    startInput() {
        
        var InputHolder = () => {
            rl.question("> ", (answer) => {
                for (let cmd of this.cmdManager.commands) {
                    if (!(cmd instanceof Command)) {
                        return;
                    }
                    let args = answer.split(' ');
                    if (args[0].toLowerCase() == cmd.getName().toLowerCase()) {
                        delete args[0];

                        cmd.onExecute(args);
                        InputHolder();
                    } else {
                        InputHolder();
                    }
                }
            });
        }

        InputHolder();

    }

    closeInput() {
        rl.close();
    }
}

module.exports = CommandInputManager;