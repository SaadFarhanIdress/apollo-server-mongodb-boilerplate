const post = require('../../db/models')

const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const resolvers = {
    Query: {
        getPost: async (_, args) => {
            try {
                const { postId } = args;
                return await post.find({ _id: postId });
            } catch (error) {
                throw new Error(error);
            }
        },
        getPosts: async (_, args) => {
            try {
                return await post.find({});
            } catch (error) {
                throw new Error(error);
            }
        }
    },
    Mutation: {
        createPost: async (_, args) => {
            try {
                const { postInput } = args;

                const newPost = new post(postInput);
                const post = await newPost.save();
                pubsub.publish('NEW_POST', {
                    newPost: post
                });

                return post;
            } catch (error) {
                throw new Error(error);
            }
        },
        deletePost: async (_, args) => {
            try {
                const { postId } = args;
                await post.deleteOne({ _id: postId });
                return { confirmationMessage: `Post of ID ${postId} has been deleted.` }
            } catch (error) {
                throw new Error(error);
            }
        },
        updatePost: async (_, args) => {
            try {
                const { postId, postInput } = args;
                await post.updateOne({ _id: postId }, postInput);
                return { confirmationMessage: `Post of ID ${postId} has been updated.` }
            } catch (error) {
                throw new Error(error);
            }
        }
    },
    Subscription: {
        newPost: {
            subscribe: () => pubsub.asyncIterator('NEW_POST')
        }
    }
}

module.exports = resolvers;