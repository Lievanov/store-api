const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stockSchema = new Schema({
    _product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    available: Boolean,
    creationDat: { type: Date, default: Date.now },
    lastUpdat: { type: Date, default: Date.now }
});

mongoose.model('stock', stockSchema);