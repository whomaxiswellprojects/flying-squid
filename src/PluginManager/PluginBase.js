const Server = require("../..");
const CommandManager = require("../commands/CommandManager");
const logger = require("../logger-util/logger");
const fs = require("fs");
const Configurator = require("easy-configurator");

class PluginBase {

    constructor() {
        this.name = "";
        this.version = "";
        this.description = "";
        this.permissions = [];
        this.commands = [];
        this.directoryName = "";
        this.cmdManager = null;
    }

    onEnable() {
    }

    onDisable() {
    }

    destroyPlugin() {
        this.name = "";
        this.version = "";
        this.description = "";
        this.permissions = {};
        this.commands = {};
        return this;
    }

    getLogger() {
        return logger;
    }

    getCommandManager() {
        if (!(this.cmdManager instanceof CommandManager)) {
            return new CommandManager();
        }

        return this.cmdManager;
    }

    reloadPlugin() {
        fs.readdirSync(`${process.cwd()}/plugins/${this.directoryName}`).forEach((f) => {
            if (f.startsWith("plugin") && f.endsWith(".json")) {
                let cfg = new Configurator(`plugins/${this.directoryName}/${f}`).load();

                let pl2 = require(`${process.cwd()}/plugins/${this.directoryName}/${cfg.get("main")}`);
                let pl = new pl2();

                pl.onDisable();
                pl.onEnable();

            }
        })
    }
}

module.exports = PluginBase;