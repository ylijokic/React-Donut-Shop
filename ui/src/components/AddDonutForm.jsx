import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import axios from 'axios';
import { API_URL } from '../utils';

export const AddDonutForm = ({ fetchDonuts }) => {
  const [newDonutName, setNewDonutName] = useState('');
  const [newDonutPrice, setNewDonutPrice] = useState(0);

  const addNewDonut = async () => {
    try {
      await axios.post(API_URL, {
        name: newDonutName,
        favorited: false,
        price: newDonutPrice,
      });

      await fetchDonuts();
      setNewDonutName('');
      setNewDonutPrice(0);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Typography align="center" variant="h2" paddingTop={2} paddingBottom={2}>
        Donut List
      </Typography>
      <div className="addDonutForm">
        <TextField 
          size="small" 
          label="Donut Name" 
          variant="outlined" 
          placeholder="Name"
          value={newDonutName} 
          onChange={(e) => setNewDonutName(e.target.value)} 
        />
        <TextField 
          size="small" 
          label="Donut Price" 
          variant="outlined" 
          placeholder="Price"
          value={String(newDonutPrice)} 
          onChange={(e) => setNewDonutPrice(Number(e.target.value))} 
        />
        <Button disabled={!newDonutName.length && !newDonutPrice} variant="outlined" onClick={addNewDonut}>
          <AddIcon />
        </Button>
      </div>
    </div>
  )
}
