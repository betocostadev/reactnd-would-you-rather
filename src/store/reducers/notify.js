import { SET_TOGGLE_NOTIFY } from '../actions/notify'

export default function notify(
  state = { open: false, severity: 'info', message: '' },
  action
) {
  switch (action.type) {
    case SET_TOGGLE_NOTIFY:
      return {
        open: action.open,
        severity: action.severity,
        message: action.message,
      }

    default:
      return state
  }
}
