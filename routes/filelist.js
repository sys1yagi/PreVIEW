var fs = require("fs");

var u = require("underscore.string");

exports.handler = function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/json; charset=utf-8'});
    var source = "";
    fs.readdir("project", function(err, files){
        if(err){
            res.write(JSON.stringify({status:"error"}));
        }
        else{
            var filelist = [];
            for(var i = 0; i < files.length; i++){
                if(u.endsWith(files[i], ".re")){
                    filelist.push(files[i]);
                }
            }
            res.write(JSON.stringify({
                status:"ok",
                filelist:filelist
            }));
        }
        res.end();
    });
};
