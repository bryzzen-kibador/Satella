module.exports = async (client, payload) => {
  const channel = client.channels.get(payload.d.channel_id);
  const message = channel.messages.get(payload.d.id);
  channel.messages.remove(message.id);

  client.emit('MessageDelete', message);
};
