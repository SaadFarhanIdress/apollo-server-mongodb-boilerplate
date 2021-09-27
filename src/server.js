const colors = require('colors');

const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { execute, subscribe } = require("graphql");

const connectToMongoDB = require('./db/connect');

const { createServer } = require("http");
const express = require("express");
const PORT = process.env.PORT || 5000;

const app = express();
const httpServer = createServer(app);
const schema = makeExecutableSchema({typeDefs, resolvers});
const server = new ApolloServer({schema});

connectToMongoDB();

(async () => {

    console.log("[server]: Starting server...".yellow.bold);

    await server.start();

    server.applyMiddleware({app});

    SubscriptionServer.create(
        {schema, execute, subscribe},
        {server: httpServer, path: server.graphqlPath}
    );

    httpServer.listen(PORT, () => {
        console.log( `[server]: 🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`.yellow.bold.underline);
        console.log(`[server]: 🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`.yellow.bold.underline);
    })
})();