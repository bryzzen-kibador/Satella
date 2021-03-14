module.exports = class DMMessage{
    constructor(client, data){
        this.id = data.id
        this.subject = data.content
        this.channel = client.channels.dmchannels.get(data.channel_id)
        this.user = this.channel.users.get(data.author.id)
    }
}