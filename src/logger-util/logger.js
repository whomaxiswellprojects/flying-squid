const cli = require("cli-color");

module.exports = {

    info(message) {
        console.log(cli.greenBright('[INFO]: ') + message);
    },

    warn(message) {
        console.log(cli.yellowBright('[WARN]: ') + message);
    },

    error(message) {
        console.log(cli.redBright('[ERROR]: ') + message);
    }

}