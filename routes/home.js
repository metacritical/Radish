module.exports = function(request, response){
    response.render('home', {
        title: 'Welcome',
        username: request.session.username
    });
};
