const mongoose = require("mongoose");
const Log = mongoose.model("logs");

module.exports.showLogs = async (req,res) => {
    const logs = await Log.find();
    return res.status(200).send(logs);
}