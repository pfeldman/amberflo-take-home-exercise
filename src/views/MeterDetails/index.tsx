import { Box, Button, DialogContent, Stack } from '@mui/material'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Title from '@/views/MetersDashboard/components/Title'
import { useMeters } from '@/hooks/useMeters'
import { useNavigate, useParams } from 'react-router-dom'
import PageNotFound from '@/views/404'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Snackbar from '@mui/material/Snackbar'
import moment from 'moment'
import { useEffect, useState } from 'react'

const MeterDetails = () => {
  const { meterId } = useParams()
  const { data, isFetching, deleteMeter, errorDeleting, errorEditing } = useMeters()
  const [errorVisible, setErrorVisible] = useState(false)


  useEffect(() => {
    if (errorDeleting || errorEditing) {
      setErrorVisible(true)
    }
  }, [errorDeleting, errorEditing])

  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false)

  const meter = data?.find(meter => meter.id === meterId)

  const navigate = useNavigate()

  if (!isFetching && !meter) return <PageNotFound />

  if (isFetching) return (
    <Box display='flex' justifyContent='center' width='100%'>
      <CircularProgress />
    </Box>
  )

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Title>Meter Details</Title>
              <Grid
                direction='column'
                spacing='10px'
              >
                <Grid direction='row'>
                  <Typography component='label' fontWeight='bold'>Meter Name:</Typography>
                  <Typography component='label' ml='5px'>{meter?.display_name}</Typography>
                </Grid>
                <Grid direction='row'>
                  <Typography component='label' fontWeight='bold'>Meter API Name:</Typography>
                  <Typography component='label' ml='5px'>{meter?.api_name}</Typography>
                </Grid>
                <Grid direction='row'>
                  <Typography component='label' fontWeight='bold'>Meter ID:</Typography>
                  <Typography component='label' ml='5px'>{meter?.id}</Typography>
                </Grid>
                <Grid direction='row'>
                  <Typography component='label' fontWeight='bold'>Is Active:</Typography>
                  <Typography component='label' ml='5px'>{meter?.active ? 'Yes' : 'No'}</Typography>
                </Grid>
                <Grid direction='row'>
                  <Typography component='label' fontWeight='bold'>Is For Billing:</Typography>
                  <Typography component='label' ml='5px'>{meter?.used_for_billing ? 'Yes' : 'No'}</Typography>
                </Grid>
                <Grid direction='row'>
                  <Typography component='label' fontWeight='bold'>Created:</Typography>
                  <Typography component='label' ml='5px'>{moment(meter?.created_time ?? '').format('MM/DD/YYYY hh:mm a')}</Typography>
                </Grid>
                <Grid direction='row'>
                  <Typography component='label' fontWeight='bold'>Last Update:</Typography>
                  <Typography component='label' ml='5px'>{moment(meter?.updated_time ?? '').format('MM/DD/YYYY hh:mm a')}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Container>
          <Stack direction='row' spacing='10px' justifyContent='flex-end' maxWidth='1200px' mx='auto' pr='24px'>
            <Button onClick={() => navigate('/')}>Go Back</Button>
            <Button onClick={() => navigate(`/edit/${meterId}`)} variant='contained'>Edit</Button>
            <Button onClick={() => setConfirmDeleteVisible(true)} variant='outlined'>Delete</Button>
          </Stack>
        </Box>
        <Dialog open={confirmDeleteVisible} onClose={() => setConfirmDeleteVisible(false)}>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogContent>
            <Typography>You are about to delete Meter: <Typography component='label' fontWeight='bold'>{meter?.display_name}</Typography>. Are you sure?</Typography>
            <Stack direction='row' spacing='10px' mt='20px' justifyContent='flex-end'>
              <Button onClick={() => setConfirmDeleteVisible(false)} variant='contained'>No</Button>
              <Button
                onClick={() => {
                  setConfirmDeleteVisible(false)
                  deleteMeter(meter?.id ?? '')
                }}
                variant='outlined'
              >
                Yes, Delete
              </Button>
            </Stack>
          </DialogContent>
        </Dialog>
        <Snackbar open={errorVisible} autoHideDuration={6000} onClose={() => setErrorVisible(false)}>
          <Box sx={{ backgroundColor: '#bb0000' }} color='white' p='10px 25px'>
            {/* @ts-expect-error */}
            <Typography>{errorDeleting?.message ?? errorEditing?.message}</Typography>
          </Box>
        </Snackbar>
      </Box>
    </>
  )
}

export default MeterDetails
