const Server = require(".");

new Server({
    maxPlayers: 1000,
    onlineMode: true,
}).start(false);