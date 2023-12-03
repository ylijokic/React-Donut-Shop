import { Button, Dialog, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';
import { API_URL } from '../utils';

export const UpdateDonutForm = ({ isDialogOpen, setIsDialogOpen, donut, fetchDonuts }) => {
    const {id, name, favorited, price } = donut;
    const [donutName, setDonutName] = useState('');
    const [donutPrice, setDonutPrice] = useState(0);

    const handleUpdateDonut = async () => {
        try {
            await axios.put(API_URL, {
                id,
                name: donutName,
                favorited,
                price: donutPrice,
            });
            await fetchDonuts();

            setDonutName('');
            setDonutPrice(0);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Dialog open={isDialogOpen}>
            <DialogTitle>Edit Donut</DialogTitle>
            <div className="dialog">
                <TextField 
                    size="small" 
                    label="Donut Name" 
                    variant="outlined"
                    placeholder={name}
                    onChange={(e) => setDonutName(e.target.value)}
                />
                <TextField 
                    size="small" 
                    label="Donut Price" 
                    variant="outlined"
                    placeholder={price}
                    onChange={(e) => setDonutPrice(Number(e.target.value))}
                />
                <Button 
                    variant="contained" 
                    onClick={async () => {
                        await handleUpdateDonut();
                        setIsDialogOpen(false);
                    }}
                >
                    <CheckIcon />
                </Button>
            </div>
        </Dialog>
    )
}
