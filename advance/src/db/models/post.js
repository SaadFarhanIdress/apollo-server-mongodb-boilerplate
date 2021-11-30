const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String },
    body: { type: String },
    published: { type: Boolean },
    postedAt: { type: String, default: Date.now },
    author: [{
        authorId: { type: String, ref: 'users' },
        authorName: { type: String, ref: 'users' }
    }]
});

module.exports = new mongoose.model('posts', postSchema);
