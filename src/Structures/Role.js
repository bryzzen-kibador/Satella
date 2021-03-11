module.exports = class Role {
  constructor(client, data) {
    this.position = data.position;
    this.permissions = data.permissions;
    this.id = data.id;
    this.mentionable = data.mentionable;
    this.name = data.name;
    this.color = data.color;
  }
};
