import React from 'react';
import { Grid, Paper } from '@mui/material';
import Form from './components/Form/Form';

function App() {
  return (
    <Grid container justifyContent='center' alignItems='center' minHeight='100vh'>
      <Grid item xs={11} md={8}>
        <Paper elevation={3}>
          <Form />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default App;
