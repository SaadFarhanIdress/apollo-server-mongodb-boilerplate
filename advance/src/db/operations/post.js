const { post } = require("../models")

module.exports.draftPost = async (data) => {
    return await post.save(data);
}

module.exports.getPosts = async () => {
    return await post.find({});
}

module.exports.getPost = async (condition) => {
    return await post.findOne(condition);
}

module.exports.publishPost = async (condition, input) => {
    return await post.updateOne(condition, input);
}

module.exports.updatePost = async (condition, input) => {
    return await post.updateOne(condition, input);

}  

module.exports.deletePost = async (condition) => {
    return await post.remove(condition);
}
