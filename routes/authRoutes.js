const passport = require("passport");

module.exports = app => {
    app.post('/signup', 
        passport.authenticate('local-signup'),
        (req, res, err) => {
            res.status(201).send(req.user);
        }
    );
    
    app.post('/login',
        (req, res, err) => {
            if(err) { 
                console.log("Error, no user found");
                res.send(404); 
                
            }
            res.send(200);
        }
    );
    
    app.get("/logout",
        (req, res) => {
            req.logout();
            req.send();
            (req, res) => {
                console.log("here");
                res.send(200);
            }
    });
    
}