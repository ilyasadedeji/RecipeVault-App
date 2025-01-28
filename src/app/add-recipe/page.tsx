"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AddRecipePage() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const recipeData = {
      title,
      image,
      ingredients: ingredients.split("\n"), // Convert ingredients into an array
      instructions,
    };

    try {
      // Send recipe data to the backend API
      await axios.post("/api/recipes", recipeData);
      alert("Recipe added successfully!");
      router.push("/"); // Redirect to the homepage or another page
    } catch (error) {
      console.error("Error adding recipe:", error);
      alert("Failed to add recipe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Add Your Recipe</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Recipe Title */}
        <div>
          <label htmlFor="title" className="block font-medium mb-2">
            Recipe Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        {/* Recipe Image URL */}
        <div>
          <label htmlFor="image" className="block font-medium mb-2">
            Recipe Image URL
          </label>
          <input
            id="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        {/* Ingredients */}
        <div>
          <label htmlFor="ingredients" className="block font-medium mb-2">
            Ingredients (one per line)
          </label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full border rounded-lg p-2"
            rows={5}
            required
          ></textarea>
        </div>

        {/* Instructions */}
        <div>
          <label htmlFor="instructions" className="block font-medium mb-2">
            Instructions
          </label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="w-full border rounded-lg p-2"
            rows={5}
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Saving..." : "Add Recipe"}
        </button>
      </form>
    </div>
  );
}
