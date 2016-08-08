var client = GLOBAL._REDIS_SERVER;
var device = GLOBAL._LOG_DEVICES;

module.exports = upload = function(req, res){
    var fs = require('fs');

    fs.readFile(req.files.form.path, {encoding: 'utf-8'}, function(err, data){
        var json = JSON.parse(data);
        var keys = Object.keys(json);

        var massAssign = function(index){
            if(index == keys.length){
                res.send(json);
            }else{
                client.set(keys[index], json[keys[index]], function(err, succ){
                    if(err) throw err;

                    // log the keys written to redis
                    for(var handle = 0; handle < device.length; handle++){
                        device[handle].write(keys[index]+" Added to redis.\n");
                    };
                    index++;
                    massAssign(index);
                });
            }
        };

        massAssign(0);
    });
};
