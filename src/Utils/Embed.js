const Color = require('./Color');

module.exports = class Embed {
  constructor(data) {
    this.title = data.title || null;
    this.description = data.description || null;
    this.fields = data.fields || [];

    this.url = data.url || null;
    this.color = parseInt(new Color(data.color).hsl, 16) || null;

    this.timestamp = data.timestamp || 0;
    this.footer = data.footer || null;
    this.author = data.author || null;

    this.thumbnail = data.color || null;
    this.image = data.image || null;
  }

  setTitle(title) {
    this.title = title;
    return this;
  }

  setColor(color) {
    if (!new Color(color).valid) throw new Error('Invalid Color!');
    this.color = parseInt(new Color(color).hsl, 16);
    return this;
  }

  setThumbnail(url, options) {
    if (options && options.height && options.width) {
      this.thumbnail = {
        url, proxy_url: url, height: options.height, width: options.width,
      };
    } else {
      this.thumbnail = { url, proxy_url: url };
    }
    return this;
  }

  setImage(url, options) {
    if (options && options.height && options.width) {
      this.thumbnail = {
        url, proxy_url: url, height: options.height, width: options.width,
      };
    } else {
      this.thumbnail = { url, proxy_url: url };
    }
    return this;
  }

  setDescription(description) {
    this.description = description;
    return this;
  }

  addField(name, value, inline) {
    this.fields.push({
      name,
      value,
      inline,
    });
    return this;
  }

  setUrl(url) {
    this.url = url;
    return this;
  }

  // eslint-disable-next-line camelcase
  setFooter(text, icon_url) {
    this.footer = {
      text,
      icon_url,
    };
    return this;
  }

  setAuthor(name, url) {
    this.author = {
      name,
      url,
      icon_url: url,
    };
    return this;
  }

  setTimestamp(time) {
    this.timestamp = time || Date.now();

    return this;
  }
};
