// import * as ActionTypes from '../actions'
// import merge from 'lodash/merge'
// import paginate from './paginate'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import {REQUEST_POSTS, RECEIVE_POSTS} from '../actions/reddit'
import {OPEN_ENTITY_REQUEST, OPEN_ENTITY_SUCCESS} from '../actions/entity'

// Updates an entity cache in response to any action with response.entities.
// function entities(state = { users: {}, repos: {} }, action) {
//   if (action.response && action.response.entities) {
//     return merge({}, state, action.response.entities)
//   }

//   return state
// }

// // Updates error message to notify about the failed fetches.
// function errorMessage(state = null, action) {
//   const { type, error } = action

//   if (type === ActionTypes.RESET_ERROR_MESSAGE) {
//     return null
//   } else if (error) {
//     return action.error
//   }

//   return state
// }

// Updates the pagination data for different actions.
// const pagination = combineReducers({
//   starredByUser: paginate({
//     mapActionToKey: action => action.login,
//     types: [
//       ActionTypes.STARRED_REQUEST,
//       ActionTypes.STARRED_SUCCESS,
//       ActionTypes.STARRED_FAILURE
//     ]
//   }),
//   stargazersByRepo: paginate({
//     mapActionToKey: action => action.fullName,
//     types: [
//       ActionTypes.STARGAZERS_REQUEST,
//       ActionTypes.STARGAZERS_SUCCESS,
//       ActionTypes.STARGAZERS_FAILURE
//     ]
//   })
// })

function posts(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case REQUEST_POSTS:
      return (<any>Object).assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POSTS:
      return (<any>Object).assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function postsBySubreddit(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return (<any>Object).assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action)
      })
    default:
      return state
  }
}


function entity(state = {
  isFetching: false,
  didInvalidate: false,
  data: undefined
}, action) {
  switch (action.type) {
    case OPEN_ENTITY_REQUEST:
      return (<any>Object).assign({}, state, {
          isFetching: true,
          didInvalidate: false
        })
    case OPEN_ENTITY_SUCCESS:
      return (<any>Object).assign({}, state, {
          isFetching: false,
          didInvalidate: false,
          data: action.data,
          lastUpdated: action.receivedAt
        })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  // entities,
  // pagination,
  // errorMessage,
  routing,
  entity,
  // postsBySubreddit
})

export default rootReducer
