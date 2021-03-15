const event = require('events');
const Chest = require('../Utils/Chest');

const WebSocketManager = require('./websocket/WebSocketManager');

const Guild = require('../Structures/Guild');
const User = require('../Structures/User');
const Role = require('../Structures/Role');

const Emoji = require('../Structures/Emoji');
const Channels = require('../Structures/Channels');

const intentsFlags = {
  GUILDS: 1 << 0,
  GUILD_MEMBERS: 1 << 1,
  GUILD_BANS: 1 << 2,
  GUILD_EMOJIS: 1 << 3,
  GUILD_INTEGRATIONS: 1 << 4,
  GUILD_WEBHOOKS: 1 << 5,
  GUILD_INVITES: 1 << 6,
  GUILD_VOICE_STATES: 1 << 7,
  GUILD_PRESENCES: 1 << 8,
  GUILD_MESSAGES: 1 << 9,
  GUILD_MESSAGE_REACTIONS: 1 << 10,
  GUILD_MESSAGE_TYPING: 1 << 11,
  DIRECT_MESSAGES: 1 << 12,
  DIRECT_MESSAGE_REACTIONS: 1 << 13,
  DIRECT_MESSAGE_TYPING: 1 << 14,
};

/**
 * Represents a client
 * @class Client
 * @param {object} options - The client options
 * @param {WebSocket} ws - The client WebSocket
 * @function login - Connect the client to Discord API
 * @param {string} token - Receive the client token
 */

module.exports = class Client extends event {
  constructor(options) {
    super();

    this.options = { intents: Object.values(intentsFlags).reduce((f, i) => f | i, 0) & ~intentsFlags.GUILD_MEMBERS | intentsFlags.GUILD_PRESENCES,
      messagesCache: 100,
      ...options };

    this.ws = new WebSocketManager(this, this.options.intents);

    this.user;

    this.guilds = new Chest(Guild);
    this.users = new Chest(User);
    this.roles = new Chest(Role);

    this.channels = new Channels(this);

    this.emojis = new Chest(Emoji);
  }

  async login(token) {
    if (!token) return new Error('You forgot to specify the token');
    if (typeof token !== 'string') return new Error('This is not a string');

    await this.ws.connect(token);
  }

  get token() {
    return this.ws.token;
  }

  emit(event, ...args) {
    super.emit(event, ...args);
  }

  on(event, ...args) {
    super.on(event, ...args);
  }

  once(event, ...args) {
    super.once(event, ...args);
  }
};
