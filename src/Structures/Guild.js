/* eslint-disable space-infix-ops */
/* eslint-disable prefer-template */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-dupe-class-members */
/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable class-methods-use-this */
const Chest = require('../Utils/Chest');
const Channel = require('./Channel');
const Emoji = require('./Emoji');
const Role = require('./Role');
const Member = require('./Member');
const Channels = require('./Channels');

module.exports = class Guild {
  constructor(client, data) {
    this.name = data.name;
    this.members_count = data.member_count;
    this.region = data.region;
    this.owner = data.owner_id;
    this.id = data.id;
    this.joinedAt = data.joined_at;

    this.members = new Chest(Member);

    this.roles = new Chest(Role);
    this._client = client;
    this.channels = new Chest(Channel)
    this.emojis = new Chest(Emoji);
  }

  createSlashCommand(data) {
    const userAgent = `DiscordBot (https://github.com/bryzzen-kibador/Satella, ${require('../../package.json').version})`;

    const url = `https://discord.com/api/v8/applications/${this._client.user.id}/guilds/${this.id}/commands`;

    const fetch = require('node-fetch');

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Authorization": `Bot ${this._client.ws.token}`,
        'User-Agent': userAgent,
        'Content-Type': 'application/json',
      },
    });
  }

  async kick(id){
    return new Promise((resolve, reject) => {
      const userAgent = `DiscordBot (https://github.com/bryzzen-kibador/Satella, ${require('../../package.json').version})`;
      const url = `https://discord.com/api/v8/guilds/${this.id}/members/${id}`;

      const fetch = require("node-fetch")

      fetch(url, {
        method: "DELETE",
        headers: {
          "Authorization": "Bot " + this._client.token,
          "User-Agent": userAgent,
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if(res.status !== 204) throw new Error("An error has happened!")
        resolve(null)
      })
    })
  }

  async ban(id, reason){
    return new Promise((resolve, reject) => {
      const userAgent = `DiscordBot (https://github.com/bryzzen-kibador/Satella, ${require('../../package.json').version})`;
      const url = `https://discord.com/api/v8/guilds/${this.id}/bans/${id}`;

      const fetch = require("node-fetch")

      fetch(url, {
        method: "PUT",
        body: JSON.stringify({reason: reason || ""}),
        headers: {
          "Authorization": "Bot "+this._client.token,
          "User-Agent": userAgent,
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if(res.status !== 204) throw new Error("An error has happened!")
        resolve(null)
      })
    })
  }
};
