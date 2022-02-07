import { Fragment, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading-bar'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { handleInitialData } from './store/actions/shared'

import Loading from './components/Loading'
import Nav from './components/Nav'
import Login from './pages/Login'
import Home from './pages/Home'
import LeaderBoard from './pages/LeaderBoard'
import NewQuestion from './pages/NewQuestion'
import QuestionPage from './pages/QuestionPage'
import { handleToggleNotify } from './store/actions/notify'
import Notify from './components/Notify'
import NotFound from './pages/Notfound'

const App = (props) => {
  const { loading, authedUser, notify, getData, hide } = props
  const navigate = useNavigate()
  const location = useLocation()
  let redirectTo = useRef(null)

  useEffect(() => {
    getData()

    if (!authedUser) {
      if (location.pathname !== '/login' && location.pathname !== '/') {
        redirectTo.current = location.pathname
      }
      navigate('/login')
    }
  }, [authedUser, getData, navigate, location.pathname])

  const hideNotify = () => {
    hide()
  }

  return (
    <Fragment>
      <LoadingBar />
      <Notify
        open={notify.open}
        severity={notify.severity}
        message={notify.message}
        handleClose={hideNotify}
      />
      <Nav />
      <div className='container'>
        {loading ? (
          <Loading />
        ) : (
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login redirectTo={redirectTo} />} />
            <Route path='/leaderboard' element={<LeaderBoard />} />
            <Route path='/add' element={<NewQuestion />} />
            <Route path='/questions/:id' element={<QuestionPage />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        )}
      </div>
    </Fragment>
  )
}

function mapStateToProps({ authedUser, questions, notify }) {
  return {
    loading: !Object.keys(questions).length,
    authedUser,
    notify,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getData: async () => await dispatch(handleInitialData()),
    hide: () =>
      dispatch(
        handleToggleNotify({
          open: false,
          severity: 'info',
          message: '',
        })
      ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
