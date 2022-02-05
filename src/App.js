import { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading-bar'
import { Routes, Route, useNavigate } from 'react-router-dom'
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

const App = (props) => {
  const { dispatch, loading, authedUser, notify } = props
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(handleInitialData())
      if (!authedUser) navigate('/login')
    }
    fetchData()
  }, [authedUser, dispatch, navigate])

  const hideNotify = () => {
    dispatch(
      handleToggleNotify({
        open: false,
        severity: 'info',
        message: '',
      })
    )
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
            <Route path='/login' element={<Login />} />
            <Route path='/leaderboard' element={<LeaderBoard />} />
            <Route path='/add' element={<NewQuestion />} />
            <Route path='/question/:id' element={<QuestionPage />} />
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

export default connect(mapStateToProps)(App)
