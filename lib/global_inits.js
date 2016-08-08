module.exports = global_inits = (function(){
    //Require Express
    var express = require('express');
    GLOBAL._REQUIRE_EXPRESS = express;

    //Initialize app
    var app = express();
    GLOBAL._EXPRESS_APP = app;

    //Initialize Router
    var router = express.Router();
    GLOBAL._EXPRESS_ROUTER = router;

    //Global App Config
    var config = require('../config/config.json');
    GLOBAL._APP_CONFIG = config;

    var redis = require('redis');
    GLOBAL._REQUIRE_REDIS = redis;
    GLOBAL._REDIS_SERVER = redis.createClient(
        config.redis.port, config.redis.url
    );
    GLOBAL._REDIS_SLAVE = redis.createClient(
        config.slave.port, config.slave.url
    );

    //Prints app logo in console.
    require('./logo');

    //Register Log Devices
    require('./logdevices');

    //Require Multer to handle multipart form data.
    var multer = require('multer');
    app.use(multer({dest: './uploads'}));

    //Using body-parser allows express to get data from POST requests
    var bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    //Create New Radish DB and Initialize DB Tables.
    var dbType = require(config.db.type).verbose();
    var db = new dbType.Database(config.db.name);
    require('../config/dbSchema')(db);
    GLOBAL._DB = db;

    //Require express session.
    var session = require('express-session');
    app.use(session({secret: 'littleexpresssessionsecret'}));

}).call(this);
