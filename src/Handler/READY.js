const ClientUser = require('../Structures/ClientUser');
const DMChannel = require('../Structures/DMChannel');

module.exports = async (client, payload) => {
  client.user = new ClientUser(client, payload.d.user);

  payload.d.guilds.forEach((g) => {
    client.guilds.set(g.id)
  })

  client.emit('ready');

  client.ws.ready = true
};
