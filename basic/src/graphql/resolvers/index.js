const post = require('../../db/models')

const resolvers = {
    Query: {
        getPost: async (_, args) => {
            try {
                const { postId } = args;
                return await post.findOne({ _id: postId });
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

                const postToBeSave = await newPost.save();
                
                return postToBeSave;
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
    }
}

module.exports = resolvers;