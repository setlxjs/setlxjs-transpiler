export default class UnsupportedError extends Error {
  constructor(feature, location = null) {
    super(`${feature} is not supported by Setlx.js`);

    this.feature = feature;
    this.location = location;
  }

  get message() {
    if (this.location) {
      return `${this.feature} in line ${this.location.line}:${this.location.column}` +
        ' is not supported by Setlx.js';
    }
    return `${this.feature} is not supported by Setlx.js`;
  }
}
