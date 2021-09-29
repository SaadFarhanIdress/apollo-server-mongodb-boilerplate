const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { ApolloServer } = require('apollo-server');

const connectToMongoDB = require('./db/connect');

require('colors');

const PORT = process.env.PORT || 5000;

connectToMongoDB();

const server = new ApolloServer({ typeDefs, resolvers });

(async () => {
    console.log('[server]: Connecting to server...'.yellow.bold.underline);
    server.listen(PORT, () => {
        console.log(`[server]: Server is ready at http://localhost:${PORT}`.yellow.bold.underline);
    });
})();