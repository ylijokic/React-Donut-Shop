import react, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AddDonutForm } from './components/AddDonutForm.tsx';
import { DonutItem } from './components/DonutItem.tsx';
import axios from 'axios';

import { API_URL } from './utils.js';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  const [donuts, setDonuts] = useState([]);

  const fetchDonuts = async () => {
    try {
      const { data } = await axios.get(API_URL);

      setDonuts(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchDonuts();
  }, [])
  
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AddDonutForm fetchDonuts={fetchDonuts} />
      {donuts.map((donut) => <DonutItem key={donut.id} donut={donut} fetchDonuts={fetchDonuts} /> )}
    </ThemeProvider>
  );
}
