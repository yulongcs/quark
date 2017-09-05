import { LOAD_PROJECTS_SUCCESS } from './constants'

export const changeProjects = () => ({
  type: LOAD_PROJECTS_SUCCESS,
  payload: [1, 2, 3]
})

export const loadProjects = () => ({
  type: LOAD_PROJECTS_SUCCESS,
  payload: [4, 5, 6]
})
