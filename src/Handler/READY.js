const ClientUser = require('../Structures/ClientUser');

module.exports = async (client, payload) => {
  client.user = new ClientUser(client, payload.d.user);
  client.ws.ready = true
  client.emit('ready');
  payload.d.guilds.forEach((g) => {
    client._guilds.push(g.id);
  });
  /*payload.d.private_channels(e => {
    console.log(e)
  })*/
};
