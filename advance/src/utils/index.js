const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const SECRETS = require('../config');

const getUserId = (context) => {
    const auth = context.req.headers.authorization;
    
    if (auth) {
        const token = auth.replace('Bearer ', '');
        const {userId} = jwt.verify(token, SECRETS.APP_SECRET);
        return userId;
    }

    throw new AuthenticationError();

}

module.exports = {getUserId}