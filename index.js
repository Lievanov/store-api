const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("./config/keys");

require('./models/User');
require('./models/Product');
require('./models/Stock');

mongoose.connect(keys.mongoURI);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT);