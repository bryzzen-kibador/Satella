module.exports = async (client, payload) => {
  const member = client.guilds.get(payload.d.guild_id).members.get(payload.d.user.id);
  client.users.remove(payload.d.user.id);
  client.guilds.get(payload.d.guild_id).members.remove(payload.d.user.id);
  client.emit('MemberRemove', member);
};
