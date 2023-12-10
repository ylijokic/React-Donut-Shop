import React from 'react';
import { useNavigate } from 'react-router';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

export const RecipeCard = ({ recipe, goToRecipeInfoPage }) => {
  const navigate = useNavigate();

  const handleClick = (recipe) => {
    goToRecipeInfoPage(recipe.id);
    navigate('/info');
  }

  return (
    <Grid key={recipe.id} item xs={12} sm={6} md={6}>
        <Card variant="outlined" className="card">
            <CardMedia
                component="img"
                height="140"
                image={recipe.image}
                alt="recipe-image"
            />
            <CardContent variant="outlined">
                <Typography gutterBottom variant="h5" component="div">
                    {recipe.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Likes: {recipe.likes}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="medium" onClick={() => handleClick(recipe)}>Learn More</Button>
            </CardActions>
        </Card>
    </Grid>
  )
}
