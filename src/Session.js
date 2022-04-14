const ygg = require('yggdrasil');
const Server = require('..');
const {v4: uuidv4} = require("uuid");

class Session {

    /**
     * 
     * @param {string} sessionToken 
     * @param {string} sessionUsername 
     * @param {string} sessionPassword
     * @param {string} uuid 
     * @param {Server} server 
     */
    constructor(sessionToken, sessionEmail,sessionUsername, sessionPassword, uuid, server) {
        this.authString = "https://authserver.mojang.com";
        this.token = sessionToken;
        this.username = sessionUsername;
        this.password = sessionPassword;
        this.server = server;
        this.uuid = uuid;
        this.email = sessionEmail;
    }

    /**
     * 
     * @param {string} username 
     * @param {Server} server
     * @returns 
     */
    static TestDummyAccount(username, server) {
        return new Session("0", "nil", username, "nil", uuidv4(), server);
    }

    async auth() {
        if (this.server.options.onlinemode) {
            return `${this.email}/${this.password}/${this.username}/(${this.token})/${this.uuid}/Mojang`;
        }
        return `nil/nil/${this.username}/(nil)/${this.uuid}/Cracked`;
    }

    getUsername() {
        return this.username;
    }

    getPassword() {
        return this.password;
    }

    getEmail() {
        return this.email;
    }

    getToken() {
        return this.token;
    }

    getServer() {
        return this.server;
    }
}

module.exports = Session;