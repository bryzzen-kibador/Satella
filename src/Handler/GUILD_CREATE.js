const Channel = require('../Structures/Channel');
const ClientUser = require('../Structures/ClientUser');
const Emoji = require('../Structures/Emoji');

const Guild = require('../Structures/Guild');
const Member = require('../Structures/Member');
const Role = require('../Structures/Role');

const User = require('../Structures/User');

module.exports = async (client, payload) => {
  const guild = new Guild(client, payload.d);

  const { d } = payload;

  d.roles.forEach((e) => {
    guild.roles.set(e.id, new Role(client, e));
    client.roles.set(e.id, new Role(client, e));
  });

  d.channels.forEach((e) => {
    const channel = new Channel(client, e);
    client.channels.set(channel.id, channel);
    guild.channels.set(channel.id, channel);
  });

  d.emojis.forEach((e) => {
    const emoji = new Emoji(client, e);
    guild.emojis.set(emoji.id, emoji);
    client.emojis.set(emoji.id, emoji);
  });

  d.members.forEach((e) => {
    if (e.user.id == client.user.id) return;
    guild.members.set(e.user.id, new Member(client, e));
    const user = new User(client, e.user);
    client.users.set(user.id, user);
  });

  if (client._guilds.includes(payload.d.id)) {
    client.guilds.set(guild.id, guild);
  } else {
    client.guilds.set(guild.id, guild);
    client.emit('NewGuild', guild);
  }
};
