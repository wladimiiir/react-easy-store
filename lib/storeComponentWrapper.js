'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactStamp = require('react-stamp');

var _reactStamp2 = _interopRequireDefault(_reactStamp);

var _store = require('./store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (Component) {
    return function (stateProps) {
        return function (otherProps) {
            var propNames = [];
            var keys = [];
            for (var propName in stateProps) {
                if (stateProps.hasOwnProperty(propName)) {
                    propNames.push(propName);
                    keys.push(stateProps[propName]);
                }
            }
            var listenerID;

            return (0, _reactStamp2.default)(_react2.default).compose({
                componentDidMount: function componentDidMount() {
                    var _this = this;

                    var listen = function listen() {
                        _this.forceUpdate();
                    };

                    listenerID = _store.registerListener.apply(undefined, [listen].concat(keys));
                },
                componentWillUnmount: function componentWillUnmount() {
                    (0, _store.unregisterListener)(listenerID);
                },
                render: function render() {
                    var props = {};
                    if (keys.length == 1) {
                        props[propNames[0]] = (0, _store.getState)(keys[0]);
                    } else {
                        var state = _store.getState.apply(undefined, keys);
                        for (var index = 0; index < keys.length; index++) {
                            props[propNames[index]] = state[keys[index]];
                        }
                    }
                    return _react2.default.createElement(Component, _extends({}, props, otherProps));
                }
            });
        };
    };
};