'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _storeComponentWrapper = require('./storeComponentWrapper');

var _storeComponentWrapper2 = _interopRequireDefault(_storeComponentWrapper);

var _store = require('./store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = {
    connect: _storeComponentWrapper2.default,
    getState: _store.getState,
    setState: _store.setState
};

exports.default = store;