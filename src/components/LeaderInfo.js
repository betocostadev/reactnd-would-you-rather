import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'

const LeaderInfo = ({ leader }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: '100%',
        },
      }}
    >
      <Paper className='leader-paper' elevation={3}>
        <div style={{ flex: 1 }}>
          <Stack direction='row' spacing={2}>
            <Avatar
              sx={{ width: '100%', height: '100%' }}
              alt={leader.name}
              src={leader.avatar}
            />
          </Stack>
        </div>
        <div style={{ padding: '1rem', flex: 2 }}>
          <Typography
            textAlign={'center'}
            mt={2}
            mb={1}
            variant='h4'
            component='h4'
          >
            {leader.name}
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography mt={2} mb={1} variant='h6' component='p'>
              Answered questions
            </Typography>
            <Typography mt={2} mb={1} variant='h6' component='p'>
              {leader.totalAnswers}
            </Typography>
          </div>
          <Divider variant='middle' component='div' />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography mt={2} mb={1} variant='h6' component='p'>
              Created questions
            </Typography>
            <Typography mt={2} mb={1} variant='h6' component='p'>
              {leader.totalQuestions}
            </Typography>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <Card
            sx={{ minWidth: 200, height: '90%', margin: '0.5rem' }}
            className='score-card'
          >
            <CardContent>
              <Typography variant='h5' component='div'>
                Score
              </Typography>
              <Typography
                className='leader-score'
                sx={{ mb: 1.5 }}
                variant='h4'
                component='h4'
              >
                {leader.score}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Paper>
    </Box>
  )
}

LeaderInfo.propTypes = {
  leader: PropTypes.object.isRequired,
}

export default LeaderInfo
