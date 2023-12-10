import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
} from "@mui/material";

import { RecipeCard } from './RecipeCard';
import { RecipeSearchForm } from './RecipeSearchForm';

export const MainPage = ({ recipes, setRecipes, goToRecipeInfoPage }) => {
  return (
    <Container maxWidth="sm">
        <Typography align="center" variant="h3" paddingTop={2} paddingBottom={2}>
          Find Recipes By Ingredients
        </Typography>
        <RecipeSearchForm setRecipes={setRecipes} />
        <Grid
          container
          spacing={2}
          justify="stretch"
          align="stretch"
          className="margin-bottom"
        >
          {recipes.map((recipe) => {
            return (
                <RecipeCard key={recipe.id} recipe={recipe} goToRecipeInfoPage={goToRecipeInfoPage} />
            )
          })}
        </Grid>
    </Container>
  )
}
