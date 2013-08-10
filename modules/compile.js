var fs = require("fs");
var exec = require('child_process').execFile;
var Compile = (function(){
    function Compile(){

    };
    var tmpFile = "tmp/index.re";
    var compiledFile = "index.html";
    Compile.prototype.compile = function(source, callback){
        fs.writeFileSync(tmpFile, source);
        exec("review/bin/review-compile", ["--target=html","--directory=tmp"], function (error, stdout, stderr) {
            if(stdout){
                console.log('stdout: ' + stdout);
            }
            if(stderr){
                console.log('stderr: ' + stderr);
            }
            if (error !== null) {
                console.log('Exec error: ' + error);
            }
            else{
                //
                var src = fs.readFileSync(compiledFile);
                callback(src.toString());
                return;
            }
            callback(null);
        });
    }

    return Compile;
})();

exports.compile = new Compile();
