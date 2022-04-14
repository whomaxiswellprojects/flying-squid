const fs = require('fs');
const Configurator = require("easy-configurator")
const PluginBase = require("./PluginBase");
const CommandManager = require('../commands/CommandManager');
const logger = require('../logger-util/logger');
const Server = require('../..');

class PluginManager {

    /**
     * @param {Server} server
     * @param {CommandManager} cmdManager
     */
    constructor(server, cmdManager) {
        this.loaded = [];
        this.cmdManager = cmdManager;
        this.server = server;
    }

    loadPlugins() {
        if (!fs.existsSync("plugins")) {
            fs.mkdirSync("plugins");
            return;
        }

        fs.readdirSync(process.cwd() + "/plugins").forEach(dir => {
            fs.readdirSync(process.cwd() + "/plugins/" + dir).filter((f) => { return f.endsWith(".json") }).forEach((f) => {
                if (f.startsWith("plugin") && f.endsWith(".json")) {
                    let plugincfg = new Configurator(`${process.cwd()}/plugins/${dir}/${f}`).load();

                    if (plugincfg.has("main")) {
                        let pl2 = require(`${process.cwd()}/plugins/${dir}/${plugincfg.get("main")}`)
                        let pl = new pl2();

                        if (!(pl instanceof PluginBase)) {
                            return;
                        }
                        
                        pl.name = plugincfg.get("name") || "BukkitJSPlugin";
                        pl.description = plugincfg.get("description") || "No description was found!";
                        pl.version = plugincfg.get("version") || "0.0.1";
                        logger.info("Loading Plugin: " + pl.name + "@" + pl.version);
                        pl.permissions = plugincfg.getDictionary("permissions").DICTIONARY || {};
                        pl.commands = plugincfg.getDictionary("commands").DICTIONARY || {};
                        pl.cmdManager = this.cmdManager || new CommandManager();
                        pl.directoryName = dir;
                        
                        pl.onEnable();

                        process.on("SIGHUP", (singal) => {
                            pl.onDisable();
                        })
                    } else {
                        throw new Error("Plugin Main was not found!")
                    }

    
                }
            })
        })

    }

}

module.exports = PluginManager;