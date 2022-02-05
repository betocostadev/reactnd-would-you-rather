import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { handleToggleNotify } from './notify'

export const SET_AUTHED_USER = 'SET_AUTHED_USER'

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id,
  }
}

export function handleLogUser(id) {
  return async (dispatch) => {
    try {
      dispatch(showLoading())
      await dispatch(setAuthedUser(id))
      if (id) {
        dispatch(
          handleToggleNotify({
            open: true,
            severity: 'info',
            message: `Welcome back ${id}!`,
          })
        )
      }
    } catch (error) {
      console.warn('error in user selection: ', error)
      dispatch(setAuthedUser(null))
      dispatch(
        handleToggleNotify({
          open: true,
          severity: 'error',
          message: `Error login in!`,
        })
      )
      throw new Error('Error login in')
    } finally {
      dispatch(hideLoading())
    }
  }
}
