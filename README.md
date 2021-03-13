<div align="center">

<br />

<p>
  <h1><i><b>Satella</b></i></h1>
</p>

<p>
  <h2>A wrapper for the Discord API made in JS</h2>
</p>

<br />
<br />

</div>

## Instalation
```
npm install --save satella
```
________________
<br />
<br />

## Example

```js
const {Client} = require("satella")

const client = new Client()

client.on("ready", () => {
    console.log(client.user.username)
})

client.on("MessageSent",  message| => {
    if(message.subject.startsWith("..ping")){
      return message.reply(~~(client.ws.ping)+"ms")
    }
})

client.login("TOKEN")
```

<br />
<br />

## Still in production!