import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Question from '../components/Question'

const Home = (props) => {
  const { authedUser, answeredQuestions, unansweredQuestions } = props

  const navigate = useNavigate()

  const [tab, setTab] = useState(0)

  const handleChange = (event, newValue) => {
    console.log(newValue)
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
          <p>Sorry, no questions without answer at the moment</p>
        ) : tab === 1 && answeredQuestions.length > 0 ? (
          <ul className='questions-list'>
            {answeredQuestions.map((id) => (
              <li key={id}>
                <Question id={id} />
              </li>
            ))}
          </ul>
        ) : (
          <p>Sorry, no answered questions at this moment.</p>
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
        questions[q].optionOne.votes.length ||
        questions[q].optionTwo.votes.length
    )

  const unansweredQuestions = Object.keys(questions)
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    .filter(
      (q) =>
        !questions[q].optionOne.votes.length &&
        !questions[q].optionTwo.votes.length
    )

  return {
    authedUser,
    answeredQuestions,
    unansweredQuestions,
  }
}

export default connect(mapStateToProps)(Home)
