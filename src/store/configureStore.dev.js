import { createStore, applyMiddleware, compose } from 'redux'
import * as thunk from 'redux-thunk'
import * as logger from 'redux-logger'
// import api from '../middleware/api'
import rootReducer from '../reducers'
import DevTools from '../containers/devTools'

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk.thunk, logger.createLogger()), //api, 
      DevTools.instrument()
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
