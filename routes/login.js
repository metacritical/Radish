var db = GLOBAL._DB;
var bcrypt = require('bcrypt-nodejs');
var home = require('./home');

module.exports = function(request,response, next){
    if(request.method == 'POST'){
        var params = request.body;
        var username = params.username;
        var password = params.password;
        var getUser = "SELECT username, email, password, " +
                "role FROM users where username ==";
        var session = request.session;

        db.get(getUser + "'" + username + "'", function(err, rows){
            if( rows && bcrypt.compareSync(password, rows.password) ){
                session.isAuthenticated = true;
                session.username = username;
                session.email = rows.email;
                session.role = rows.role;

                if(params["remember"]){
                    session.cookie.originalMaxAge = 2628000000;
                }

                home(request, response);
            }else{
                response.render("login", {
                    message: "Incorrect user submission."
                });
            };
        });
    }else home(request, response);
};
