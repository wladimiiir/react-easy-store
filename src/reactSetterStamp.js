import {setState} from './store'
import {capitalize} from './utils'

export default (...args) => {
    const stampSpec = {};
    const addStoreSetter = name => {
        if (name) {
            stampSpec["set" + capitalize(name)] = value => setState(name, value);
        }
    };

    args.forEach(addStoreSetter);

    return stampSpec;
};
