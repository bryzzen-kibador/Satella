const Message = require('../Structures/Message');

module.exports = async (client, payload) => {
  const message = new Message(client, payload.d);
  client.emit('MessageSent', message);

  message.channel.messages.set(message.id, message);
};
