import React from 'react';
import Views from './views'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import MuiAppBar from '@mui/material/AppBar'
import { QueryClientProvider, QueryClient } from 'react-query'

const mdTheme = createTheme();

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24,
    },
  },
});

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={mdTheme}>
          <CssBaseline />
          <MuiAppBar position="absolute">
            <Toolbar>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Meters
              </Typography>
            </Toolbar>
          </MuiAppBar>
          <Routes>
            <Route path='/' element={<Views.MetersDashboard />} />
            <Route path='/details/:meterId' element={<Views.MeterDetails />} />
            <Route path='/edit/:meterId' element={<Views.MeterEdit />} />
            <Route path='/create' element={<Views.MeterCreate />} />
          </Routes>
        </ThemeProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
