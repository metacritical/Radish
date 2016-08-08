(function() {
    require('./lib/init');
    var app = GLOBAL._EXPRESS_APP;

    //Initialize and use routes
    var router = require('./routes/routes');
    router(app);
}).call(this);
