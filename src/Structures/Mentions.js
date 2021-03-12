const Chest = require('../Utils/Chest');
const Role = require('./Role');
const User = require('./User');

module.exports = class Mentions {
  constructor(client, payload) {
    // console.log(payload)
    this.roles = new Chest(Role);
    if (payload.mention_roles) {
      payload.mention_roles.forEach((e) => {
        this.roles.set(client.roles.get(e).id, client.roles.get(e));
      });
    }

    this.users = new Chest(User);
    if (payload.mentions) {
      payload.mentions.forEach((e) => {
        if(e.id == client.user.id){
          this.users.set(client.user.id, client.user)
          return
        }
        this.users.set(client.users.get(e.id).id, client.users.get(e.id));
      });
    }
  }
};
