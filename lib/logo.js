module.exports = (printLogo = function(index){
    var fs = require('fs');
    var arr = ['./lib/assets/leaves.ascii','./lib/assets/radish.ascii'];

    if(index  == arr.length){
        console.log("Environment: " + process.env.ENV);
        console.log("=> Ctrl-C to shutdown server");
    } else {
        fs.readFile(arr[index], {encoding: 'utf-8'}, function(err,data){
        var color = ['\n\x1b[32;1m', '\x1b[35;1m', '\x1b[0m'];
            if(err){
                console.log(err);
            } else {
                process.stdout.write(color[index] + data + color[2]);
                index++;
                printLogo(index);
            }
        });
    };
})(0);
