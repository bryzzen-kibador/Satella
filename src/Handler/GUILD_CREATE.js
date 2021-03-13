/* eslint-disable no-undef-init */
/* eslint-disable radix */
/* eslint-disable no-const-assign */
const Channel = require('../Structures/Channel');
const ClientUser = require('../Structures/ClientUser');
const DMChannel = require('../Structures/DMChannel');
const Emoji = require('../Structures/Emoji');

const Guild = require('../Structures/Guild');
const Member = require('../Structures/Member');
const Role = require('../Structures/Role');

const User = require('../Structures/User');

module.exports = async (client, payload) => {
  if(!client.ws.ready) return;
  const guild = new Guild(client, payload.d);

  const { d } = payload;

  d.roles.forEach((e) => {
    guild.roles.set(e.id, new Role(client, e));
    client.roles.set(e.id, new Role(client, e));
  });

  d.channels.forEach((e) => {
    let channel = undefined

    if(parseInt(e.type) === 1){
      channel = new DMChannel(client, e)
      client.channels.dmchannels.set(channel.id, channel);
    }else{
      channel = new Channel(client, e);
      client.channels.channels.set(channel.id, channel);
      guild.channels.set(channel.id, channel);
    }
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
