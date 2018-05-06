const responseGenerator = require("./ResponseGenerator");
const User = require("./User");

module.exports = class Pair {
  constructor(user1, user2) {
    if (user1 instanceof User && user2 instanceof User) {
      this.users = [user1, user2];

      user1.socket.send(responseGenerator.createPairResponse(user2));
      user2.socket.send(responseGenerator.createPairResponse(user1));
    } else {
      throw "Pair must consist of two users";
    }
  }
};
