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

const App = (props) => {
  const { dispatch, loading, authedUser } = props
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(handleInitialData())
      if (!authedUser) navigate('/login')
    }
    fetchData()
  }, [authedUser, dispatch, navigate])

  return (
    <Fragment>
      <LoadingBar />
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

function mapStateToProps({ authedUser, questions }) {
  return {
    loading: !Object.keys(questions).length,
    authedUser,
  }
}

export default connect(mapStateToProps)(App)
