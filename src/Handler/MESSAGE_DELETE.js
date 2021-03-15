module.exports = async (client, payload) => {
  if (!payload.d.channel_id || !payload.d.id) return;

  const channel = client.channels.dmchannels.get(payload.d.channel_id) || client.channels.channels.get(payload.d.channel_id);
  if (!channel) return;

  const message = channel.messages.get(payload.d.id);
  channel.messages.remove(message.id);

  client.emit('MessageDelete', message);
};
