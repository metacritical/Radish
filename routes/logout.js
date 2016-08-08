module.exports = function(req, res){
    var session = req.session;
    session.isAuthenticated = null;
    session.cookie.originalMaxAge = null;
    res.render("login", {message: "Logged out successfully."});
};
