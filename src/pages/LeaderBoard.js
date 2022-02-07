import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import LeaderInfo from '../components/LeaderInfo'

const LeaderBoard = ({ authedUser, users }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!authedUser) navigate('/login')
  })

  return (
    <div>
      <ul>
        {users.map((u) => (
          <LeaderInfo key={u.id} leader={u} />
        ))}
      </ul>
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

LeaderBoard.propTypes = {
  authedUser: PropTypes.string,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default connect(mapStateToProps)(LeaderBoard)
