'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _store = require('./store');

var _utils = require('./utils');

exports.default = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    var stampSpec = {};
    var addStoreSetter = function addStoreSetter(name) {
        if (name) {
            stampSpec["set" + (0, _utils.capitalize)(name)] = function (value) {
                return (0, _store.setState)(name, value);
            };
        }
    };

    args.forEach(addStoreSetter);

    return stampSpec;
};