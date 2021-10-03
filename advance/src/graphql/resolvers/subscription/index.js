const { pubsub } = require("../../../server");

module.exports = {
    Subscription: {
        feedSubscription: {
            subscribe: () => pubsub.asyncIterator(['TRIGGER_NEW_POST'])
        }
    }
}