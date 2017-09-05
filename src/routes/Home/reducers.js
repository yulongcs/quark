import * as types from './constants'

const initState = {
  loading: true,
  projects: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case types.LOAD_PROJECTS_REQUEST:
      return { ...state, loading: true }
    case types.LOAD_PROJECTS_SUCCESS:
      return { ...state, projects: action.payload, loading: false }
    case types.LOAD_PROJECTS_FAILURE:
      return { ...state, loading: true }
    default:
      return state
  }
}
