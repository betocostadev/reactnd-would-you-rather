import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const LeaderBoard = (props) => {
  const { authedUser } = props
  const navigate = useNavigate()

  useEffect(() => {
    if (!authedUser) navigate('/login')
  })

  return (
    <div>
      <h2>LeaderBoard</h2>
    </div>
  )
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  }
}

export default connect(mapStateToProps)(LeaderBoard)
