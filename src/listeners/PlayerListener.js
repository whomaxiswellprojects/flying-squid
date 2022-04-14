const Server = require("../..");
const PlayerPositionEditPacket = require("../packets/impl/PlayerPositionEditPacket");
const PacketListenerBase = require("../packets/PacketListenerBase");
const Player = require("../player/Player");

class PlayerListener extends PacketListenerBase {

    /**
     * 
     * @param {Server} server 
     */
    constructor(server) {
        super(server);
    }

    /**
     * 
     * @param {Player} player 
     */
    sendPlayerPacketPosition(player) {
        this.sendPacket(new PlayerPositionEditPacket(), player);
    }

}

module.exports = PlayerListener;