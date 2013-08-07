var fs = require("fs");
exports.index = function (req, res) {
    var source = "";
    try{
        source = fs.readFileSync("tmp/index.re");
    }catch(e){
        console.log(e);
    }
    res.render('index', {
        title: 'PreVIEW'
        ,source: source.toString()
    });
};
