import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions } from '@mui/material'

const Question = ({ question, author }) => {
  const navigate = useNavigate()

  const toQuestion = (e, id) => {
    e.preventDefault()
    navigate(`/questions/${id}`)
  }

  return (
    <Card sx={{ maxWidth: 345, margin: '0.75rem auto' }}>
      <CardActionArea onClick={(e) => toQuestion(e, question.id)}>
        <CardMedia
          className='card-image'
          component='img'
          height='120'
          image={author.avatarURL}
          alt='username'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {author.name} asks
          </Typography>
          <Typography variant='h6' color='text.secondary'>
            Would you rather?
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            ...{question.optionOne.text.substring(0, 25)}...
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size='small'
          color='primary'
          onClick={(e) => toQuestion(e, question.id)}
        >
          View Pool
        </Button>
      </CardActions>
    </Card>
  )
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id]
  const author = users[question.author]

  return {
    authedUser,
    question,
    author,
  }
}

Question.propTypes = {
  authedUser: PropTypes.string,
  question: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  author: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
}

export default connect(mapStateToProps)(Question)
