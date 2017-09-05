import { combineReducers } from 'redux'

const initState = {
  name: 'react_cli',
  version: '0.1.0'
}

const version = (state = initState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default function createReducer(asyncReducers) {
  return combineReducers({
    version,
    ...asyncReducers
  })
}
