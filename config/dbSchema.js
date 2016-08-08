var bcrypt = require('bcrypt-nodejs');

module.exports = function(db){
    var checkAdmin = "SELECT username FROM users WHERE username == 'admin'";
    var insertUser = 'INSERT INTO "users" (username, password, email, status, role) values (?,?,?,?,?)';

    function seedTable(){
        db.get(checkAdmin, function(err,rows){
            if(rows == undefined || rows.username !== 'admin'){
                var stmt = db.prepare(insertUser);
                stmt.run("admin", bcrypt.hashSync("admin"), "pankaj.d@imaginea.com", 1,"admin");
                stmt.finalize();
                console.log("SQL Table 'users' Seeded.");
            }
        });
    }

    var tablesNames =  "SELECT name FROM sqlite_master WHERE tbl_name!='users' and tbl_name!='sqlite_sequence'";
    var createTable = 'CREATE TABLE "users" ("id" INTEGER PRIMARY KEY AUTOINCREMENT, "username" varchar(255),"password" varchar(60),"email" varchar(60), "namespaces" TEXT,"role" varchar(10), "status" INTEGER)';
    db.get(tablesNames, function(err, rows){
        if(err !== null) console.log(err);
        else if(rows === undefined){
            db.run(createTable, function(err){
                if(err !== null);
                else console.log("SQL Table 'users' Initialized.");
                seedTable();
            });
        }
    });
};
