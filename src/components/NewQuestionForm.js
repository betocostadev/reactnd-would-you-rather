import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const NewQuestionForm = ({
  optionOne,
  optionTwo,
  handleOptionOne,
  handleOptionTwo,
  handleSubmit,
}) => {
  return (
    <Box
      component='form'
      className='new-question-form-fields'
      sx={{
        '& .MuiTextField-root': {
          m: 1,
        },
      }}
      noValidate
      autoComplete='off'
    >
      <TextField
        fullWidth
        id='optionOne'
        label='Option One'
        value={optionOne}
        onChange={handleOptionOne}
      />
      <Typography
        textAlign={'center'}
        mt={2}
        mb={1}
        variant='h5'
        component='h5'
      >
        OR
      </Typography>
      <TextField
        fullWidth
        id='optionTwo'
        label='Option Two'
        value={optionTwo}
        onChange={handleOptionTwo}
      />

      <Button
        sx={{ margin: '2rem 1rem' }}
        disabled={optionOne.length < 5 || optionTwo.length < 5}
        variant='contained'
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  )
}

export default NewQuestionForm
