const logger = require("../logger-util/logger");

class PacketError {
    /**
     * Packets Error
     * @param {string} message 
     */
    constructor(message) {
        this.logger = logger;
        this.message = message;
    }

    /**
     * return of the error message
     * @returns
     */
    as_string() {
        return `Error while sending Packet: ${this.message}`;
    }

    /**
     * asynchronous return of the error message
     * @returns
     */
    async async_as_string() {
        return this.as_string();
    }
}

module.exports = PacketError;