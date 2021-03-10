const { Chest } = require("../..")
const Role = require("./Role")

module.exports = class Member{
    constructor(client, data){
        this.nick = data.nick ? data.nick : data.user.username
        this.id = data.user.id
        this.joinedAt = data.joined_at
        this.roles = new Chest(Role)
        data.roles.map(e => {
            this.roles.set(e, client.roles.get(e))
        })
    }
}