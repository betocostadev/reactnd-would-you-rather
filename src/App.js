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
      <div className='container'>
        <h1>App</h1>
        {loading && <p>Loading...</p>}
        {!loading && authedUser ? <Home /> : <Login />}
      </div>
    </Fragment>
  )
}

function mapStateToProps({ authedUser, questions }) {
  console.log(questions)
  console.log(Object.keys(questions))
  return {
    loading: !Object.keys(questions).length,
    authedUser,
  }
}

export default connect(mapStateToProps)(App)
