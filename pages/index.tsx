import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-gray-300">
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <main className="flex-grow flex flex-col justify-center items-center text-center px-4">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
          Welcome to <span className="text-blue-600">Bugu</span>
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Create personalized photo books, calendars, and gifts with ease.
        </p>
        
        <div className="space-x-4">
          <Link href="http://localhost:3001/editor">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300">
              Start Your Project
            </button>
          </Link>
          <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg text-lg hover:bg-gray-300 transition-colors duration-300">
            Explore Products
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-6 shadow-md">
        <div className="container mx-auto text-center text-gray-500">
          &copy; {new Date().getFullYear()} Bugu. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
