import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions } from '@mui/material'

const Question = (props) => {
  return (
    <Card sx={{ maxWidth: 345, margin: '1rem auto' }}>
      <CardActionArea>
        <CardMedia
          className='card-image'
          component='img'
          height='140'
          image='../assets/avatars/char1.svg'
          alt='username'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            Sarah Edo asks
          </Typography>
          <Typography variant='h6' color='text.secondary'>
            Would you rather?
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='primary'>
          View Pool
        </Button>
      </CardActions>
    </Card>
  )
}

export default Question
