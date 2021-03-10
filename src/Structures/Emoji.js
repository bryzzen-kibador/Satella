module.exports = class Emoji {
  constructor(client, data) {
    this.name = data.name;
    this.id = data.id;
    this.animated = data.animated;
    this.managed = data.managed;
    this.available = data.available;
  }
};
