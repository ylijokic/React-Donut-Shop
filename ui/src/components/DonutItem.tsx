import { Button, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import React, { useState } from 'react';
import classnames from 'classnames';
import { UpdateDonutForm } from './UpdateDonutForm.tsx';
import axios from 'axios';
import { API_URL } from '../utils.js';

export const DonutItem = ({ donut, fetchDonuts }) => {
    const { id, name, favorited, price } = donut;
    const [isFavorited, setIsFavorited] = useState(favorited);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleUpdateFavorited = async () => {
        try {
            await axios.put(API_URL, {
                id,
                name,
                favorited: !favorited,
                price,
            });
            setIsFavorited(!isFavorited);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteDonut = async () => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            await fetchDonuts();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="donut">
            <div className="flex">
                <IconButton color="primary" style={{ backgroundColor: 'transparent' }} onClick={handleUpdateFavorited}>
                    {isFavorited ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
                <div className={classnames({favorite: isFavorited})}>
                    <Typography variant="h4">{name}</Typography>
                    <Typography variant="h6">Price: {price}</Typography>
                </div>
            </div>
            <div className="donutButtons">
                <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
                    <EditIcon />
                </Button>
                <Button color="error" variant="contained" onClick={handleDeleteDonut}>
                    <DeleteIcon />
                </Button>
                <UpdateDonutForm 
                    isDialogOpen={isDialogOpen} 
                    setIsDialogOpen={setIsDialogOpen} 
                    donut={donut} 
                    fetchDonuts={fetchDonuts}
                />
            </div>
        </div>
    )
}
