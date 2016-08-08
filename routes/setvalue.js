var router = GLOBAL._EXPRESS_ROUTER;
var client = GLOBAL._REDIS_SERVER;

module.exports = setvalue = function(req, res, next){
    var type = req.params['type'];
    var key = req.params['key'];
    var value = req.params['value'];

    var errCallback = function(err,success){
        if(err) throw err;
        client.keys('*', function(err, keys){
            var sendkeys = require('./sendkeys')(res, keys, {});
            sendkeys(0);
        });
    };

    switch(type){
    case "rename":
        client.rename([key, value], errCallback);
        break;
    case "set":
        client.set(key, value, errCallback);
        break;
    }
};
