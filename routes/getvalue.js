var router = GLOBAL._EXPRESS_ROUTER;
var client = GLOBAL._REDIS_SLAVE;

router.get("/:key", function(req, res){
    var key;
    switch(req.params['key']){
    case "all":
        key = "*";
        break;
    default:
        key = req.params['key'];
    }

    client.keys(key,function(err, keys){
        var sendkeys = require('./sendkeys')(res, keys, {});
        sendkeys(0);
    });
});

module.exports = router;
