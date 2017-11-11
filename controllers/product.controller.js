const mongoose = require("mongoose");
const Product = mongoose.model('products');

module.exports.NewProduct = async (req, res) => {
    console.log("what is on req: " + req.body);
    const { name, price } = req.body;
    if(name === "" || price < 0 ){
        res.status(400).send({ "message": "Error creating a product."});
    }
    const product = new Product({
        name, price
    });
    const newProduct = await product.save();
    res.status(201).send(newProduct);
    
}