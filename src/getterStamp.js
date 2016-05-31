import {getState} from './store'
import {capitalize} from './utils'

export default (...args) => {
    const stamp = {};
    const addStampProp = name => {
        if (name) {
            stamp["get" + capitalize(name)] = () => getState(name);
        }
    };

    args.forEach(addStampProp);

    return stamp;
};

