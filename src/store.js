const store = {};

var nextListenerID = 1;
const globalListeners = {};

const getStoreEntity = (key) => {
    if (!store[key]) {
        store[key] = {
            value: null,
            listeners: {}
        };

    }
    return store[key];
};

const fireValueChanged = (key, oldValue, newValue) => {
    for (let id in globalListeners) {
        if (globalListeners.hasOwnProperty(id)) {
            globalListeners[id](oldValue, newValue);
        }
    }
    const listeners = getStoreEntity(key).listeners;
    for (let id in listeners) {
        if (listeners.hasOwnProperty(id)) {
            listeners[id](oldValue, newValue);
        }
    }
};

export const getState = (...keys) => {
    const state = {};

    if (keys && keys.length > 0) {
        if (keys.length == 1) {
            return getStoreEntity(keys[0]).value;
        } else {
            keys.forEach(key => state[key] = getStoreEntity(key).value);
        }
    } else {
        for (let key in store) {
            if (store.hasOwnProperty(key)) {
                state[key] = store[key].value;
            }
        }
    }

    return state;
};

export const setState = (partialState) => {
    for (let key in partialState) {
        if (partialState.hasOwnProperty(key)) {
            const entity = getStoreEntity(key);
            const oldValue = entity.value;
            entity.value = partialState[key];

            fireValueChanged(key, oldValue, entity.value);
        }
    }
};

export const registerListener = (listener, ...keys) => {
    const listenerID = nextListenerID++;
    keys.forEach(key => {
        getStoreEntity(key).listeners[listenerID] = listener;
    });
    return listenerID;
};

export const unregisterListener = (listenerID) => {
    if (globalListeners[listenerID]) {
        delete globalListeners[listenerID];
    }
    for (let key in store) {
        if (store.hasOwnProperty(key) && store[key].listeners[listenerID]) {
            delete store[key].listeners[listenerID];
        }
    }
};

