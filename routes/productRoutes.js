const productController = require("../controllers/product.controller");
const requireLogin = require("../middlewares/requireLogin");
const requireAdmin = require("../middlewares/requireAdmin");

module.exports = app => {
    
    //Body required (name, price)
    app.post("/product", requireLogin, requireAdmin, productController.NewProduct);
    
    app.get("/products", productController.AllProducts);
    
    app.get("/product/:ProductName", productController.GetProduct);
    
    app.delete("/product/:ProductName", requireLogin, requireAdmin, productController.DeleteProduct);
    
    //Body required (productName, newPrice)
    app.patch("/product", requireLogin, requireAdmin, productController.UpdatePrice);
    
    app.post("/product/like/:ProductName", requireLogin, productController.Like);
    
}