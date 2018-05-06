const User = require("./User");
const Pair = require("./Pair");

const store = {
  pairs: [],
  waiting: []
};

// Form waiting users into pairs
// Running this on-demand may break at scale
// This should be a queued action to prevent multiple instances running at once
const runMatching = () => {
  // Keep track of already-matched users to manage waiting list
  const matchedUsers = [];

  // Keep track of new pairs to return them
  const newPairs = [];

  // Iterate through every user combination, ignoring already matched users
  for (const user of store.waiting) {
    if (!matchedUsers.includes(user.id)) {
      for (const pairUser of store.waiting) {
        if (!matchedUsers.includes(pairUser.id)) {
          if (user.id !== pairUser.id) {
            // If users aren't blocking each other, pair them
            if (
              !user.blockList.includes(pairUser.id) &&
              !pairUser.blockList.includes(user.id)
            ) {
              const pair = new Pair(user, pairUser);
              newPairs.push(pair);
              store.pairs.push(pair);

              matchedUsers.push(user.id);
              matchedUsers.push(pairUser.id);
            }
          }
        }
      }
    }
  }

  // Filter down waiting list
  store.waiting = store.waiting.filter(it => !matchedUsers.includes(it.id));
};

module.exports = {
  /* Handle initial connections and pairing
     Returns a pair only if there's a match */
  connect: (id, name, ws) => {
    store.waiting.push(new User(id, name, ws));
    runMatching();
  },

  // Given a user ID, find their pair if it exists
  getPair: id => {
    for (const pair of store.pairs) {
      if (pair.users[0].id === id || pair.users[1].id === id) {
        return pair;
      }
    }
    return null;
  },

  // Given a pair, return the user not provided
  getPairRecipient: (pair, id) => {
    if (pair.users[0].id === id) {
      return pair.users[1];
    }

    if (pair.users[1].id === id) {
      return pair.users[0];
    }

    return null;
  },

  // Given a pair, return the user provided
  getPairSender: (pair, id) => {
    if (pair.users[0].id === id) {
      return pair.users[0];
    }

    if (pair.users[1].id === id) {
      return pair.users[1];
    }

    return null;
  },

  // Given a pair, break it up and smash it to pieces :(
  releasePair: pair => {
    pair.users[0].blockList.push(pair.users[1].id);
    pair.users[1].blockList.push(pair.users[0].id);

    store.waiting.push(pair.users[0]);
    store.waiting.push(pair.users[1]);

    store.pairs = store.pairs.filter(it => it !== pair);

    runMatching();
  }
};
