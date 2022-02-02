import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const NewQuestion = (props) => {
  const { authedUser } = props
  const navigate = useNavigate()

  useEffect(() => {
    if (!authedUser) navigate('/login')
  })

  return (
    <div>
      <h2>NewQuestion</h2>
    </div>
  )
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  }
}

export default connect(mapStateToProps)(NewQuestion)
