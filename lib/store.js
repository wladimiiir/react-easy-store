"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var store = {};

var nextListenerID = 1;
var globalListeners = {};

var getStoreEntity = function getStoreEntity(key) {
    if (!store[key]) {
        store[key] = {
            value: null,
            listeners: {}
        };
    }
    return store[key];
};

var fireValueChanged = function fireValueChanged(key, oldValue, newValue) {
    for (var id in globalListeners) {
        if (globalListeners.hasOwnProperty(id)) {
            globalListeners[id](oldValue, newValue);
        }
    }
    var listeners = getStoreEntity(key).listeners;
    for (var _id in listeners) {
        if (listeners.hasOwnProperty(_id)) {
            listeners[_id](oldValue, newValue);
        }
    }
};

var getState = exports.getState = function getState() {
    for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
        keys[_key] = arguments[_key];
    }

    var state = {};

    if (keys && keys.length > 0) {
        if (keys.length == 1) {
            return getStoreEntity(keys[0]).value;
        } else {
            keys.forEach(function (key) {
                return state[key] = getStoreEntity(key).value;
            });
        }
    } else {
        for (var key in store) {
            if (store.hasOwnProperty(key)) {
                state[key] = store[key].value;
            }
        }
    }

    return state;
};

var setState = exports.setState = function setState(partialState) {
    for (var key in partialState) {
        if (partialState.hasOwnProperty(key)) {
            var entity = getStoreEntity(key);
            var oldValue = entity.value;
            entity.value = partialState[key];

            fireValueChanged(key, oldValue, entity.value);
        }
    }
};

var registerListener = exports.registerListener = function registerListener(listener) {
    for (var _len2 = arguments.length, keys = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        keys[_key2 - 1] = arguments[_key2];
    }

    var listenerID = nextListenerID++;
    keys.forEach(function (key) {
        getStoreEntity(key).listeners[listenerID] = listener;
    });
    return listenerID;
};

var unregisterListener = exports.unregisterListener = function unregisterListener(listenerID) {
    if (globalListeners[listenerID]) {
        delete globalListeners[listenerID];
    }
    for (var key in store) {
        if (store.hasOwnProperty(key) && store[key].listeners[listenerID]) {
            delete store[key].listeners[listenerID];
        }
    }
};