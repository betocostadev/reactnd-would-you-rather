import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { handleAddNewQuestion } from '../store/actions/questions'

import Notify from '../components/Notify'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import NewQuestionForm from '../components/NewQuestionForm'

const NewQuestion = (props) => {
  const { authedUser, dispatch } = props
  const navigate = useNavigate()

  const [optionOne, setOptionOne] = useState('')
  const [optionTwo, setOptionTwo] = useState('')
  const [snackOpen, setSnackOpen] = useState(false)
  const [snackMessage, setSnackMessage] = useState('')
  const [snackType, setSnackType] = useState('success')

  useEffect(() => {
    if (!authedUser) navigate('/login')
  })

  const handleClose = () => {
    setSnackOpen(false)
    setSnackMessage('')
    setSnackType('success')
  }

  const handleOptionOne = (e) => {
    setOptionOne(e.target.value)
  }

  const handleOptionTwo = (e) => {
    setOptionTwo(e.target.value)
  }

  const handleSubmit = async () => {
    try {
      await dispatch(
        handleAddNewQuestion({
          optionOneText: optionOne,
          optionTwoText: optionTwo,
          author: authedUser,
        })
      )

      setSnackMessage('Question added Successfully!')
      setSnackType('success')
      setSnackOpen(true)

      setOptionOne('')
      setOptionTwo('')

      setTimeout(() => {
        navigate('/')
      }, 750)
    } catch (error) {
      setSnackMessage('Error adding your question, try again later.')
      setSnackType('error')
      setSnackOpen(true)
    }
  }

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: '100%',
            height: 500,
          },
        }}
      >
        <Paper elevation={3}>
          <Typography
            textAlign={'center'}
            mt={2}
            mb={1}
            variant='h4'
            component='h4'
          >
            Create New Question
          </Typography>
          <Divider variant='middle' component='div' />
          <div style={{ padding: '1rem' }}>
            <Typography mt={2} mb={1} variant='p' component='p'>
              Complete the question:
            </Typography>
            <Typography mt={2} mb={1} variant='h5' component='h5'>
              Would you rather...
            </Typography>
          </div>
          <NewQuestionForm
            optionOne={optionOne}
            optionTwo={optionTwo}
            handleOptionOne={handleOptionOne}
            handleOptionTwo={handleOptionTwo}
            handleSubmit={handleSubmit}
          />
        </Paper>
      </Box>
      <Notify
        open={snackOpen}
        message={snackMessage}
        handleClose={handleClose}
        type={snackType}
      />
    </div>
  )
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  }
}

export default connect(mapStateToProps)(NewQuestion)
