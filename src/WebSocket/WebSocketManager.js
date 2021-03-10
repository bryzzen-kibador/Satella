const WebSocket = require('ws');

module.exports = class WebSocketManager {
  constructor(client, intents) {
    this.client = client;
    this.intents = intents;

    this.ws;
    this.url = 'wss://gateway.discord.gg/?v=8&encoding=json';
    this.ping = 0;
  }

  async connect(token) {
    if (!token) return new Error('You forgot to specify the token');
    if (typeof token !== 'string') return new Error('This is not a string');
    this.token = token;

    this.ws = new WebSocket(this.url);

<<<<<<< HEAD
    this.ws.on('open', async () => {
      this.ws.send(JSON.stringify({
        op: 2,
        d: {
          token,
          intents: this.intents,
          properties: {
            $os: process.platform,
            $browser: 'Satella',
            $device: 'Satella',
          },
        },
      }));
    });
=======
        this.ws.on("open", async () => {
                this.ws.send(JSON.stringify({
                    "op": 2,
                    "d": {
                        "token": token,
                        "intents": this.intents,
                        "properties": {
                            "$os": process.platform,
                            "$browser": "Satella",
                            "$device": "Satella"
                        }
                    }
                }))

                this.lastheatSent = Date.now()
                this.ws.send(JSON.stringify({
                    op: 1,
                    d: null
                }))
        })
>>>>>>> 55b23dfca402e9bcc2fd48da1d74dad043ecfa43

    this.ws.on('error', async (err) => {
      console.log(err);
    });

    this.ws.on('message', async (msg) => {
      const payload = JSON.parse(msg.toString());

      const {
        t: event, op, d, s,
      } = payload;
      // console.log(payload)

      switch (op) {
        case 10:
          this.lastheat = Date.now();
          this.seq = s;
          this.interval = this.heartbeat(d.heartbeat_interval);
          break;
        case 11:
          this.lastheat = Date.now();
          this.ping = this.lastheat - this.lastheatSent;
          break;
        case 0:
          this.seq = s;
          try {
            // eslint-disable-next-line import/no-dynamic-require
            const handler = require(`../Handler/${event}.js`);
            handler(this.client, payload);
          } catch (e) {
            console.log(e);
          }
          break;
        case 9:
          throw new Error('Invalid Sesion!');
      }
    });
  }

  heartbeat(ms) {
    return setInterval(() => {
      this.lastheatSent = Date.now();
      this.ws.send(JSON.stringify({
        op: 1,
        d: this.seq,
      }));
    }, ms);
  }
};
