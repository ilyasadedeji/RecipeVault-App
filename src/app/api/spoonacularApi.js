import axios from "axios";

// Base URL and API Key
const BASE_URL = "https://api.spoonacular.com";
const API_KEY = import.meta.env.NEXT_PUBLIC_SPOONACULAR_API_KEY; // Replace with your Spoonacular API key

// Function to fetch featured recipes
export const fetchFeaturedRecipes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/random`, {
      params: {
        apiKey: API_KEY,
        number: 4, // Fetch 4 random recipes
      },
    });
    return response.data.recipes; // Spoonacular returns recipes in the `recipes` field
  } catch (error) {
    console.error("Error fetching featured recipes:", error);
    return [];
  }
};

// Function to fetch a random recipe
export const fetchRandomRecipe = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/random`, {
      params: {
        apiKey: API_KEY,
        number: 1, // Fetch a single random recipe
      },
    });
    return response.data.recipes[0]; // Get the first recipe from the array
  } catch (error) {
    console.error("Error fetching random recipe:", error);
    return null;
  }
};

// Function to fetch recipe details by ID
export const fetchRecipeDetails = async (recipeId) => {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/${recipeId}/information`, {
      params: {
        apiKey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching recipe details for ID ${recipeId}:`, error);
    return null;
  }
};
