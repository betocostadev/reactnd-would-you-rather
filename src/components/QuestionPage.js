import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions } from '@mui/material'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import LinearProgress from '@mui/material/LinearProgress'

const QuestionPage = (props) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { authedUser, questions, users } = props
  const question = questions[id]
  const author = users[question.author]
  const answered =
    question.optionOne.votes.find((u) => u === authedUser) ||
    question.optionTwo.votes.find((u) => u === authedUser)
      ? true
      : false

  const totalVotes =
    question.optionOne.votes.length + question.optionTwo.votes.length

  const [poolVal, setPoolVal] = useState('a')
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

  const handleVote = () => {
    console.log(poolVal)
    console.log('handleVote')
  }

  const optionOneResult = (value) => {
    const result =
      totalVotes / question.optionOne.votes.length >= 1
        ? 100
        : (totalVotes / question.optionOne.votes.length) * 100
    console.log('result one', result)
    return result
  }
  const optionTwoResult = (value) => {
    const result =
      totalVotes / question.optionTwo.votes.length >= 1
        ? 100
        : (totalVotes / question.optionTwo.votes.length) * 100
    console.log('result two', result)
    return result
  }

  const LinearProgressWithLabel = (props) => {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant='determinate' {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant='body2' color='text.secondary'>{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
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
        <CardActions style={{ display: 'flex', flexDirection: 'column' }}>
          <FormControl>
            <FormLabel id='radio-buttons-group-label'></FormLabel>
            <RadioGroup
              aria-labelledby='radio-buttons-group-label'
              defaultValue='a'
              value={poolVal}
              onChange={handleChange}
              name='radio-buttons-group'
            >
              <FormControlLabel
                value='a'
                control={<Radio />}
                label={question.optionOne.text}
              />
              <FormControlLabel
                value='b'
                control={<Radio />}
                label={question.optionTwo.text}
              />
            </RadioGroup>
          </FormControl>
          <Button
            size='large'
            variant='contained'
            color='secondary'
            onClick={handleVote}
          >
            Submit
          </Button>
        </CardActions>
      ) : (
        <CardActionArea>
          <div className='card-results'>
            <div className='card-result'>
              <Typography variant='h6' color='text.secondary'>
                Would you rather {question.optionOne.text}
              </Typography>
              <div className='result-slider'>
                <Box sx={{ width: '100%' }}>
                  <LinearProgressWithLabel value={q1percent} />
                </Box>
              </div>
            </div>
            <div className='card-result'>
              <Typography variant='h6' color='text.secondary'>
                Would you rather {question.optionTwo.text}
              </Typography>
              <div className='result-slider'>
                <Box sx={{ width: '100%' }}>
                  <LinearProgressWithLabel value={q2percent} />
                </Box>
              </div>
            </div>
          </div>
        </CardActionArea>
      )}
    </Card>
  )
}
function mapStateToProps({ authedUser, users, questions }) {
  return {
    authedUser,
    questions,
    users,
    // tweet: tweet
    //   ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
    //   : null,
  }
}

export default connect(mapStateToProps)(QuestionPage)
