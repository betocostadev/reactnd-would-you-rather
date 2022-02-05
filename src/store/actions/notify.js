export const SET_TOGGLE_NOTIFY = 'SET_TOGGLE_NOTIFY'

export function setToggleNotify({ open, severity, message }) {
  return {
    type: SET_TOGGLE_NOTIFY,
    open,
    severity,
    message,
  }
}

export function handleToggleNotify(info) {
  return (dispatch) => {
    dispatch(setToggleNotify(info))
  }
}
