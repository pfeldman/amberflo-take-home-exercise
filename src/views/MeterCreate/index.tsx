import { MeterForm } from '@/components/MeterForm'
import { Meter } from '@/types'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Title from '@/views/MetersDashboard/components/Title'
import { useMeters } from '@/hooks/useMeters'
import { useNavigate } from 'react-router-dom'

const MeterCreate = () => {
  const navigate = useNavigate()
  const { createMeter } = useMeters()
  const handleSubmit = (meter: Meter) => {
    createMeter(meter)
    navigate('/')
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
            <Title>Meter Create</Title>
            <Box mt='20px'>
              <MeterForm
                meter={{
                  type: 'sum',
                  active: false,
                  used_for_billing: false,
                  display_name: '',
                  api_name: '',
                  id: '',
                  created_time: '',
                  updated_time: ''
                }}
                onSubmit={handleSubmit}
              />
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  )
}

export default MeterCreate
