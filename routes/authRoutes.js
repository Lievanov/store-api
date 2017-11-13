const passport = require("passport");

module.exports = app => {
    app.post('/signup', 
        passport.authenticate("local-signup", {failureFlash: true}),
        (req, res) => {
            res.status(201).send(req.user);
        }
    );
    
    app.post('/login',
        passport.authenticate("local-login"),
        (req, res) => {
            res.send(req.user);
        }
    );
    
    app.get('/logout', 
        (req, res) => {
            req.logout();
            res.send();
            (req, res) => {
                res.redirect('/');
            }
    });
    
}