/* eslint-disable no-trailing-spaces */
module.exports = class ClientUser {
  constructor(client, data) {
    this.verified = data.verified;
    this.name = data.username;
    this.id = data.id;
    this.flags = data.flags;
    this.hashtag = `#${data.discriminator}`;
    this.createAt = new Date(Math.floor(this.id / 4194304) + 1420070400000);
  }

  get username() {
    return this.name + this.hashtag;
  }
  
  get createAt(){
    return new Date(Math.floor(this.id / 4194304) + 1420070400000);
  }
};
