/* eslint-disable no-undef */
module.exports = async (client, payload) => {
  const guild = client.guilds.get(paylod.d.id);
  client.guilds.remove(payload.d.id);
  client.emit('ExitGuild', guild);
};
