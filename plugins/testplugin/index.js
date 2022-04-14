const Command = require("../../src/commands/Command");
const PluginBase = require("../../src/PluginManager/PluginBase");

class MyPlugin extends PluginBase {

    onEnable() {
        console.log("hi!");
    }

    onDisable() {
        console.log("bye!");
    }

}

module.exports = MyPlugin;