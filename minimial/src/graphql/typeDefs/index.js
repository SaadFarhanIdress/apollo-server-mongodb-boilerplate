const { gql } = require("apollo-server-express");

const typeDefs = gql`
    
    type Post {
        _id: ID!
        title: String!
        body: String!
        postedAt: String
    }

    input PostInput {
        title: String!
        body: String!
        postedAt: String
    }

    type Query {
        getPosts: [Post!]!
    }

    type Mutation {
        createPost(postInput: PostInput!): Post
    }
    
`;

module.exports = typeDefs