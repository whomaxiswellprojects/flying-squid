const logger = require("../logger-util/logger");
const PacketError = require("./PacketError");

class Packet {
    /**
     * 
     * @param {string} packetName 
     */
    constructor(packetName) {
        this.name = packetName;
        this.logger = logger;
        this.packetSending = true;
    }

    /**
     * Runs when the packets gets sent
     * @param {object} sentBy
     */
    onPacketSent(sentBy) {
    }

    /**
     * Cancels Sending the packet
     */
    cancelPacket() {
        this.packetSending = false;
    }

    /**
     * Runs when the packets returns errors
     * @param {PacketError} error 
     */
    onPacketError(error) {
        
    }
}

module.exports = Packet;