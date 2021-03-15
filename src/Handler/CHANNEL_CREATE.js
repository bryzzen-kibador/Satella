const Channel = require('../Structures/Channel');
const DMChannel = require('../Structures/DMChannel');

module.exports = async (client, payload) => {
  if (payload.d.type === 1) {
    client.channels.dmchannels.set(payload.d.id, new DMChannel(client, payload.d));
  } else {
    const guild = client.guilds.get(payload.d.guild_id);
    guild.channels.set(payload.d.id, new Channel(client, payload.d));
    client.channels.channels.set(payload.d.id, new Channel(client, payload.d));
  }
};
