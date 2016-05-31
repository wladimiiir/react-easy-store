import _connect from './storeComponentWrapper'
import {getState as _getState, setState as _setState} from './store'

const store = {
    connect: _connect,
    getState: _getState,
    setState: _setState
};

export default store;