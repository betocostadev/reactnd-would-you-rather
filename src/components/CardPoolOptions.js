import { Button, CardActions } from '@mui/material'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

const CardPoolOptions = ({
  poolVal,
  optionOne,
  optionTwo,
  handleChange,
  handleVote,
}) => {
  return (
    <CardActions style={{ display: 'flex', flexDirection: 'column' }}>
      <FormControl>
        <FormLabel id='radio-buttons-group-label'></FormLabel>
        <RadioGroup
          aria-labelledby='radio-buttons-group-label'
          defaultValue='optionOne'
          value={poolVal}
          onChange={handleChange}
          name='radio-buttons-group'
        >
          <FormControlLabel
            value='optionOne'
            control={<Radio />}
            label={optionOne}
          />
          <FormControlLabel
            value='optionTwo'
            control={<Radio />}
            label={optionTwo}
          />
        </RadioGroup>
      </FormControl>
      <Button
        size='large'
        variant='contained'
        color='primary'
        onClick={handleVote}
      >
        Submit
      </Button>
    </CardActions>
  )
}

export default CardPoolOptions
