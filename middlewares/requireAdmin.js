module.exports = (req, res, next) => {
    if(req.user.role != "Admin"){
        return res.status(401).send({ error: 'Access denied - Admin account required! ' });
    }
    next();
};