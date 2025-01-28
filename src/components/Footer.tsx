import type React from "react"
import Link from "next/link"

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <p>&copy; 2025 RecipeVault. All rights reserved.</p>
        </div>
        <div>
          <ul className="flex space-x-4">
            <li>
              <Link href="/about" className="hover:text-blue-300">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-300">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-blue-300">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-blue-300">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer

