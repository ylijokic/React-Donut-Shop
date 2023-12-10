import React, { useState } from 'react';
import {
  Button,
  Chip,
  Stack,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { pink } from '@mui/material/colors';

import axios from "axios";

export const RecipeSearchForm = ({ setRecipes }) => {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState('');

  const fetchRecipes = async () => {
    try {
      const res = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients`,
        {
          headers: {
            'x-api-key': process.env.REACT_APP_API_KEY
          },
          params: {ingredients: ingredients.join(','), number: '6'}
        }
      );
      setRecipes(res.data)
    } catch (err) {
      console.log(err);
    }
  };
  
  const addIngredient = (e) => {
    e.preventDefault();
    setIngredients([...ingredients, ingredientName]);
    setIngredientName('');
  };

  const deleteIngredient = (ingredient) => {
    setIngredients(ingredients.filter((i) => i !== ingredient));
    setIngredientName('');
  };

  return (
    <>
        <form className="addIngredientForm" onSubmit={(e) => addIngredient(e)}>
          <TextField 
            size="small" 
            label="Add Ingredient Name" 
            variant="outlined" 
            placeholder="Ingredient"
            value={ingredientName} 
            onChange={(e) => setIngredientName(e.target.value)} 
          />
          <Button disabled={!ingredientName.length} variant="outlined" onClick={(e) => addIngredient(e)}>
            <AddIcon />
          </Button>
        </form>
        <div className="ingredientsListContainer">
          <div>
            <Stack direction="row" className="ingredientsList">
              {ingredients.map(
                (ingredient) => <Chip key={ingredient} label={ingredient} variant="outlined" onDelete={() => deleteIngredient(ingredient)}/>)
              }
            </Stack>
            {!!ingredients.length > 0 && <Button size="small" sx={{ color: pink[700] }} className="dialog" onClick={() => setIngredients([])}>
              Clear Ingredients
            </Button>}
          </div>  
          <Button disabled={!ingredients.length} variant="outlined" onClick={fetchRecipes}>
            Search For Recipes
          </Button>
        </div>
    </>
  )
}
