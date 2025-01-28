"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

interface RecipeDetailsProps {
  params: {
    id: string;
  };
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ params }) => {
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const { id } = await Promise.resolve(params); // Unwrapping the `params` Promise
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
        );
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [params]);

  if (loading) {
    return <p className="text-center text-xl">Loading recipe details...</p>;
  }

  if (!recipe) {
    return <p className="text-center text-red-500 text-xl">Recipe not found.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      {/* Recipe Image */}
      <div className="flex justify-center mb-6">
        <img
          src={recipe.image || "/placeholder.svg"}
          alt={recipe.title}
          className="rounded-lg shadow-md w-full max-w-lg"
        />
      </div>
      {/* Recipe Details */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Ingredients:</h2>
        <ul className="list-disc list-inside pl-4 space-y-2">
          {recipe.extendedIngredients.map((ingredient: any) => (
            <li key={ingredient.id}>{ingredient.original}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Instructions:</h2>
        <p className="leading-relaxed">
          {recipe.instructions
            ? recipe.instructions
            : "No instructions available for this recipe."}
        </p>
      </div>
    </div>
  );
};

export default RecipeDetails;
