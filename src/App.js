import { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading-bar'
import { handleInitialData } from './store/actions/shared'
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
      <h1 className='header'>Would you rather?</h1>
      <div className='container'>
        {loading ? (
          <h2>Loading...</h2>
        ) : !loading && authedUser ? (
          <Home />
        ) : (
          <Login />
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
