import { useState } from 'react'
import { connect } from 'react-redux'
import { handleLogUser } from '../store/actions/authedUser'
import { useLocation, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'

const pages = ['Home', 'New Question', 'Leader Board']

const Nav = ({ user, logout }) => {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = (event) => {
    setAnchorElNav(null)
  }

  const handleNavigate = (page) => {
    switch (page) {
      case 'Home':
        navigate('/')
        break
      case 'Leader Board':
        navigate('/leaderboard')
        break
      case 'New Question':
        navigate('/add')
        break
      default:
        break
    }
    handleCloseNavMenu()
  }

  const getFontWeight = (page) => {
    const { pathname } = location
    if (
      (page === 'Home' && pathname === '/') ||
      (page === 'Leader Board' && pathname === '/leaderboard') ||
      (page === 'New Question' && pathname === '/add')
    ) {
      return 700
    } else return 400
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            Would you rather?
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <span>Menu</span>
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleNavigate(page)}>
                  <Typography textAlign='center'>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            Would you rather?
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleNavigate(page)}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  fontWeight: getFontWeight(page),
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {user && (
            <Box sx={{ flexGrow: 0, display: 'flex' }}>
              <Typography
                variant='p'
                noWrap
                component='p'
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  alignSelf: 'center',
                }}
              >
                Hello, {user.name}
              </Typography>
              <Avatar alt={user.name} src={user.avatarURL} />
              <Button
                variant='outlined'
                style={{ color: '#fff6f6' }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    user: users ? users[authedUser] : null,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(handleLogUser(null)),
  }
}

Nav.propTypes = {
  authedUser: PropTypes.string,
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
