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
      dispatch(setAuthedUser(id))
    } catch (error) {
      console.warn('error in user selection: ', error)
      dispatch(setAuthedUser(null))
      alert('There was an error.')
    }
  }
}
