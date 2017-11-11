const passport = require("passport");
const mongoose = require("mongoose");
const Strategy = require('passport-local').Strategy;
const bcrypt = require("bcrypt-nodejs");
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use('local-signup', new Strategy(
    (username, password, done) => {
        User.findOne({'username': username }, async (err, user, res, req) => {
            if (err) { return done(err); }
            if (!user) { 
                const newUser = new User();
                newUser.username = username;
                newUser.password = newUser.generateHash(password);
                newUser.role = "User";
                try{
                    const user = await newUser.save();
                    return done(null, user);
                } catch (err) {
                    console.log("Error? try catch");
                    return done(null, false);
                }
            }
            if (user) { 
                console.log("already exist");
                return false; 
            }
        });
  }));


passport.use('local-login', new Strategy(
    (username, password, done) => {
        User.findOne({'username': username }, async (err, user, res, req) => {
            if (err) { return done(err); }
            if (!user) { 
                return done(null, false);
            }
            console.log("pw compare: "+bcrypt.compareSync(password, user.password));
            if (!bcrypt.compareSync(password, user.password)) { 
                done(null, false);
                return true;
            }
            return done(null, user);
        });
  }));
