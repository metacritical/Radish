var client = GLOBAL._REDIS_SLAVE;

module.exports = download = function(req, res, next){
    res.setHeader('Content-disposition', 'attachment; filename=backup.json');
    res.setHeader('Content-type', 'text/json');

    client.keys('*',function(err, keys){
        var sendkeys = require('./sendkeys')(res, keys, {});
        sendkeys(0);
    });
};
