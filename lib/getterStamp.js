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

    var stamp = {};
    var addStampProp = function addStampProp(name) {
        if (name) {
            stamp["get" + (0, _utils.capitalize)(name)] = function () {
                return (0, _store.getState)(name);
            };
        }
    };

    args.forEach(addStampProp);

    return stamp;
};