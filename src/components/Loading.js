import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const Loading = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
      <CircularProgress />
    </Box>
  )
}

export default Loading
