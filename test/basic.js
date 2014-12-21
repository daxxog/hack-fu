/* HackFu / test / basic.js
 * basic test
 * (c) 2014 David (daXXog) Volm ><> + + + <><
 * Released under Apache License, Version 2.0:
 * http://www.apache.org/licenses/LICENSE-2.0.html  
 */

var vows = require('vows'),
    assert = require('assert'),
    HackFu = require('../hack-fu.min.js');

vows.describe('basic').addBatch({
    'HackFu': {
        topic: function() {
        	return HackFu;
        },
        'is a function': function(HackFu) {
            assert.equal(typeof HackFu, 'function');
        },
        'returns a function': function(HackFu) {
            assert.equal(typeof HackFu(function() {}, function() {}), 'function');
        },
        'needs two function arguments': function(HackFu) {
            assert.equal(HackFu(), undefined);
            assert.equal(HackFu(function() {}), undefined);
            assert.equal(HackFu(function() {}, 'foo'), undefined);
        },
        'can hack Array.prototype.map': function() {
			var newMap = HackFu(Array.prototype.map, function(args) {
				args[0] = HackFu(args[0], function(x) {
					x[0]++;

					return x;
				});

				return args;
			});

        	assert.deepEqual(newMap.call([1,2,3,4], function(x) {
        		return x + 1;
        	}), [3,4,5,6]);
        }
    }
}).export(module);