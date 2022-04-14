const Configurator = require("easy-configurator");
const fs = require("fs");
const { cwd } = require("process");
const Command = require("../Command");

class Plugins extends Command {

    constructor() {
        super("plugins");
    }

    onExecute(args) {

        if (!fs.existsSync(`${cwd()}/plugins`)) {
            return;
        }

        fs.readdirSync(`${cwd()}/plugins`).forEach(dir => {
            fs.readdirSync(`${cwd()}/plugins/${dir}`).filter((f) => { return f.endsWith(".json") }).forEach((f) => {

                if (!(f.startsWith("plugin") && f.endsWith(".json"))) {
                    return;
                }

                let cfg = new Configurator(`${cwd()}/plugins/${dir}/${f}`).load();

                let str = "";

                let arr = [];

                arr.push(cfg.get("name"));

                arr.forEach((n) => {
                    str += n + " ";
                })

                this.logger.info("Plugins: " + str);

            });
        })

    }

}

module.exports = Plugins;