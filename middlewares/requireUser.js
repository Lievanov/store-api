module.exports = (req, res, next) => {
    if(req.user.role != "User"){
        return res.status(401).send({ error: 'Access denied - Normal account required!' });
    }
    next();
};