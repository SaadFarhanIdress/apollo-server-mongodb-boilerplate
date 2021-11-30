const { getUserId } = require('../../../utils');
const { post, user } = require('../../../db/models');
const { pubsub } = require('../../../server');

const postMutations = {
    async draftPost(_, { postInput }, context) {
        const { author, title, body, published } = postInput;

        const userId = getUserId(context);
        const postInfo = new post({
            title,
            body,
            author: [
                { authorId: userId },
                { authorName: author }
            ],
            published
        });
        const createdPost = await postInfo.save();

        pubsub.publish('TRIGGER_NEW_POST', { feedSubscription: createdPost });

        return createdPost;

    },
    async publishPost(_, { postId }, context) {

        const userId = getUserId(context);

        const postExists = await post.findOne({ 'author.$.authorId': userId });
        if (!postExists) {
            throw new Error('Post not found or you are not the author!');
        };

        await post.updateOne({ _id: postId }, { published: true });

        return { confirmationMessage: `Post of ${postId} has been published.` };

    },
    async deletePost(_, { postId }, context) {

        const userId = getUserId(context);

        const postExists = await post.remove({ _id: postId, 'author.$.authorId': userId });
        if (!postExists) {
            throw new Error('Post not found or you are not the author');
        }

        return { confirmationMessage: `Post of ID ${postId} has been deleted.` };
    },
    updatePost: async (_, args) => {
        const { postId, postInput } = args;
        const userId = getUserId(context);
        const postExists = await post.updateOne({ _id: postId, 'author.$.authorId': userId }, postInput);
        if (!postExists) {
            throw new Error('Post not found or you are not the author');
        }
        return { confirmationMessage: `Post of ID ${postId} has been updated.` };
    }
};

module.exports = { postMutations };