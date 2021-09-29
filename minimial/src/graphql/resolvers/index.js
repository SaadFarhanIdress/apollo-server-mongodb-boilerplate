const post = require('../../db/models')

const resolvers = {
    Query: {
        getPosts: async (_, args) => {
            try {
                //
                const posts = await post.find({});;
                return  posts;
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
    }
}

module.exports = resolvers;