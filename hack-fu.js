/* HackFu
 * JavaScript function hacking and injection library
 * (c) 2014 David (daXXog) Volm ><> + + + <><
 * Released under Apache License, Version 2.0:
 * http://www.apache.org/licenses/LICENSE-2.0.html  
 */

/* UMD LOADER: https://github.com/umdjs/umd/blob/master/returnExports.js */
(function (root, factory) {
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals (root is window)
        root.HackFu = factory();
  }
}(this, function() {
    var HackFu;

    HackFu = function(parent, child) {
        var isFu = HackFu.ObjectToArray(arguments).map(function(x) { //magic validator
            return typeof x;
        }).join('') === 'functionfunction';

        if(isFu) {
            return function() {
                return parent.apply(this, child(HackFu.ObjectToArray(arguments)));
            };
        } else {
            return;
        }
    };

    HackFu.ObjectToArray = function(o) {
        return Array.prototype.map.call(o, function(x) {
            return x;
        });
    };

    return HackFu;
}));
