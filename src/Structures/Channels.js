const Chest = require("../Utils/Chest")
const Channel = require("./Channel")
const DMChannel = require("./DMChannel")

module.exports = class Channels {
    constructor(client) {
        this.dmchannels = new Chest(DMChannel)
        this.channels = new Chest(Channel)
    }
}