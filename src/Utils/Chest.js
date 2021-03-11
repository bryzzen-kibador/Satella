module.exports = class Chest extends Map {
  constructor(base, limit) {
    super();

    this.base = base;
    this.limit = limit || Infinity;
  }

  filter(filter) {
    const array = [];

    for (const val of this.values()) {
      if (filter(val)) {
        array.push(val);
      }
    }

    return array;
  }

  remove(id) {
    const obj = this.get(id);
    if (!obj) {
      return;
    }
    this.delete(obj.id);
    return obj;
  }

  find(filter) {
    for (const val of this.values()) {
      if (filter(val)) {
        return val;
      }
    }
    return undefined;
  }

  map(filter) {
    const array = [];

    for (const val of this.values()) {
      array.push(filter(val));
    }

    return array;
  }

  first() {
    return this.values().next().value;
  }

  set(id, object) {
    if (this.limit && this.limit > this.size) {
      return super.set(id, object);
    }
  }
};
