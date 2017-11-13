const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logSchema = new Schema({
    type: String,
    change: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model("logs", logSchema);