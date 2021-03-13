/* eslint-disable no-undef */
const Chest = require("../Utils/Chest")
const User = require("./User")
const Message = require("./Message")

module.exports = class DMChannel {
    constructor(client, data) {
        this.type = 1
        this.lastMessage = data.last_message_id
        this.id = data.id
        this.users = new Chest(User)
        data.recipients.forEach(e => {
            if (e.id == client.user.id) {
                this.users.set(client.user.id, client.user)
            } else {
                this.users.set(e.id, client.users.get(e.id))
            }
        })

        this.messages = new Chest(Message, client.options.messagesCache || 100);
    }

    async send(subject) {
        const userAgent = `DiscordBot (https://github.com/bryzzen-kibador/Satella, ${require('../../package.json').version})`;

        return new Promise((resolve, reject) => {
            const fetch = require('node-fetch');

            let data;

            if (typeof subject == 'string') {
                data = JSON.stringify({ content: subject, tts: false });
            } else if (typeof subject == 'object') {
                subject.color = subject.color ? parseInt(subject.color.replace('#', ''), 16) : null;
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
}