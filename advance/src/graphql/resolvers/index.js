const { Query } = require('./query');
const { Subscription } = require('./subscription');
const { postMutations } = require('./mutation/post');
const { userMutations } = require('./mutation/user');

module.exports = {
    Query,
    Mutation: {
        ...userMutations,
        ...postMutations
    },
    Subscription: Subscription
}