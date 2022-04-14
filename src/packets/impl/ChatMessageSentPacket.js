const MessageListener = require("../../listeners/MessageListener");
const Player = require("../../player/Player");
const Packet = require("../Packet");

class ChatMessageSentPacket extends Packet {

    /**
     * Sends a Text Through chat
     * @param {string} text 
     */
    constructor(text) {
        super("ChatMessageSentPacket");
        this.text = text;
    }

    /**
     * @param {object} sentBy 
     */
    onPacketSent(sentBy) {
        if (!(sentBy instanceof Player) || !(sentBy instanceof MessageListener)) {
            return;
        }

        this.logger.info("[CHAT]: " + this.text);
    }
}

module.exports = ChatMessageSentPacket;