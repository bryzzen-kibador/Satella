const Message = require("../Structures/Message")

module.exports = async (client, payload) => {
    let channel = client.channels.get(payload.d.channel_id)
    const message = channel.messages.get(payload.d.id)
    channel.messages.remove(message.id)
    channel.messages.set(payload.d.id, new Message(client, payload.d))

    const messageNew = channel.messages.get(payload.d.id)

    client.emit("MessageEdit", messageNew._data.content);
}