var db = GLOBAL._DB;
var bcrypt = require('bcrypt-nodejs');

module.exports = function(req, res){
    res.send({
        username: req.session.username,
        email: req.session.email
    });
};
