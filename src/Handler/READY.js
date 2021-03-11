const ClientUser = require('../Structures/ClientUser');

module.exports = async (client, payload) => {
  client.user = new ClientUser(client, payload.d.user);
  client.emit('ready');

  payload.d.guilds.forEach((g) => {
    client._guilds.push(g.id);
  });
};
