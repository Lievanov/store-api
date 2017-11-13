const productController = require("../controllers/product.controller");
const requireLogin = require("../middlewares/requireLogin");
const requireAdmin = require("../middlewares/requireAdmin");
const requireUser = require("../middlewares/requireUser");
module.exports = app => {
    app.post("/product", requireLogin, requireAdmin, productController.NewProduct);
    
    app.get("/product", productController.AllProducts);
    
    app.get("/product/:ProductName", requireLogin, productController.GetProduct);
    
    app.delete("/product/:ProductName", requireLogin, requireAdmin, productController.DeleteProduct);
    
    app.patch("/product/:ProductName/:NewPrice", requireLogin, requireAdmin, productController.UpdatePrice);
}