import React, { useState } from 'react'

import { Button, Dialog, DialogTitle, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

import axios from 'axios';
import { LOCALHOST_URL } from '../utils';

export const UpdateDonutForm = ({ isDialogOpen, setIsDialogOpen, donut, fetchDonuts }) => {
    const {id, name, favorited, price } = donut;
    const [donutName, setDonutName] = useState('');
    const [donutPrice, setDonutPrice] = useState(0);

    const handleUpdateDonut = async () => {
        try {
            await axios.put(LOCALHOST_URL, {
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
            <IconButton
                onClick={() => setIsDialogOpen(false)}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
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
                    placeholder={String(price)}
                    onChange={(e) => setDonutPrice(Number(e.target.value))}
                />
                <Button 
                    disabled={!donutName.length && !donutPrice}
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
