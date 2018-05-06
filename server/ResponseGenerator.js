// Utility methods to create JSON responses

module.exports = {
  createPairResponse: user =>
    JSON.stringify({
      type: "PAIR",
      pairUser: {
        name: user.name,
        id: user.id
      }
    }),

  createSendResponse: (id, name, text) =>
    JSON.stringify({
      type: "SEND",
      id,
      name,
      text
    })
};
