
// components/RecipeCard.tsx
import React from "react";
import { Clock, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface RecipeCardProps {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  prepTime?: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  id,
  title,
  image,
  readyInMinutes,
  servings,
}) => {
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden">
      {/* Image with fixed height and controlled aspect ratio */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold truncate mb-2">{title}</h3>
        <div className="flex justify-between text-gray-600 mt-2">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{readyInMinutes} mins</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{servings} servings</span>
          </div>
        </div>
        <Link
          href={`/recipes/${id}`}
          className="mt-4 inline-block text-blue-500 hover:underline"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
