const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, rquired: true },
    body: { type: String, rquired: true },
    postedAt: { type: String, default: Date.now }
});

const post = new mongoose.model('posts', postSchema);

module.exports = post;