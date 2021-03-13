const DMChannel = require('../Structures/DMChannel');
const Message = require('../Structures/Message');

module.exports = async (client, payload) => {
  const message = new Message(client, payload.d);

  if(message.channel){
  message.channel.messages.set(message.id, message);
  }else{
    const fetch = require("node-fetch")
    const userAgent = `DiscordBot (https://github.com/bryzzen-kibador/Satella, ${require('../../package.json').version})`;

    
    fetch(`https://discord.com/api/v8/channels/${payload.d.channel_id}`, {
      method: 'GET',
      headers: {
        "Authorization": `Bot ${client.token}`,
        'User-Agent': userAgent,
        'Content-Type': 'application/json',
        },
    }).then(res => res.json())
    .then(res => {
      let channel = new DMChannel(client, res)
      message.channel = channel
      client.channels.dmchannels.set(channel.id, channel)
      message.channel.messages.set(message.id, message)
    })
  }

  client.emit('MessageSent', message);
};
