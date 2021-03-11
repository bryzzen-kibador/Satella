const Member = require('./Member');
const Message = require('./Message');

module.exports = class Interaction {
  constructor(client, data) {
    this.interacitonId = data.id;
    this.type = data.type;
    this.user = client.users.get(data.member.user.id ? data.member.user.id : '0');
    this.guild = client.guilds.get(data.guild_id);
    this.name = data.data.name;
    this.interactionToken = data.token;
    this._client = client;
    if(data.data.options){
      this.options = data.data.options
    }
  }

  async reply(subject) {
    const userAgent = `DiscordBot (https://github.com/bryzzen-kibador/Satella, ${require('../../package.json').version})`;

    return new Promise((resolve, reject) => {
      const fetch = require('node-fetch');

      let data = '';

      if (typeof subject == 'string') {
        data = JSON.stringify({ type: 4, data: { content: subject } });
      } else if (typeof subject == 'object') {
        subject.color = subject.color ? parseInt(subject.color.replace('#', ''), 16) : null;
        data = JSON.stringify({ type: 4, data: { embed: subject } });
      }

      fetch(`https://discord.com/api/v8/interactions/${this.interacitonId}/${this.interactionToken}/callback`, {
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bot ${this._client.token}`,
          'User-Agent': userAgent,
          'Content-Type': 'application/json',
        },
      });
    });
  }
};
