const Player = require("../../player/Player");
const Packet = require("../Packet");
const PacketError = require("../PacketError");

class PlayerPositionEditPacket extends Packet {
    constructor() {
        super("PlayerPositionEditPacket");
    }

    /**
     * 
     * @param {object} sentBy 
     */
    onPacketSent(sentBy) {
        if (!(sentBy instanceof Player)) {
            return;
        }

        this.logger.info("Player " + sentBy.session.getUsername() + " Changed position at (X: " + sentBy.x + ", Y: " + sentBy.y + ", Z: " + sentBy.z + ")");
    }

    /**
     * 
     * @param {PacketError} packetError 
     */
    onPacketError(packetError) {
        this.logger.error("Player Position Packet couldn't be sent!");
    }
}

module.exports = PlayerPositionEditPacket;