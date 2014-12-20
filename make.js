/* HackFu / make.js
 * echo 'make script for HackFu' && node make
 * (c) 2014 David (daXXog) Volm ><> + + + <><
 * Released under Apache License, Version 2.0:
 * http://www.apache.org/licenses/LICENSE-2.0.html  
 */

var bitfactory = require('bitfactory'),
    UglifyJS = require("uglify-js"),
    stoptime = require('stoptime'),
    fs = require('fs');

var watch = stoptime(),
    header = '';

bitfactory.make({ //routes
    "": function(err, results) {
        console.log('built HackFu in ' + watch.elapsed() + 'ms.');
    }
}, { //dependencies
    "*": { //wildcard
        "header": function(cb) {
            fs.readFile('hack-fu.h', 'utf8', function(err, data) {
                header = data;
                cb(err);
            });
        },
        "hack-fu.min.js": ["header", function(cb) {
            fs.writeFileSync('hack-fu.min.js', header + UglifyJS.minify('hack-fu.js').code);
            cb();
        }],
        "cli.min.js": ["header", function(cb) {
            fs.writeFileSync('cli.min.js', header + UglifyJS.minify('cli.js').code);
            cb();
        }]
    }
});