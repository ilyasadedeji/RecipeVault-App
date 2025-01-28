import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import Link from "next/link";

const Header: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload
    if (searchInput.trim() !== "") {
      router.push(`/search?query=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">RecipeVault</div>
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search recipes..."
              className="bg-gray-700 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <Search className="text-gray-400" />
            </button>
          </form>

          {/* Navigation Links */}
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="hover:text-blue-300">
                  HOME
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
      </div>
    </header>
  );
};

export default Header;
