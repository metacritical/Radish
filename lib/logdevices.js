module.exports = logger = (function(){
    var fs = require('fs');
    var path = require('path');
    var filename;

    if(process.env.ENV){
        filename = process.env.ENV.toString() + '.log';
    }else{
        process.env.ENV = 'development';
        filename = 'development.log';
    };

    var logfile = fs.createWriteStream(
        path.join(__dirname, '../logs/'+filename), {flags: 'a'}
    );

    //Tee logger
    var devices = [logfile, process.stdout];
    GLOBAL._LOG_DEVICES = devices;
}).call(this);
