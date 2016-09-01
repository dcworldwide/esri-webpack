import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import * as createLogger from "redux-logger";
import api from '../middleware/api'
import rootReducer from '../reducers'
import DevTools from '../containers/devTools'
import { fetchPosts } from '../actions/reddit'
import { openEntity } from '../actions/entity'

export default function (initialState?: any) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, api, createLogger()),
      DevTools.instrument()
    )
  )

  //store.dispatch(fetchPosts('reactjs')).then(() => console.log(store.getState()))
  store.dispatch(openEntity(17896)).then(() => console.log(store.getState()))

  //      DevTools.instrument()
  // \      applyMiddleware(thunk, api, createLogger()),

  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('../reducers', () => {
  //     const nextRootReducer = require('../reducers').default
  //     store.replaceReducer(nextRootReducer)
  //   })
  // }

  return store
}

// export default configureStore



// // const configureStore = (process.env.NODE_ENV === 'production') ? require('./configureStore.prod') : require('./configureStore.dev')
// // export configureStore

// import { createStore, applyMiddleware, compose } from 'redux'
// import * as thunk from 'redux-thunk'
// import * as createLogger from 'redux-logger'
// // import api from '../middleware/api'
// import rootReducer from '../reducers'
// import DevTools from '../containers/devTools'

// export default function configureStore(preloadedState) {
//   const store = createStore(
//     rootReducer,
//     preloadedState,
//     compose(
//       applyMiddleware(thunk, createLogger()), //api, 
//       DevTools.instrument()
//     )
//   )

//   if (module.hot) {
//     // Enable Webpack hot module replacement for reducers
//     module.hot.accept('../reducers', () => {
//       const nextRootReducer = require('../reducers').default
//       store.replaceReducer(nextRootReducer)
//     })
//   }

//   return store
// }

