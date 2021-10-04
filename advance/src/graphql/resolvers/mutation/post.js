const { getUserId } = require('../../../utils');
const { post } = require('../../../db/models');
const { pubsub } = require('../../../server');

const postMutations = {
    async draftPost(_, { postInput }, context) {
        const { title, body, published } = postInput;

        const userId = getUserId(context);

        const postInfo = new post({
            title,
            body,
            authorId: userId,
            published
        });

        const createdPost = await postInfo.save();
        pubsub.publish('TRIGGER_NEW_POST', { feedSubscription: createdPost });
        return createdPost;

    },
    async publishPost(_, { postId }, context) {

        const userId = getUserId(context);

        const postExists = await post.findOne({ authorId: userId });
        if (!postExists) {
            throw new Error('Post not found or you are not the author!');
        };

        await post.updateOne({ _id: postId }, { published: true });
        return { confirmationMessage: `Post of ${postId} has been published.` };

    },
    async deletePost(_, { postId }, context) {

        const userId = getUserId(context);

        const postExists = await post.remove({ _id: postId, authorId: userId });
        if (!postExists) {
            throw new Error('Post not found or you are not the author');
        }

        return { confirmationMessage: `Post of ID ${postId} has been deleted.` };
    },
    updatePost: async (_, args) => {
        try {
            const { postId, postInput } = args;
            await post.updateOne({ _id: postId }, postInput);
            return { confirmationMessage: `Post of ID ${postId} has been updated.` };
        } catch (error) {
            throw new Error(error);
        }
    }
};

module.exports = { postMutations };