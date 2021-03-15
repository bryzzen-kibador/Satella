/* eslint-disable consistent-return */
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable padded-blocks */
const Mentions = require('./Mentions');

module.exports = class Message {
  constructor(client, data) {
    this._client = client;
    this._data = data;
    this.pinned = data.pinned;

    this.tts = data.tts;
    this.referenceMessage = data.referenced_message;
    this.id = data.id;

    this.subject = data.content;

    if (data.author && data.author.id !== client.user.id) {
      this.guild = client.guilds.get(data.guild_id);
      this.channel = client.channels.channels.get(data.channel_id);

      if (data.author) this.user = data.author.id === client.user.id ? client.user : client.users.get(data.author.id);
      if (data.author) this.member = client.guilds.get(data.guild_id).members.get(data.author.id);
    }

    this.mentions = new Mentions(client, data);
  }

  async reply(subject) {
    const userAgent = `DiscordBot (https://github.com/bryzzen-kibador/Satella, ${require('../../package.json').version})`;

    return new Promise((resolve, _reject) => {
      const fetch = require('node-fetch');

      let data;

      if (typeof subject === 'string') {
        data = JSON.stringify({ content: subject, tts: false, message_reference: { message_id: this.id, guild_id: this._data.guild_id } });
      } else if (typeof subject === 'object') {
        data = JSON.stringify({ embed: subject, tts: false, message_reference: { message_id: this.id, guild_id: this._data.guild_id } });
      }

      fetch(`https://discord.com/api/v8/channels/${this._data.channel_id}/messages`, {
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bot ${this._client.token}`,
          'User-Agent': userAgent,
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json())
        .then((json) => {
          if (json.message) throw new Error(json.message);
          const msg = new Message(this._client, json);

          resolve(msg);
        });
    });
  }

  async createReaction(reaction) {
    const userAgent = `DiscordBot (https://github.com/bryzzen-kibador/Satella, ${require('../../package.json').version})`;

    return new Promise((resolve, reject) => {
      const fetch = require('node-fetch');

      if (!reaction.id) {
        fetch(`https://discord.com/api/v8/channels/${this._data.channel_id}/messages/${this._data.id}/reactions/${encodeURIComponent(`${reaction.name}`)}/@me`, {
          method: 'PUT',
          headers: {
            Authorization: `Bot ${this._client.token}`,
          },
        }).then((res) => {
          if (res.status !== 204) return new Error('An error has happened!');
        });
      } else {
        fetch(`https://discord.com/api/v8/channels/${this._data.channel_id}/messages/${this._data.id}/reactions/${encodeURIComponent(`${reaction.name}:${reaction.id}`)}/@me`, {
          method: 'PUT',
          headers: {
            Authorization: `Bot ${this._client.token}`,
          },
        }).then((res) => {
          if (res.status !== 204) throw new Error('An error has happened!');
        });
      }
    });
  }
};
