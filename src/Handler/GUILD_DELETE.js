/* eslint-disable no-undef */
module.exports = async (client, payload) => {
    client._guilds.splice(client._guilds.indexOf(payload.d.id), 1)
    const guild = client.guilds.get(paylod.d.id)
    client.guilds.remove(payload.d.id)
    client.emit("ExitGuild", guild)
}