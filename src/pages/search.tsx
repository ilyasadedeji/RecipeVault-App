"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import Link from "next/link";

const SearchPage: React.FC = () => {
  const searchParams = useSearchParams();
  const query = searchParams?.get("query") || ""; // Handle potential null value
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const resultsPerPage = 8;

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=${resultsPerPage}&offset=${(currentPage - 1) * resultsPerPage}&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
        );
        setSearchResults(response.data.results);
        setTotalResults(response.data.totalResults);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (query) fetchSearchResults(); // Only fetch if query is non-empty
  }, [query, currentPage]);

  const totalPages = Math.ceil(totalResults / resultsPerPage);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">RecipeVault</div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="hover:text-blue-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/recipes" className="hover:text-blue-300">
                  Recipes
                </Link>
              </li>
              <li>
                <Link href="/add-recipe" className="hover:text-blue-300">
                  Add Recipe
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-blue-300">
                  Favorites
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-6">
          Search Results for "{query || "your search"}"
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {searchResults.length > 0 ? (
            searchResults.map((recipe: any) => (
              <RecipeCard
                    key={recipe.id}
                    id={recipe.id} // Fixed to pass the correct ID
                    title={recipe.title}
                    image={recipe.image}
                    readyInMinutes={recipe.readyInMinutes || 0}
                    servings={recipe.servings || 0} prepTime={""}              />
            ))
          ) : (
            <p>No recipes found. Try a different search term.</p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            <button
              className={`px-4 py-2 rounded ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`px-4 py-2 rounded ${
                  page === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className={`px-4 py-2 rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            >
              Next
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} RecipeVault. All rights reserved.</p>
          <nav className="mt-4">
            <ul className="flex justify-center space-x-4">
              <li>
                <Link href="/" className="hover:text-blue-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-blue-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-blue-300">
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default SearchPage;
