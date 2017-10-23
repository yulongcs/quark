import { LOAD_TEST_SUCCESS } from './constants'

export const changeTest = () => ({
  type: LOAD_TEST_SUCCESS,
  payload: [11, 12, 13]
})

export const loadTest = () => ({
  type: LOAD_TEST_SUCCESS,
  payload: [14, 15, 16]
})
