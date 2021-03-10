module.exports = class User {
    constructor(client, data){
        //console.log(data)
        this.name = data.username
        this.hashtag = "#"+ data.discriminator
        this.flags = data.public_flags
        this.id = data.id
        this.avatar = data.avatar
        this.creatAt = new Date(Math.floor(this.id / 4194304) + 1420070400000)
        this.bot = data.bot
    }

    get username(){
        return this.name + this.hashtag
    }

    avatarURL(options){
        if(this.avatar.startsWith("a_")){
           return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.${options ? options.format : "gif"}`
        }else{
            return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.${options ? options.format == "gif" ? "png" : options.format : "png"}`
        }
    }
}