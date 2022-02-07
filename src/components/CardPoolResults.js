import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'
import Chip from '@mui/material/Chip'

const CardPoolResults = ({
  optionOne,
  optionTwo,
  q1percent,
  q2percent,
  totalVotes,
  authedUser,
}) => {
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
    <div className='card-results'>
      <CardActionArea>
        <div
          className={
            optionOne.votes.includes(authedUser)
              ? 'card-result card-result-active'
              : 'card-result'
          }
        >
          {optionOne.votes.includes(authedUser) && (
            <Chip className='result-chip' label='Your vote' color='success' />
          )}
          <Typography variant='h6' color='text.secondary'>
            Would you rather {optionOne.text}
          </Typography>
          <div className='result-slider'>
            <Box sx={{ width: '100%' }}>
              <LinearProgressWithLabel value={Number(q1percent)} />
            </Box>
          </div>
          <Typography variant='p' color='text.secondary'>
            {optionOne.votes.length} out of {totalVotes} votes
          </Typography>
        </div>
      </CardActionArea>
      <CardActionArea>
        <div
          className={
            optionTwo.votes.includes(authedUser)
              ? 'card-result card-result-active'
              : 'card-result'
          }
        >
          {optionTwo.votes.includes(authedUser) && (
            <Chip className='result-chip' label='Your vote' color='success' />
          )}
          <Typography variant='h6' color='text.secondary'>
            Would you rather {optionTwo.text}
          </Typography>
          <div className='result-slider'>
            <Box sx={{ width: '100%' }}>
              <LinearProgressWithLabel value={Number(q2percent)} />
            </Box>
          </div>
          <Typography variant='p' color='text.secondary'>
            {optionTwo.votes.length} out of {totalVotes} votes
          </Typography>
        </div>
      </CardActionArea>
    </div>
  )
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  }
}

CardPoolResults.propTypes = {
  optionOne: PropTypes.object.isRequired,
  optionTwo: PropTypes.object.isRequired,
  q1percent: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  q2percent: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  totalVotes: PropTypes.number.isRequired,
  authedUser: PropTypes.string.isRequired,
}

export default connect(mapStateToProps)(CardPoolResults)
