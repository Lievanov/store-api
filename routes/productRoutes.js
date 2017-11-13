const productController = require("../controllers/product.controller");

module.exports = app => {
    app.post("/product", productController.NewProduct);
    
    app.get("/product", productController.AllProducts);
    
    app.get("/product/:ProductName", productController.GetProduct);
    
    app.delete("/product/:ProductName", productController.DeleteProduct);
    
    app.patch("/product/:ProductName/:NewPrice", productController.UpdatePrice);
}