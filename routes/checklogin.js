module.exports = function(){
    return function(request, response, next){
        var session = request.session;

        if(request.method == 'POST'){
            return next();
        }

        if(session.isAuthenticated && session.isAuthenticated == true)
            return next();
        else if(session.isAuthenticated == null)
            response.render('login');
    };
};
