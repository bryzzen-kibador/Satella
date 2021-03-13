module.exports = class User {
  constructor(client, data) {
    this.name = data.username;
    this.hashtag = `#${data.discriminator}`;
    this.flags = data.public_flags;
    this.id = data.id;
    this.avatar = data.avatar;
    this.bot = data.bot || false
  }

  get username() {
    return this.name + this.hashtag;
  }

  get creatAt(){
      return new Date(Math.floor(this.id / 4194304) + 1420070400000);
  }

  avatarURL(options) {
    if (this.avatar.startsWith('a_')) {
      return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.${options ? options.format : 'gif'}`;
    }

    const option = options.format ? options.format : 'png';

    return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.${option ? option.format == "gif" ? "png" : option.format : "png"}`;
  }
};
