const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now }
});

mongoose.model('likes', likeSchema);
module.exports = likeSchema;