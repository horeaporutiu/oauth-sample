const mongoose = require('mongoose');
require('dotenv').config();

console.log(process.env.DB_PASSWORD)

const uri = 'mongodb+srv://' + process.env.DB_USERNAME + ':' +
    process.env.DB_PASSWORD +
    '@cluster0.yvswg.mongodb.net/' + process.env.DB_NAME +
    '?retryWrites=true&w=majority';

const connect = async function () {
    // Connect to MongoDB
    mongoose.connect(
        uri,
        { useNewUrlParser: true, useUnifiedTopology: true },
    );
};

const usersSchema = mongoose.Schema(
    {
        _id: String,
        team: { id: String, name: String },
        enterprise: { id: String, name: String },
        user: { token: String, scopes: [String], id: String },
        tokenType: String,
        isEnterpriseInstall: Boolean,
        appId: String,
        authVersion: String,
        bot: {
            scopes: [
                String,
            ],
            token: String,
            userId: String,
            id: String,
        },
    },
    { _id: false },
);

const User = mongoose.model('User', usersSchema);

const findUser = async function (id) {
    try {
        const user = await User.find({ _id: id });
        // return first user we find
        if (user[0] != undefined) {
            return user[0];
        }
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    User,
    connect,
    findUser,
};