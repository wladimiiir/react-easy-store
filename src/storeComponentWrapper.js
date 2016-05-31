import React from 'react'
import reactStamp from 'react-stamp'
import {registerListener, unregisterListener, getState} from './store'

export default (Component) => (stateProps) => (otherProps) => {
    const propNames = [];
    const keys = [];
    for (let propName in stateProps) {
        if (stateProps.hasOwnProperty(propName)) {
            propNames.push(propName);
            keys.push(stateProps[propName]);
        }
    }
    var listenerID;

    return reactStamp(React).compose(
        {
            componentDidMount() {
                const listen = () => {
                    this.forceUpdate();
                };

                listenerID = registerListener(listen, ...keys);
            },

            componentWillUnmount() {
                unregisterListener(listenerID);
            },

            render() {
                let props = {};
                if (keys.length == 1) {
                    props[propNames[0]] = getState(keys[0]);
                } else {
                    let state = getState(...keys);
                    for (var index = 0; index < keys.length; index++) {
                        props[propNames[index]] = state[keys[index]];
                    }
                }
                return <Component {...props} {...otherProps}/>;
            }
        }
    );
}
