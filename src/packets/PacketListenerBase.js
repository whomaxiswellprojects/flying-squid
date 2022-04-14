const Server = require("../..");
const logger = require("../logger-util/logger");
const Packet = require("./Packet");
const PacketError = require("./PacketError");

class PacketListenerBase {

    /**
     * Create a Packet Listener Base
     * @param {Server} server
     */
    constructor(server) {
        this.server = server;
        this.packets = this.server.packets || [];
        this.logger = logger;
    }

    /**
     * Sends a Packet to the server
     * @param {Packet} packet 
     * @param {*} sentBy
     */
    sendPacket(packet, sentBy) {
        if (!packet.packetSending) return;
        this.logger.info("Sending Packet name of: " + packet.name)
        try {
            this.packets.push(packet);
            packet.onPacketSent(sentBy);
    
            this.packets.pop();
        } catch (e) {
            packet.onPacketError(new PacketError("PACKET_ATTACH_ERROR && PACKET_SEND_ERROR"))
        }
    }

}

module.exports = PacketListenerBase;