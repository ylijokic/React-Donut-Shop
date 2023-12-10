import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import axios from "axios";
import { LOCALHOST_URL } from "./utils.js";
import { MainPage } from "./components/MainPage.js";
import { ErrorPage } from "./components/ErrorPage.js";
import { RecipeInfoPage } from "./components/RecipeInfoPage.js";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  const [donuts, setDonuts] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [recipeId, setRecipeId] = useState('');

  const fetchDonuts = async () => {
    try {
      const { data } = await axios.get(LOCALHOST_URL);

      setDonuts(data);
      console.log(donuts);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // fetchDonuts();
  }, []);

  const goToRecipeInfoPage = (recipeId) => {
    setRecipeId(recipeId);
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<MainPage recipes={recipes} setRecipes={setRecipes} goToRecipeInfoPage={goToRecipeInfoPage}/>} />
          <Route path="/info" element={<RecipeInfoPage recipeId={recipeId}/>} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
