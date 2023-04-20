import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <Box height='100vh' sx={{ backgroundColor: '#def2fe' }} position='relative' zIndex='10000' display='flex' alignItems='center'>
      <Box width='700px' mx='auto'>
        <Typography fontWeight='100' color='#02abfb' fontSize='100px'>Hmm.</Typography>
        <Typography mt='20px' color='#02abfb'>It seems that you're looking for a page that does not exist.</Typography>
        <Typography mt='20px' color='#02abfb'>Let us guide you back to the home</Typography>
        <Box mt='40px'>
          <Link to='/'>Go Home</Link>
        </Box>
      </Box>
    </Box>
  )
}

export default PageNotFound
