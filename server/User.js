module.exports = class User {
  constructor(id, name, socket) {
    this.id = id;
    this.name = name;
    this.socket = socket;
    this.blockList = [];
  }
};
