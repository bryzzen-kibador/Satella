/* eslint-disable no-param-reassign */
const ClientUser = require('../Structures/ClientUser');

module.exports = async (client, payload) => {
  client.user = new ClientUser(client, payload.d.user);

  payload.d.guilds.forEach((g) => {
    client.guilds.set(g.id);
  });

  client.emit('ready');

  client.ws.ready = true;
};
