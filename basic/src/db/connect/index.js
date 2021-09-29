const mongoose = require('mongoose');
const SECRETS = require('../../config');

const connectToMongoDB = async () => {
    try {
        console.log('[db]: Connecting to database...'.cyan.bold);
        await mongoose.connect(SECRETS.DATABASE_URL, {
            useNewUrlParser: true,
        });
        console.log('[db]: Database connected...'.cyan.underline.bold);
    } catch (error) {
        console.log(`[db]: Unable to connect to database: ${error.message}`.red);
    }
}

module.exports = connectToMongoDB;