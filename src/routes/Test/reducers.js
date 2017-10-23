import * as types from './constants'

const initState = {
  loading: true,
  test: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case types.LOAD_TEST_REQUEST:
      return { ...state, loading: true }
    case types.LOAD_TEST_SUCCESS:
      return { ...state, test: action.payload, loading: false }
    case types.LOAD_TEST_FAILURE:
      return { ...state, loading: true }
    default:
      return state
  }
}
