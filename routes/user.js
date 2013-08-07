var qs = require('querystring');
var compile = require("../modules/compile").compile;

exports.compile = function (req, res) {
    compile.compile(req.body.source, function (src) {
        if (src !== null) {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.write(src);
            res.end();
        }
        else {
            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
            res.end();
        }
    });
};
