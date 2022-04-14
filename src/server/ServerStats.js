const serverstatus = require('minecraft-server-util');
const motd = require("minecraft-motd-util");


/**
 * Returns status of a Java Minecraft Server
 * @param {string} ip 
 * @param {number} port 
 */
module.exports = async (ip, port) => {
    return await serverstatus.status(ip, port, { });
}