const Chest = require("../Utils/Chest")
const Role = require("./Role")
const User = require("./User")

module.exports = class Mentions {
    constructor(client, payload){
        this.roles = new Chest(Role)
        if(payload.mention_roles.length > 0){
        payload.mention_roles.forEach(e => {
            this.roles.set(client.roles.get(e).id, client.roles.get(e))
        })
        }

        this.users = new Chest(User)
        if(payload.mentions.length > 0){
        payload.mentions.forEach(e => {
            this.users.set(client.users.get(e.id).id, client.users.get(e.id))
        })
        }
    }
}