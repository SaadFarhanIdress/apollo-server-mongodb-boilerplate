const { post, user } = require('../../../db/models');
const { getUserId } = require('../../../utils');

module.exports = {
    Query: {
        async feed() {
            try {
                const posts = await post.find({ published: true })
                return posts;
            } catch (error) {
                throw new Error(error);
            }
        },
        async drafts(_, args, context) {
            try {
                const id = getUserId(context);
                const draftPosts = post.find({
                    authorId: id,
                    published: false
                });
                return draftPosts;
            }
            catch (error) {
                throw new Error(error);
            }
        },
        async me(_, args, context) {
            try {
                const id = getUserId(context);
                const info = user.findOne({ _id: id });
                return info;
            } catch (error) {
                throw new Error(error);
            }
        },
        async getPosts() {
            try {
                const posts = await post.find({});
                return posts;
            } catch (error) {
                throw new Error(error);
            }
        },
        async getPost(_, args) {
            try {
                const {postId} = args;
                const foundPost = await post.findOne({_id: postId});
                return foundPost;
            } catch (error) {
                throw new Error(error);
            }
        },
    }
};