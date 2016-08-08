module.exports = (function() {
    var device = GLOBAL._LOG_DEVICES;

    return function(req, res, next) {
        var startTime = +new Date();

        res.on('finish', function(){
            var duration = +new Date() - startTime;
            var output = "\nStarted " + req.method + " " + req._parsedUrl.path + " for " +
                    req.ip + " at " + new Date() + " finished in " + duration +
                    " ms." + "\n";
            for(var handle = 0; handle < device.length; handle++){
                device[handle].write(output);
            };
        });
        next();
    };
}).call(this);
