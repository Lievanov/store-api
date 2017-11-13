const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");

require('./models/User');
require('./models/Product');
require('./models/Stock');
require('./models/Log');
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: ["asdas5da46d546"]
    })
);

app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 3000;

require("./routes/authRoutes")(app);
require("./routes/productRoutes")(app);
require("./routes/stockRoutes")(app);
require("./routes/logRoutes")(app);

app.listen(PORT);