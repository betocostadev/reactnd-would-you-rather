import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions } from '@mui/material'

const Question = (props) => {
  const { question, author } = props
  const navigate = useNavigate()

  const toQuestion = (e, id) => {
    e.preventDefault()
    navigate(`/question/${id}`)
  }

  return (
    <Card sx={{ maxWidth: 345, margin: '0.75rem auto' }}>
      <CardActionArea>
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
  // const parentTweet = tweet ? tweets[tweet.replyingTo] : null

  return {
    authedUser,
    question,
    author,
    // tweet: tweet
    //   ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
    //   : null,
  }
}

export default connect(mapStateToProps)(Question)
