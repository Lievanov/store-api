const stockController = require("../controllers/stock.controller");

module.exports = app => {
    
    app.post("/stock/:ProductName/:Quantity", stockController.NewItemInStock);
    
    app.post("/stock/buy/:ProductName/:Quantity", stockController.BuyProduct);
}