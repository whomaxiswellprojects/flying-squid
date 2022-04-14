const Server = require("../..");
const ChatMessageSentPacket = require("../packets/impl/ChatMessageSentPacket");
const PacketListenerBase = require("../packets/PacketListenerBase");
const Player = require("../player/Player");

class MessageListener extends PacketListenerBase {

    /**
     * Creates a asynchronous Message Listener
     * @param {Player} player 
     */
    static async createListener(player) {
        return new MessageListener(player);
    }

    /**
     * Creates a Message Listener
     * @param {Server} server
     * @param {Player} player 
     */
    constructor(server, player) {
        super(server)
        this.player = player;
        this.messages = [];
    }

    send(str) {
        this.messages.push(str);
        this.sendPacket(new ChatMessageSentPacket(str));
    }

}

module.exports = MessageListener;