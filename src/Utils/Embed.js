module.exports = class Embed {
  constructor(data = {}) {
    this.description = data.description || null;
    this.color = data.color || 'gordao';
  }

  setColor(color) {
    this.color = this.parseColor(color);

    return this;
  }

  setDescription(description) {
    this.description = description;

    return this;
  }

  parseColor(color = 0) {
    if (typeof color == 'string') {
      const colorParsed = parseInt(color.replace('#', ''), 16);

      return colorParsed;
    }
  }
};
