var client = GLOBAL._REDIS_SLAVE;

module.exports = function(res, keys, values){
    var sendkeys = function(index){
        if(index == keys.length){
            res.end(JSON.stringify(values));
        }else{
            client.get(keys[index], function(err, reply){
                if(err){
                    index++;
                    sendkeys(index);
                }else{
                    if(reply){
                        values[keys[index]] = reply.toString();
                        index++;
                        sendkeys(index);
                    }else{
                        values[keys[index]] = "";
                        index++;
                        sendkeys(index);
                    }
                }
            });
        }
    };

    return sendkeys;
};
