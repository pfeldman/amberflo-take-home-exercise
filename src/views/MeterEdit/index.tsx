import Toolbar from '@mui/material/Toolbar'
import Title from '@/views/MetersDashboard/components/Title'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import { useNavigate, useParams } from 'react-router-dom'
import { useMeters } from '@/hooks/useMeters'
import PageNotFound from '@/views/404'
import CircularProgress from '@mui/material/CircularProgress'
import { Meter } from '@/types'
import { MeterForm } from '@/components/MeterForm'

const MeterEdit = () => {
  const { meterId } = useParams()
  const { data, isFetching, editMeter } = useMeters()

  const meter = data?.find(meter => meter.id === meterId)

  const navigate = useNavigate()

  if (!isFetching && !meter) return <PageNotFound />

  if (isFetching) return (
    <Box display='flex' justifyContent='center' width='100%'>
      <CircularProgress />
    </Box>
  )

  const handleSubmit = (meter: Meter) => {
    editMeter({ id: meterId ?? '', meter })
    navigate(`/details/${meterId}`)
  }

  return (
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
            <Title>Meter Edit</Title>
            <Box mt='20px'>
              <MeterForm meter={meter as Meter} onSubmit={handleSubmit} />
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  )
}

export default MeterEdit
