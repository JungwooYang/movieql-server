import { ApolloServer, gql } from "apollo-server";

let tweets = [
  {
    id: "1",
    text: "i am the first.",
    userId: "2",
  },
  {
    id: "2",
    text: "i am the second.",
    userId: "1",
  },
];

let users = [
  {
    id: "1",
    firstName: "nico",
    lastName: "las",
  },
  {
    id: "2",
    firstName: "Elon",
    lastName: "Mask",
  },
];

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    firstName: String!
    lastName: String!
    fullName: String!
  }
  type Tweet {
    id: ID!
    text: String!
    author: User
  }
  type Query {
    allUsers: [User!]!
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
  }
  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    allTweets() {
      return tweets;
    },
    tweet(root, { id }) {
      return tweets.find((tweet) => tweet.id === id);
    },
    allUsers() {
      console.log("allUsers called!");
      return users;
    },
  },
  Mutation: {
    postTweet(root, { text, userId }) {
      try {
        if (users.find(user.id === userId)) {
          const newTweet = {
            id: tweets.length + 1,
            text,
            userId,
          };
          tweets.push(newTweet);
          return newTweet;
        } else {
          throw new Error("user does not exist.");
        }
      } catch (error) {
        console.log(error);
      }
    },
    deleteTweet(root, { id }) {
      const tweet = tweets.find((tweet) => tweet.id === id);
      if (!tweet) return false;
      tweets = tweets.filter((tweet) => tweet.id !== id);
      return true;
    },
    User: {
      fullName({ firstName, lastName }) {
        return `${firstName} ${lastName}`;
      },
    },
    Tweet: {
      author({ userId }) {
        return users.find(user.id === userId);
      },
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
