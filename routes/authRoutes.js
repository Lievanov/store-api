const passport = require("passport");

module.exports = app => {
    //(Body Required: username, password, role)
    app.post('/signup', 
        passport.authenticate("local-signup"),
        (req, res) => {
            res.status(201).send(req.user);
        }
    );
    
    //(Body Required: username, password)
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