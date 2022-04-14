const motd = require('minecraft-motd-util');

class MotdManager {

    constructor(MotdString) {
        this.text = MotdString;
    }

    format() {
        return motd.format(this.text, {
            formattingCharacter: "&" || "§",
        });
    }

    parse() {
        return motd.parse(this.text, { formattingCharacter: "&" || "§" });
    }
}

module.exports = MotdManager;