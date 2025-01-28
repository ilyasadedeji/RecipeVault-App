import React from "react";
import Image from "next/image";
import Link from "next/link";

interface RandomRecipeBannerProps {
  title: string;
  image: string;
  id: number;
  description?: string;
}

const RandomRecipeBanner: React.FC<RandomRecipeBannerProps> = ({ title, image, id, description }) => {
  return (
    <div className="bg-blue-100 rounded-lg shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0 relative w-full md:w-48 h-48">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg md:rounded-l-lg"
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Random Recipe</div>
          <Link
            href={`/recipes/${id}`}
            className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
          >
            {title}
          </Link>
          {description && <p className="mt-2 text-gray-500">{description}</p>}
          <Link href={`/recipes/${id}`}> 
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              View Recipe
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RandomRecipeBanner;


