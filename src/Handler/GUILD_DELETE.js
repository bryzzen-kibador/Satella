module.exports = async (client, payload) => {
  const guild = client.guilds.get(payload.d.id);

  client.guilds.remove(payload.d.id);
  client.emit('ExitGuild', guild);
};
