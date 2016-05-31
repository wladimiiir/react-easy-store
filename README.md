## React Easy Store
React Store made easy.

### Motivation
Redux is cool, but I have never understood, why do I need to write so much boilerplate just to change (global) state, which would update my component with new data. With this store I have iterated to the store which API is simple, yet it does the job.

### Current Version
*0.1.8* - should be without issues, but I keep it still under development version as there are few things I would like to extend.

### Installation
```
npm install react-easy-store --save
```

### Usage
*Connecting with the store entries*

```connect = (Component as ReactComponent) => (storeProps as object) => (otherProps as object) => void```

Example
```
import store from 'react-easy-store'
import LoginComponent from './components/LoginComponent.js' //your whatever component connected to with store entries

const LoginContainer = store.connect(MyComponent)({
  loginUsername: "username"
})()
```
In this use case MyComponent will be injected with prop `loginUsername` which will equal to value from store with key `username`. So the key is your prop name and value is string which refers to key of an entry in the store.

You can use `otherProps` if you need to inject additional properties to your component:
```
const LoginContainer = store.connect(MyComponent)({
  loginUsername: "username"
})({
  login: (data) => doLogin(data),
  showPassword: true
})
```

*Updating the store state*
```setState = (newState as object) => void```

Example
```
import store from 'react-easy-store'
...
store.setState({
  username: "john.doe"
)};
```
This will automatically force render method of LogicContainer component and the view gets updated. This can be called from Redux-like actions or wherever else (depends on the choice of your architecture).

*Getting the store state*
```getState = (...stateKeys) => object```

Example
```
import store from 'react-easy-store'
...
const {username, errorMessage} = store.getState("username", "errorMessage");
```
`username` and `errorMessage` will be set to values of the store entries with the corresponding keys. Note, that in case of updating the store values, these won't be updated as `getState` only returns current state in the time of invocation. 

### Additional Notes
* library uses [react-stamp](https://github.com/stampit-org/react-stamp) under the hood and `connect` returns Stamp, so you can use the features of that concept, if you wish
* in case of finding a bug, do not hesitate to report it
