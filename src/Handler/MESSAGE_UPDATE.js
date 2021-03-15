/* eslint-disable max-len */
const Message = require('../Structures/Message');

module.exports = async (client, payload) => {
  if (payload.d.channel_id && payload.d.id) {
    const channel = client.channels.channels.get(payload.d.channel_id) || client.channels.dmchannels.get(payload.d.channel_id);
    if (!channel) return;

    const message = channel.messages.get(payload.d.id);
    channel.messages.remove(payload.d.id);
    channel.messages.set(message.id, new Message(client, payload.d));

    const messageNew = channel.messages.get(payload.d.id);

    client.emit('MessageEdit', (message, messageNew));
  } else {
    client.emit('MessageEdit', (null, null));
  }
};
