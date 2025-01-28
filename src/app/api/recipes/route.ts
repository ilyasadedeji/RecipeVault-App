import { NextResponse } from "next/server";

let recipes: any[] = []; // Temporary in-memory storage

export async function POST(req: Request) {
  try {
    const recipe = await req.json();
    recipes.push(recipe); // Add the recipe to in-memory storage
    return NextResponse.json({ message: "Recipe added successfully!" });
  } catch (error) {
    console.error("Error adding recipe:", error);
    return NextResponse.json(
      { message: "Failed to add recipe." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(recipes); // Retrieve all recipes
}
