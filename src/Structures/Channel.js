const Chest = require('../Utils/Chest');
const Embed = require('../Utils/Embed');
const Message = require('./Message');
const PermissionsOverwrites = require('./PermissionsOverwrites');

module.exports = class Channel {
  constructor(client, data) {
    this.type = data.type;
    this.topic = data.topic || '';
    this.position = data.position;
    this.permissionsOverwrites = new Chest(PermissionsOverwrites)
    this.category = data.parent_id;
    this.name = data.name;
    this.lastMessage = data.last_message_id;
    this.id = data.id;
    this._client = client;

    data.permission_overwrites.forEach(e => [
      this.permissionsOverwrites.set(e.id, new PermissionsOverwrites(client, e))
    ])

    this.messages = new Chest(Message, client.options.messagesCache);
  }

  async send(subject) {
    const userAgent = `DiscordBot (https://github.com/bryzzen-kibador/Satella, ${require('../../package.json').version})`;

    return new Promise((resolve, reject) => {
      const fetch = require('node-fetch');

      let data;

      if (typeof subject == 'string') {
        data = JSON.stringify({ content: subject, tts: false });
      } else if (typeof subject == 'object') {
        subject = new Embed(subject)
        data = JSON.stringify({ embed: subject, tts: false });
      }

      fetch(`https://discord.com/api/v8/channels/${this.id}/messages`, {
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bot ${this._client.token}`,
          'User-Agent': userAgent,
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json())
        .then((json) => {
          if (json.message) return new Error(json.message);
          const msg = new Message(this._client, json);
          resolve(msg);
        });
    });
  }
};
