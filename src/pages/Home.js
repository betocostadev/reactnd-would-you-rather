import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Question from '../components/Question'

const Home = ({ authedUser, answeredQuestions, unansweredQuestions }) => {
  const navigate = useNavigate()

  const [tab, setTab] = useState(0)

  const handleChange = (event, newValue) => {
    setTab(newValue)
  }

  useEffect(() => {
    if (!authedUser) {
      navigate('/login')
    }
  })

  return (
    <div>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs value={tab} onChange={handleChange} centered>
          <Tab label='Unanswered Questions' />
          <Tab label='Answered Questions' />
        </Tabs>

        {tab === 0 && unansweredQuestions.length > 0 ? (
          <ul className='questions-list'>
            {unansweredQuestions.map((id) => (
              <li key={id}>
                <Question id={id} />
              </li>
            ))}
          </ul>
        ) : tab === 0 && unansweredQuestions.length < 1 ? (
          <p style={{ textAlign: 'center' }}>
            Wow, you answered all questions!
          </p>
        ) : tab === 1 && answeredQuestions.length > 0 ? (
          <ul className='questions-list'>
            {answeredQuestions.map((id) => (
              <li key={id}>
                <Question id={id} />
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ textAlign: 'center' }}>
            You haven't answered any question, start now!
          </p>
        )}
      </Box>
    </div>
  )
}

function mapStateToProps({ authedUser, questions }) {
  const answeredQuestions = Object.keys(questions)
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    .filter(
      (q) =>
        questions[q].optionOne.votes.find((u) => u === authedUser) ||
        questions[q].optionTwo.votes.find((u) => u === authedUser)
    )

  const unansweredQuestions = Object.keys(questions)
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    .filter(
      (q) =>
        !questions[q].optionOne.votes.find((u) => u === authedUser) &&
        !questions[q].optionTwo.votes.find((u) => u === authedUser)
    )

  return {
    authedUser,
    answeredQuestions,
    unansweredQuestions,
  }
}

Home.propTypes = {
  authedUser: PropTypes.string,
  unansweredQuestions: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  ),
  answeredQuestions: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  ),
}

export default connect(mapStateToProps)(Home)
