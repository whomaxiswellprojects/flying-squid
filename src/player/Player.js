const Configurator = require("easy-configurator");
const Server = require("../..");
const MessageListener = require("../listeners/MessageListener");
const PlayerListener = require("../listeners/PlayerListener");
const logger = require("../logger-util/logger");
const Session = require("../Session");
const World = require("../World/World");

class Player {
    /**
     * @param {Server} server
     * @param {Session} playerSession
     */
    constructor(server, playerSession) {
        this.server = server;
        this.session = playerSession;
        this.playerHealth = 20.0;
        this.step = 0.3;
        this.riding = false;
        this.infire = false;
        this.online = false;
        this.logger = logger;
        this.flying = false;
        this.allowFlying = false;
        this.banned = false;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.playerWorldIn = new World();

        let banscfg = new Configurator("bans.json").load();
        if (banscfg.has(this.session.uuid)) {
            this.banned = banscfg.getDictionary(this.session.uuid).get("banned");
        }

        this.listeners = {
            messageListener: new MessageListener(this.server, this),
            PlayerListener: new PlayerListener(this.server),
        }
    }

    /**
     * Make a player try to fly
     * @param {boolean} allowFlying 
     */
    setAllowFlying(allowFlying) {
        this.allowFlying = allowFlying;
    }

    /**
     * Returns if the Player is flying
     * @returns
     */
    isFlying() {
        return this.flying;
    }

    /**
     * Returns if the player can fly
     * @returns
     */
    isFlyingAllowed() {
        return this.allowFlying;
    }

    /**
     * Set the player to flying or not flying
     * @param {boolean} flying 
     */
    setFlying(flying) {
        this.flying = flying;
    }

    /**
     * Checks if the player is online
     * @returns 
     */
    isOnline() {
        return this.online;
    }

    /**
     * Checks if the player is banned
     * @returns
     */
    isBanned() {
        return this.banned;
    }

    /**
     * Connect a user to the server
     * @returns 
     */
    connect() {
        if (this.server.onlinePlayers.length >= this.server.options.maxPlayers) {
            this.logger.error(`User: ${this.session.getUsername()} (${this.session.uuid}) tried to join the server but the server is full!`);
            return;
        }

        this.server.onlinePlayers.push(this);

        this.online = true;
        this.sendMessage("Welcome user to this server!");
        this.logger.info(`User: ${this.session.getUsername()} (${this.session.uuid}) has Joined the server!`);
        return true;
    }

    /**
     * Kicks the player
     * @param {string} message
     * @returns 
     */
    kick(message) {
        if (!this.isOnline()) {
            return false;
        }

        this.disconnect(!message ? "You Were Kicked out of this server!" : message);

        return true;
    }

    /**
     * Disconnects the player from the server
     * @param {string} message
     */
    disconnect(message) {
        let i = this.server.onlinePlayers.indexOf(this);
        this.server.onlinePlayers.splice(i, 1);
        this.logger.info(`User: ${this.session.getUsername()} (${this.session.uuid}) has left the server!`);
        this.sendMessage(message);
        this.online = false;
    }

    /**
     * Sends a message to the player
     * @param {string} message
     */
    sendMessage(message) {
        this.listeners.messageListener.send(message);
    }

    setPosition(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.listeners.PlayerListener.sendPlayerPacketPosition(this);
    }

    /**
     * Changes the Player World
     * @param {World} world 
     */
    changeWorld(world) {
        this.playerWorldIn = world;
    }
}

module.exports = Player;