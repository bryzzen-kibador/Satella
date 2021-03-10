module.exports = class Member {
  constructor(client, data) {
    this.nick = data.nick ? data.nick : data.user.username;
    this.id = data.user.id;
    this.joinedAt = data.joined_at;
    this.roles = new Map();

    data.roles.map((e) => this.roles.set(e, client.roles.get(e)));
  }
};
