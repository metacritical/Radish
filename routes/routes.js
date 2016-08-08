module.exports = function(app){
    var checkLogin = require('./checklogin');

    var login = require('./login');
    app.use("/login", checkLogin(), login);

    var logout = require('./logout');
    app.get("/logout", logout);

    var getuserdata = require('./getuserdata');
    app.use("/get/userdata", getuserdata);

    var getcollaborators = require('./getcollaborators');
    app.use("/get/collaborators", getcollaborators);

    var updateuser = require('./updateuser');
    app.use("/update/user", updateuser);

    var getvalue = require('./getvalue');
    app.use("/get", getvalue);

    var setvalue = require('./setvalue');
    app.use("/:type/:key/:value", setvalue);

    var download = require('./download');
    app.use("/download", download);

    var upload = require('./upload');
    app.post("/upload", upload);

    app.get("/forgot", function(req,res){
        res.render('password_reset');
    });

    var home = require('./home');
    app.use("/", checkLogin(), home);
};
