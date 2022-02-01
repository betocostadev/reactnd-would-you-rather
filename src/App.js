import { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading-bar'
import { handleInitialData } from './store/actions/shared'
import Loading from './components/Loading'
import Nav from './components/Nav'
import Home from './pages/Home'
import Login from './pages/Login'

const App = (props) => {
  const { dispatch, loading, authedUser } = props

  useEffect(() => {
    dispatch(handleInitialData())
  })

  return (
    <Fragment>
      <LoadingBar />
      <Nav />
      <div className='container'>
        {loading ? <Loading /> : !loading && authedUser ? <Home /> : <Login />}
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
