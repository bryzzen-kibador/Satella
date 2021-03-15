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

  if(client.guilds.has(guild.id)){
    client.guilds.remove(guild.id)
    client.guilds.set(guild.id, guild)
  }else{
    client.guilds.set(guild.id, guild)
    client.emit("NewGuild", guild)
  }

  const { d } = payload;

  d.roles.forEach((e) => {
    client.roles.set(e.id, new Role(client, e));
  });

  d.channels.forEach((e) => {
    let channel = new Channel(client, e);
    client.channels.channels.set(channel.id, channel);
  });

  d.emojis.forEach((e) => {
    const emoji = new Emoji(client, e);
    client.emojis.set(emoji.id, emoji)
  });

  d.members.forEach((e) => {
    if(client.user.id != e.id){
    const user = new User(client, e.user);
    client.users.set(user.id, user);
    }
  });
};
