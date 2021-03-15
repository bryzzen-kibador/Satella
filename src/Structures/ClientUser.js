/* eslint-disable no-nested-ternary */
module.exports = class ClientUser {
  constructor(client, data) {
    this.verified = data.verified;
    this.name = data.username;

    this.id = data.id;
    this.flags = data.flags;

    this.hashtag = `#${data.discriminator}`;
    this.bot = data.bot || false;
  }

  get username() {
    return this.name + this.hashtag;
  }

  get createAt() {
    return new Date(Math.floor(this.id / 4194304) + 1420070400000);
  }

  avatarURL(options) {
    if (this.avatar.startsWith('a_')) {
      return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.${options ? options.format : 'gif'}`;
    }
    return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.${options ? options.format === 'gif' ? 'png' : options.format : 'png'}`;
  }
};
