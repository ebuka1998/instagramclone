const {ApolloServer} = require('apollo-server')

const typeDefs = require('./graphql/typeDefs')


const resolvers = require('./graphql/resolvers');
const contextMiddleware = require('./utils/contextMiddleware');

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context: contextMiddleware//({req}) => ({req, pubsub})
});


server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});