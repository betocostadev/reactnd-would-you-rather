import { useState } from 'react'
import { connect } from 'react-redux'
import { handleLogUser } from '../store/actions/authedUser'
import { useLocation, useNavigate } from 'react-router-dom'

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

const Nav = (props) => {
  const { user, dispatch } = props
  const [anchorElNav, setAnchorElNav] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  const handleOpenNavMenu = (event) => {
    // console.log(event)
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = (event) => {
    setAnchorElNav(null)
    // console.log(event.target.value)
  }

  const handleNavigate = (page) => {
    switch (page) {
      case 'Home':
        navigate('/')
        break
      case 'Leader Board':
        navigate('/leader-board')
        break
      case 'New Question':
        navigate('/new-question')
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
      (page === 'Leader Board' && pathname === '/leader-board') ||
      (page === 'New Question' && pathname === '/new-question')
    ) {
      return 700
    } else return 400
  }

  const handleLogout = () => {
    dispatch(handleLogUser(null))
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
                {/* className={getNavClassName(page)} */}
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

export default connect(mapStateToProps)(Nav)
