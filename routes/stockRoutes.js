const stockController = require("../controllers/stock.controller");
const requireLogin = require("../middlewares/requireLogin");
const requireUser = require("../middlewares/requireUser");
const requireAdmin = require("../middlewares/requireAdmin");

module.exports = app => {
    //Body required (productName, quantity)
    app.post("/stock", requireLogin, requireAdmin, stockController.NewItemInStock);
    
    //Body required (productName, quantity)
    app.post("/stock/buy", requireLogin, requireUser, stockController.BuyProduct);
    
}