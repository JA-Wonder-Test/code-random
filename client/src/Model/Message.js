export default class Message {
  constructor(user, id, text) {
    this.time = Date.now();
    this.user = user;
    this.userId = id;
    this.text = text;
    this.id = `${this.time}-${this.user}`;
  }
}
