const Interaction = require('../Structures/Interaction');

module.exports = async (client, payload) => {
  const interaction = new Interaction(client, payload.d);

  client.emit('InteractionCreate', interaction);
};
