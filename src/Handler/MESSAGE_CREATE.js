const DMChannel = require('../Structures/DMChannel');
const DMMessage = require('../Structures/DMMessage');
const Message = require('../Structures/Message');

module.exports = async (client, payload) => {
  let channel = client.channels.channels.get(payload.d.channel_id) || client.channels.dmchannels.get(payload.d.channel_id)

  if (!channel) {
    const fetch = require("node-fetch")
    const userAgent = `DiscordBot (https://github.com/bryzzen-kibador/Satella, ${require('../../package.json').version})`;

    fetch(`https://discord.com/api/v8/channels/${payload.d.channel_id}`, {
      method: 'GET',
      headers: {
        "Authorization": `Bot ${client.token}`,
        'User-Agent': userAgent,
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .then(res => {
        const channeld = new DMChannel(client, res)
        channel = channeld
        client.channels.dmchannels.set(channel.id, channel)
        channel.messages.set(payload.d.id, new DMMessage(client, payload.d))
        return client.emit('MessageSent', new DMMessage(client, payload.d));
      })
  } else if (channel.type != 1) {
    const message = new Message(client, payload.d)
    message.channel.messages.set(payload.d.id, message);
    return client.emit('MessageSent', message);
  } else if (channel && channel.type == 1) {
    client.channels.dmchannels.get(payload.d.channel_id).messages.set(payload.d.id, new DMMessage(client, payload.d))
    return client.emit('MessageSent', new DMMessage(client, payload.d));
  }
};
