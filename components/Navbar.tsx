import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession(); // Get session data for authentication

  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand/Logo */}
        <Link href="/" className="hover:text-blue-500 text-gray-700">
          <h1 className="text-3xl font-bold text-gray-900">Bugu</h1>
        </Link>

        {/* Navigation Links */}
        <nav className="space-x-6 text-lg">
          <Link href="/photo-books" className="hover:text-blue-500 text-gray-700">
            Photo Books
          </Link>
          <Link href="/calendars" className="hover:text-blue-500 text-gray-700">
            Calendars
          </Link>
          <Link href="/prints" className="hover:text-blue-500 text-gray-700">
            Prints
          </Link>
          <Link href="/gifts" className="hover:text-blue-500 text-gray-700">
            Gifts
          </Link>
          <Link href="http://localhost:3001/editor" className="hover:text-blue-500 text-gray-700">
            My Projects
          </Link>

          {/* Profile and Login/Register Logic */}
          {session ? (
            <>
              <Link href="/profile" className="hover:text-blue-500 text-gray-700">
                Profile
              </Link>
              <Link href="/api/auth/signout" className="hover:text-blue-500 text-gray-700">
                Logout
              </Link>
            </>
          ) : (
            <Link href="/auth/signin" className="hover:text-blue-500 text-gray-700">
              Login/Register
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
