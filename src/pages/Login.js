import { useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'

import { handleLogUser } from '../store/actions/authedUser'

const Login = ({ users, dispatch, redirectTo }) => {
  const [user, setUser] = useState('')
  const navigate = useNavigate()

  const handleChange = (event) => {
    setUser(event.target.value)
  }

  const handleLogin = () => {
    dispatch(handleLogUser(user))
    if (redirectTo.current) {
      const redirect = redirectTo.current
      redirectTo.current = null
      navigate(redirect)
    } else navigate('/')
  }

  return (
    <div>
      <h2>Login</h2>
      <p>Please select your user to start using this App</p>
      {users.length > 0 && (
        <div>
          <Box sx={{ minWidth: 120 }}>
            <FormControl
              margin='dense'
              size='medium'
              className='login-selector'
            >
              <InputLabel id='select-user-label'>Select User</InputLabel>
              <Select
                labelId='select-user-label'
                id='select-user'
                value={user}
                label='Age'
                onChange={handleChange}
              >
                {users.map((u) => (
                  <MenuItem key={u.id} value={u.id}>
                    <img
                      className='avatar-selector-img'
                      src={u.avatar}
                      alt={u.name}
                    />
                    {u.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <div>
            <Button
              variant='contained'
              disabled={!user.length}
              onClick={handleLogin}
            >
              Log in!
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

function mapStateToProps({ users }) {
  const usersArr = Object.values({ ...users })

  return {
    users: usersArr
      ? usersArr.map((u) => ({ id: u.id, name: u.name, avatar: u.avatarURL }))
      : [],
  }
}

Login.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default connect(mapStateToProps)(Login)
