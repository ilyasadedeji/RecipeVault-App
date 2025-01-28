// app/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RecipeCard from "../components/RecipeCard";
import RandomRecipeBanner from "../components/RandomRecipeBanner";

interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  prepTime?: string;
  summary?: string;
}

export default function HomePage() {
  const [featuredRecipes, setFeaturedRecipes] = useState<Recipe[]>([]);
  const [randomRecipe, setRandomRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/random?number=4&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
        );
        setFeaturedRecipes(response.data.recipes);

        const randomResponse = await axios.get(
          `https://api.spoonacular.com/recipes/random?number=1&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
        );
        setRandomRecipe(randomResponse.data.recipes[0]);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Featured Recipes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                id={recipe.id}
                title={recipe.title}
                image={recipe.image}
                readyInMinutes={recipe.readyInMinutes}
                servings={recipe.servings}
                prepTime={recipe.prepTime || `${recipe.readyInMinutes} mins`}
              />
            ))}
          </div>
        </section>
        {randomRecipe && (
          <section>
            <h2 className="text-3xl font-bold mb-6">Random Recipe</h2>
            <RandomRecipeBanner
              id={randomRecipe.id}
              title={randomRecipe.title}
              image={randomRecipe.image}
              description={randomRecipe.summary || "No description available"}
            />
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}