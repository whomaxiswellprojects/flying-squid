const Server = require("../..");
const help = require("./system_commands/help");
const Plugins = require("./system_commands/plugins");
const reload = require("./system_commands/reload");
const Say = require("./system_commands/Say");
const Shutdown = require("./system_commands/Shutdown");

class CommandManager {

    /**
     * 
     * @param {Server} server 
     */
    constructor(server) {
        this.commands = [];
        this.server = server;
    }

    addCommand(command) {
        if (this.commands.includes(command)) {
            this.commands.filter((cmd, i) => {
                return cmd === command;
            }).forEach((cmd, i) => {
                this.commands.splice(i, 1);
            });
        }
        this.commands.push(command);
    }

    addSystemCommands() {
        this.commands.push(new Shutdown());
        this.commands.push(new Say());
        this.commands.push(new Plugins());
        this.commands.push(new help(this));
        this.commands.push(new reload(this.server));
    }
}

module.exports = CommandManager;