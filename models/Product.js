const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LikeSchema = require("./Like");

const productSchema = new Schema({
    price: { type: Number, default: 0 },
    name: { type: String },
    like: [LikeSchema],
    creationDate: { type: Date, default: Date.now },
    lastUpdate: { type: Date, default: Date.now },
    owned: Number
});

mongoose.model('products', productSchema);
module.exports = productSchema;