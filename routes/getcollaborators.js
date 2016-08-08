var db = GLOBAL._DB;

module.exports = function(request, response){
    db.get("SELECT id, username, email, namespaces,role, status FROM 'users'",
           function(err, rows){
               if(err)
                   throw("Error Occurred: " + err);

               response.send(rows);
           });
};
