const { gql } = require("apollo-server-express");

const typeDefs = gql`
    
    input PostInput {
        authorId: String
        title: String!
        body: String!
        postedAt: String
        published: Boolean!
    }

    type AuthPayload {
        token: String!
        user: User!
    }

    type message { 
        confirmationMessage: String!
    }

    type Post {
        _id: ID
        title: String!
        body: String!
        published: Boolean!
        author: User!
        postedAt: String
    }

    type User { 
        _id: ID
        email: String!
        name: String!
        password: String!
        posts: [Post!]!
    }

    type message {
        confirmationMessage: String!
    }

    type Query {
        getPost(postId: ID!): Post!
        getPosts: [Post!]!
        me: User!
        drafts: [Post!]!
        feed: [Post!]!
    }

    type Mutation {
        publishPost(postId: String!): Post!
        updatePost(postId: ID!, postInput: PostInput): message!
        deletePost(postId: ID!): message!
        signup(email: String!, password: String!, name: String!): AuthPayload!
        login(email: String!, password: String!): AuthPayload!
        draftPost(postInput: PostInput): Post!
    }

    type Subscription {
        feedSubscription: Post!
    }
`;

module.exports = typeDefs