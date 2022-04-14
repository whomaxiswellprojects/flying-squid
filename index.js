const { existsSync, readdirSync, fstat, writeFileSync } = require("fs");
const minecraft_protocol = require("minecraft-protocol");
const CommandInputManager = require("./src/commands/CommandInputManager");
const CommandManager = require("./src/commands/CommandManager");
const logger = require("./src/logger-util/logger");
const Packet = require("./src/packets/Packet");
const Player = require("./src/player/Player");
const PluginManager = require("./src/PluginManager/PluginManager");
const Session = require("./src/Session");
const WorldGenerator = require("./src/World/WorldGenerator");
const { createSperator } = require("./utils/Sperators");

class Server {
    constructor(options) {
        this.options = options || {};
        this.CommandManager = new CommandManager(this);
        this.PluginManager = new PluginManager(this, this.CommandManager);
        this.CommandInputManager = new CommandInputManager(this.CommandManager);
        this.packets = [];
        this.files = {
            bans: {
                fn: "bans.json",
                data: "{}"
            }
        };
        this.running = false;
        this.session = Session.TestDummyAccount("testDummyOMG", this);
        this.testDummyPlayer = new Player(this, this.session);
        this.onlinePlayers = []
    }

    start(force = false) {
        if (this.running) return;

        logger.info("Loading Server Please wait");
        if (!force) {
            let onlineMode = true;

            if (this.options.onlineMode === undefined || this.options.onlineMode === null) {
                onlineMode = true;
            } else if (this.options.onlineMode) {
                onlineMode = true;
            } else {
                onlineMode = false;
            }

            if (onlineMode) {

            } else {
                logger.warn(createSperator("Your currently running this server on cracked, so might some hackers join your server and destory it!"));
            }
            setTimeout(() => {

                new WorldGenerator().generateNewWorld("world", 0, 256).saveWorldState();
                new WorldGenerator().generateNewWorld("world_nether", 0, 256).saveWorldState();
                new WorldGenerator().generateNewWorld("world_the_end", 0, 256).saveWorldState();

                for (let [key, value] of Object.entries(this.files)) {
                    if (!existsSync(value.fn)) {
                        writeFileSync(value.fn, value.data);
                    }
                }

                if (!existsSync("plugins")) {
                } else {
                    if (!readdirSync("plugins").length) {
                    } else {
                        var plugins = this.PluginManager.loadPlugins();
                    }
                }

                this.CommandManager.addSystemCommands();

                this.testDummyPlayer.connect();
                let maxPlayers = 0;
                if (!this.options.maxPlayers) {
                    maxPlayers = 20;
                } else {
                    maxPlayers = this.options.maxPlayers;
                }

                logger.info("Currently there is " + this.onlinePlayers.length + "/" + (maxPlayers) + " in the server!");

                this.CommandInputManager.startInput();
                this.running = true;

            }, 2000)

        }

    }

    reloadServer() {
        if (!this.running) {
            return false;
        }

        this.CommandManager.commands.forEach((cmd, i) => {
            this.CommandManager.commands.splice(i, 1);
        });
        this.PluginManager.loaded.forEach((cmd, i) => {
            cmd.onDisable();
            setTimeout(() => {
                this.PluginManager.loaded.splice(i, 1);
            }, 1000);
        });
        this.onlinePlayers.forEach((p, i) => {
            this.onlinePlayers.splice(i, 1);
        })
        this.running = false;
        this.start(false);
    }
}

module.exports = Server;