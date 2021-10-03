const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { user } = require('../../../db/models');
const SECRETS = require('../../../config');

const userMutations = {
    async signup(_, args, context) {
        const hashedPassword = await bcrypt.hash(args.password, 10);
        const newUser = new user({
            name: args.name,
            email: args.email,
            password: hashedPassword
        })
        const {email, password, name, _id} = await newUser.save();
        return {
            token: jwt.sign({ userId: _id }, SECRETS.APP_SECRET),
            user: {
                name,
                email,
                _id,
                password
            }
        }
    },
    async login(_, { email, password }, context) {
        const foundUser = await user.findOne({ email });
        if (!foundUser) {
            throw new Error('Enter correct email!')
        }
        const passwordValid = await bcrypt.compare(password, foundUser.password);
        if (!passwordValid) {
            throw new Error('Invalid password!')
        }
        return {
            token: jwt.sign({ userId: foundUser.id }, SECRETS.APP_SECRET),
            foundUser
        }
    },
}

module.exports = { userMutations }