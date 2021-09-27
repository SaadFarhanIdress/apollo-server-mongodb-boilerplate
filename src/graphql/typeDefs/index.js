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

    type message { 
        confirmationMessage: String!
    }

    type Query {
        getPost(postId: ID!): Post!
        getPosts: [Post!]!
    }

    type Mutation {
        createPost(postInput: PostInput): Post
        updatePost(postId: ID!, postInput: PostInput): message
        deletePost(postId: ID!): message
    }

    type Subscription { 
        newPost: Post!
    }
`;

module.exports = typeDefs