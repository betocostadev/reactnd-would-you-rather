import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { handleAddVote } from '../store/actions/questions'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

import CardPoolOptions from '../components/CardPoolOptions'
import CardPoolResults from '../components/CardPoolResults'

const QuestionPage = ({ authedUser, questions, users, dispatch }) => {
  const { id } = useParams()
  const navigate = useNavigate()

  const question = questions ? questions[id] : null
  const author = question ? users[question.author] : null
  const answered = question
    ? question.optionOne.votes.find((u) => u === authedUser) ||
      question.optionTwo.votes.find((u) => u === authedUser)
      ? true
      : false
    : null

  const totalVotes = question
    ? question.optionOne.votes.length + question.optionTwo.votes.length
    : 0

  const [poolVal, setPoolVal] = useState('optionOne')
  const [q1percent, setq1Percent] = useState(0)
  const [q2percent, setq2Percent] = useState(0)

  useEffect(() => {
    if (!authedUser) navigate('/login')
    if (answered) {
      setTimeout(() => {
        setq1Percent(optionOneResult())
        setq2Percent(optionTwoResult())
      }, 750)
    }
  })

  const handleChange = (e) => {
    setPoolVal(e.target.value)
  }

  const handleVote = async () => {
    try {
      await dispatch(
        handleAddVote({ authedUser, qid: question.id, answer: poolVal })
      )
    } catch (error) {
      console.log(error)
    }
  }

  const optionOneResult = () => {
    const result =
      question.optionOne.votes.length / totalVotes >= 1
        ? 100
        : (question.optionOne.votes.length / totalVotes) * 100
    return result >= 100 ? result : result.toFixed(1)
  }

  const optionTwoResult = () => {
    const result =
      question.optionTwo.votes.length / totalVotes >= 1
        ? 100
        : (question.optionTwo.votes.length / totalVotes) * 100
    return result >= 100 ? result : result.toFixed(1)
  }

  if (!question) {
    return (
      <h3>Ops... Looks like this question doesn't exist, or it was deleted</h3>
    )
  }

  return (
    <Card sx={{ maxWidth: 345, margin: '0.75rem auto' }}>
      <CardMedia
        className='card-image'
        component='img'
        height='120'
        image={author.avatarURL}
        alt='username'
      />
      <CardContent>
        <Typography gutterBottom variant='h6' component='div'>
          {!answered ? `${author.name} asks:` : `Asked by ${author.name}`}
        </Typography>
        <Typography variant='h5' color='text.secondary'>
          {!answered ? 'Would you rather?' : 'Results:'}
        </Typography>
      </CardContent>

      {!answered ? (
        <CardPoolOptions
          poolVal={poolVal}
          optionOne={question.optionOne.text}
          optionTwo={question.optionTwo.text}
          handleChange={handleChange}
          handleVote={handleVote}
        />
      ) : (
        <CardPoolResults
          optionOne={question.optionOne}
          optionTwo={question.optionTwo}
          q1percent={q1percent}
          q2percent={q2percent}
          totalVotes={totalVotes}
        />
      )}
    </Card>
  )
}
function mapStateToProps({ authedUser, users, questions }) {
  return {
    authedUser,
    questions,
    users,
  }
}

export default connect(mapStateToProps)(QuestionPage)
