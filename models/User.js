const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs")
const Schema = mongoose.Schema;
const productSchema = require("./Product");

const userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    role: { type: String, default: "user" },
    product: [productSchema]
});

userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validPassword = (password) => {
    console.log(this.password + " " + password);
    return bcrypt.compareSync(password, this.password);
}

mongoose.model('users', userSchema);