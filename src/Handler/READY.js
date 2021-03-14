const ClientUser = require('../Structures/ClientUser');
const DMChannel = require('../Structures/DMChannel');

module.exports = async (client, payload) => {
  const userAgent = `DiscordBot (https://github.com/bryzzen-kibador/Satella, ${require('../../package.json').version})`;

  const fetch = require("node-fetch")

  fetch(`https://discord.com/api/v8/users/@me/channels`, {
    method: "GET",
    headers: {
      "Authorization": `Bot ${client.token}`,
      'User-Agent': userAgent,
      'Content-Type': 'application/json',
    },
  }).then(res => res.json)
  .then(res => {
    if(res && res.length >= 1){
    res.map(e => {
      client.channels.dmchannels.set(e.id, new DMChannel(client, e))
    })
    }
  })
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
