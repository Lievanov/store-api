const mongoose = require("mongoose");
const Product = mongoose.model('products');
const Stock = mongoose.model("stock");
const User = mongoose.model("users");
const Log = mongoose.model("logs");

module.exports.NewItemInStock = async (req, res) => {
    const name = req.body.productName, quantity = parseInt(req.body.quantity);
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
        NewStock.available = true;
        await NewStock.save();
        return res.status(201).send(NewStock);
    }
}

module.exports.BuyProduct = async (req, res) => {
    const name = req.body.productName, 
        quantity = parseInt(req.body.quantity);
    if(!name || isNaN(quantity)){
        return res.status(404).send({ "Message": "Product not found." });
    }
    const product = await Product.findOne({"name" : name});
    if(!product){
        return res.status(404).send({ "Message": "Product not found." });
    }
    //Search in stock
    const stock = await Stock.findOne({ "_product" :product.id });
    if(!stock){ return res.status(404).send({ "Message": "Product not found in stock." });}
    if(parseInt(stock.quantity) < quantity){
        return res.status(204).send({ "Message": "Not enought product in stock."});
    } else if(parseInt(stock.quantity) === quantity){
        stock.available = false;
    }
    stock.quantity -= quantity;
    //Add Product in User array
    let isOwnedProduct = false, i = 0;
    for(i; i<req.user.product.length; i++){
        if(req.user.product[i].name === name) { 
            isOwnedProduct = true;
            break;
        }
    }
    if(isOwnedProduct){
        req.user.product[i].owned += quantity;
    } else {
        product.owned = quantity;
        req.user.product.push(product);
    }
    await stock.save();
    const user = await req.user.save();
    //Log addition
    const log = new Log({
        user: req.user.id,
        type: "Buy",
        change: "Product: "+ product.name + ". User: " + req.user.id + ". Quantity: " + quantity + ". Date: " + Date.now()
    });
    await log.save();
    return res.status(201).send(user);
}