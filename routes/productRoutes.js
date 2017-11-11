//const productController = require("../controllers/product.controller");
const mongoose = require("mongoose");
const Product = mongoose.model('products');

module.exports = app => {
    app.post("/product",
        async (req, res) => {
            const { name, price } = req.body;
            
            if(name === "" || price < 0 ){
                return res.status(400).send({ "message": "Error creating a product."});
            } else {
                const product = new Product({
                    name, price
                });
                const newProduct = await product.save();
                return res.status(201).send(newProduct);
            }
        }
    );
    app.get("/product", 
        async (req, res) => {
            const products = await Product.find();
            return res.status(200).send(products);
        }
    );
}