import * as types from './actionTypes'
import firebaseService from '../../../services/firebase'

export const loadProjects = () => {
  return dispatch => new Promise((resolve, reject) => {
    dispatch(projectListLoading())

    firebaseService.database().ref("projects")
      .on('value', snapshot => {

        var projects
        var val = snapshot.val()
        if (val) {
          projects = Object.keys(val).map(key => {
            var project = val[key]
            project.key = key
            return project
          })
        } else {
          projects = []
        }

        resolve()
        dispatch(projectListSuccess(projects))
      }, error => {
        reject(error)
        dispatch(projectListFailure(error))
      })
  })
}

export const projectListLoading = () => ({
  type: types.PROJECT_LIST_LOADING
})

export const projectListSuccess = projects => ({
  type: types.PROJECT_LIST_SUCCESS,
  projects: projects
})

export const projectListFailure = error => ({
  type: types.PROJECT_LIST_FAILURE,
  error: error
})
