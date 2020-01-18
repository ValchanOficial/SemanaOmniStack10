const mongoose = require('mongoose');
const PointSchema = require('./pointSchema');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const DevSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
});
autoIncrement.initialize(mongoose.connection)
DevSchema.plugin(autoIncrement.plugin, {
    model: 'Dev', field: '_id',
    startAt: 0,
    incrementBy: 1
});

module.exports = mongoose.model('Dev', DevSchema);