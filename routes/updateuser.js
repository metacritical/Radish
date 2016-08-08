var db = GLOBAL._DB;
var bcrypt = require('bcrypt-nodejs');

module.exports = function(req, res){
    var session = req.session;
    var sessUser = session.username;
    var sessEmail = session.email;
    var params = req.body;
    var username = params.username;
    var pass = params.pass;
    var email = params.email;

    if(username !== sessUser){
        db.get("SELECT username, email from users where username =="+ username, function(err, rows){
            if(rows)
                res.send({error: "Usermame already used."});

        });
    }

    if(email !== sessEmail){
        db.get("SELECT email from users WHERE email ==" + email, function(err, rows){
            if(rows)
                res.send({error: "Email already used."});
        });
    }

    var update = db.prepare("UPDATE 'users' SET username=?, password=?, email=? where username =?");
    update.run(username, bcrypt.hashSync(pass), email, sessUser);
    update.finalize();
    console.log("User updated.");

    session.username = username;
    session.email = email;
    res.send({ username: username, email: email });
};
