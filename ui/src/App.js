import { useState, useEffect } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { pink } from '@mui/material/colors';


import axios from "axios";
import { LOCALHOST_URL } from "./utils.js";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  const [donuts, setDonuts] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [ingredientName, setIngredientName] = useState('');

  const fetchDonuts = async () => {
    try {
      const { data } = await axios.get(LOCALHOST_URL);

      setDonuts(data);
      console.log(donuts);
    } catch (error) {
      console.log(error);
    }
  }

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
  }

  useEffect(() => {
    // fetchDonuts();
  }, [])

  const addIngredient = (e) => {
    e.preventDefault();
    setIngredients([...ingredients, ingredientName]);
    setIngredientName('');
  }

  const deleteIngredient = (ingredient) => {
    setIngredients(ingredients.filter((i) => i !== ingredient));
    setIngredientName('');
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Typography align="center" variant="h3" paddingTop={2} paddingBottom={2}>
        Find Recipes By Ingredients
      </Typography>
      <Container maxWidth="sm">
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
        <Grid
          container
          spacing={2}
          justify="stretch"
          align="stretch"
          className="margin-bottom"
        >
          {recipes.map((recipe) => {
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
                    <Button size="medium">Learn More</Button>
                  </CardActions>
              </Card>
            </Grid>
            )
          })}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
