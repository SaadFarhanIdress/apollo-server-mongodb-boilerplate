const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String },
    body: { type: String },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    published: { type: Boolean },
    postedAt: { type: String, default: Date.now }
});

const post = new mongoose.model('posts', postSchema);

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: { type: String },
    name: { type: String },
});

const user = new mongoose.model('users', userSchema);

module.exports = {
    post,
    user
};