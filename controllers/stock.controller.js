const mongoose = require("mongoose");
const Product = mongoose.model('products');
const Stock = mongoose.model("stock");

module.exports.NewItemInStock = async (req, res) => {
    const name = req.params.ProductName, quantity = parseInt(req.params.Quantity);
    if(!name || isNaN(quantity)) {
        return res.status(404).send({ "Message": "Product do not exist or not a valid quantity." });
    }
    if(quantity < 1){
        return res.status(404).send({ "Message": "Quantity must be higher than 0." });
    }
    const product = await Product.findOne({ "name": name });
    if(!product){
        return res.status(404).send({ "Message": "Product not found." });
    }
    const NewStock = await Stock.findOne({ "_product" :product.id });
    if(!NewStock){
        const stock = new Stock({
            _product: product.id,
            quantity,
            available: true
        });
        const newStock = await stock.save();
        if(!newStock){
            return res.status(204).send({ "Message": "Error saving in stock." });
        } else {
            return res.status(201).send(newStock);
        }
    } else {
        NewStock.quantity += quantity;
        await NewStock.save();
        return res.status(201).send(NewStock);
    }
}

module.exports.BuyProduct = async (req, res) => {
    
}