import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const LeaderBoard = (props) => {
  const { authedUser, users } = props
  console.log(users)
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

function mapStateToProps({ authedUser, users }) {
  const usersArr = Object.values({ ...users }).map((u) => ({
    id: u.id,
    name: u.name,
    avatar: u.avatarURL,
    totalQuestions: u.questions.length,
    totalAnswers: Object.values({ ...u.answers }).length,
    score: u.questions.length + Object.values({ ...u.answers }).length,
  }))

  return {
    authedUser,
    users: usersArr ? usersArr.sort((a, b) => b.score - a.score) : [],
  }
}

export default connect(mapStateToProps)(LeaderBoard)
