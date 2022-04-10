const mongoose = require('mongoose');
require('dotenv').config();

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

module.exports = {
    User,
    connect
};