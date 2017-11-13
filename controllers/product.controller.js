const mongoose = require("mongoose");
const Product = mongoose.model('products');
const Log = mongoose.model("logs");
const Stock = mongoose.model("stock");

module.exports.NewProduct = async (req, res) => {
    const { name, price } = req.body;
    if(name === "" || price < 0 || isNaN(price) ){
        return res.status(400).send({ "message": "Error creating a product."});
        } else {
            const product = new Product({
                name, 
                price: parseFloat(price).toFixed(2)
            });
            const newProduct = await product.save();
            return res.status(201).send(newProduct);
        }
}

module.exports.AllProducts = async (req, res) => {
    let offset = 0, limit = 10;
    
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset, 10);
    }
    if(req.query && req.query.limit){
        limit = parseInt(req.query.limit, 10);
    }
    const products = await Product.find().skip(offset).limit(limit);
        if(products){
            return res.status(200).send(products);
        } else {
            return res.status(404).send({ "Message": "Products not found."});
        }
}

module.exports.DeleteProduct = async (req, res) => {
    let name = req.params.ProductName;
    if(!name) {
        return res.status(404).send({ "Message": "Product not found." });
    }
    const product = await Product.findOne({ "name": name });
    if(!product){
        return res.status(404).send({ "Message": "Product not found." });
    }
    await Product.findByIdAndRemove( product.id , (err) => {
        if(err) { return res.status(404).send({ "Message": "The product cannot be deleted." }); }
    });
    const stock = await Stock.findOne({ "_product": product.id });
    if(stock){ await Stock.findByIdAndRemove(stock.id); }
    
    return res.status(200).send({ "Message": "Product deleted successfully" });
}

module.exports.UpdatePrice = async (req, res) => {
    let name = req.params.ProductName, price = parseFloat(req.params.NewPrice, 10);
    const product = await Product.findOne({ "name": name });
    if(!name || !product || isNaN(price)) {
        return res.status(204).send({ "Message": "Product not found." });
    }
    if(!price){
        return res.status(204).send({ "Message": "New price not found." });
    }
    product.price = price;
    const UpdatedProduct = await product.save();
    if(UpdatedProduct){
        const log = new Log({
            //user:
            type: "Price",
            change: "Product changed: "+ product.name + " previous price: $" + product.price + " New price: $" + price
        });
        await log.save();
        return res.status(200).send(UpdatedProduct);
    } else {
        return res.status(204).send({ "Message": "Error saving product." });
    }
}

module.exports.GetProduct = async (req, res) => {
    const name = req.params.ProductName;
    if(!name){
        return res.status(404).send({ "Message": "Product not found." });
    }
    const product = await Product.findOne({ "name": name });
    if(!product){
        return res.status(404).send({ "Message": "Product not found." });
    }
    const stock = await Stock.findOne({ "_product": product.id });
    if(!stock){ return res.status(201).send(product); }
    else {
        let answer = {};
        answer["Product"] = product;
        answer["Stock"] = stock;
        return res.status(201).send(answer);
    }
}