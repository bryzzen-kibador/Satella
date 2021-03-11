module.exports = class Embed {
    constructor(data){
        this.title = data.title || ""
        this.description = data.description || ""
        this.fields = []
        if(data.fields){
        this.fields = data.fields
        }

        this.url = data.url || ""
        this.color = data.color || ""
        if(this.color == "RANDOM"){
            // eslint-disable-next-line space-infix-ops
            this.color = Math.floor(Math.random()*16777215)
        }else{
            this.color = parseInt(this.color.replace("#", ""), 16)
        }

        this.timestamp = data.timestamp || 0

        // eslint-disable-next-line object-curly-spacing
        this.footer = data.footer || {text: "", icon_url: ""}

        // eslint-disable-next-line object-curly-spacing
        this.author = data.author || {name: "", url: ""}
    }

    setTitle(title){
        this.title = title
        return this
    }

    setColor(color){
        if(color == "RANDOM"){
            this.color = Math.floor(Math.random() * 16777215)
        }else{
            this.color = parseInt(color.replace("#", ""), 16)
        }
        return this;
    }

    setDescription(description){
        this.description = description
        return this;
    }

    addField(name, value, inline){
        this.fields.push({
            name,
            value,
            inline
        })
        return this;
    }

    setUrl(url){
        this.url = url
        return this
    }

    // eslint-disable-next-line camelcase
    setFooter(text, icon_url){
        this.footer = {
            text,
            icon_url
        }
        return this;
    }

    setAuthor(name, url){
        this.author = {
            name,
            url,
            icon_url: url
        }
        return this;
    }

    setTimestamp(time){
        if(!time){
           this.timestamp = Date.now()
        }else{
            this.timestamp = time
        }
        return this;
    }
}