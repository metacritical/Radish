module.exports = (function(){
    require('./global_inits');

    var express = GLOBAL._REQUIRE_EXPRESS;
    var app = GLOBAL._EXPRESS_APP;
    var config = GLOBAL._APP_CONFIG;

    //Initialize and use logger
    var logger = require('./teelogger');
    app.use(logger);

    //Sets favicon
    var favicon = require('serve-favicon');
    app.use(favicon('./assets/favicon.ico'));

    //Use jade as html rendering engine
    app.set('view engine', 'jade');

    //Serve Static Assets
    app.use('/assets', express.static('assets'));
    app.use('/', express.static('public'));

    //Listen on 3742
    app.listen(config.app.port, function(){
        console.log("\x1b[36mRadish Server started at port 3742\x1b[0m");
    });
}).call(this);
