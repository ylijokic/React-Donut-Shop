import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Link,
  Typography,
} from "@mui/material";

import axios from "axios";

export const RecipeInfoPage = ({ recipeId }) => {
  const [recipe, setRecipe] = useState({});

  const fetchRecipeInfo = async () => {
    try {
      const res = await axios.get(
        `https://api.spoonacular.com/recipes/${recipeId}/information`,
        {
          headers: {
            'x-api-key': process.env.REACT_APP_API_KEY
          },
        }
      );
      setRecipe(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRecipeInfo();
  }, [])

  return (
    <Container maxWidth="sm" className="margin">
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
                    {recipe.instructions}
                </Typography>
            </CardContent>
            <CardActions>
                <Button target="_blank" size="medium" component={Link} href={recipe.sourceUrl}>Recipe Link</Button>
            </CardActions>
        </Card>
    </Container>
  )
}
