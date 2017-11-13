const stockController = require("../controllers/stock.controller");
const requireLogin = require("../middlewares/requireLogin");
const requireUser = require("../middlewares/requireUser");

module.exports = app => {
    //Body required (productName, quantity)
    app.post("/stock", stockController.NewItemInStock);
    
    //Body required (productName, quantity)
    app.post("/stock/buy", requireLogin, requireUser, stockController.BuyProduct);
    
}