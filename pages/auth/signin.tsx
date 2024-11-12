import { signIn, signOut, useSession } from 'next-auth/react';
import Navbar from '../../components/Navbar';

export default function SignIn() {
  const { data: session } = useSession();

  if (session) {
    return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-gray-300">
        <Navbar />
        {/* <header className="bg-white shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center">
        <a href="http://localhost:3000/auth/signin" className="hover:text-blue-500 text-gray-700">
            <h1 className="text-3xl font-bold text-gray-900">Bugu</h1>
        </a>
            <nav className="space-x-6 text-lg">
            <a href="/photo-books" className="hover:text-blue-500 text-gray-700">Photo Books</a>
            <a href="/calendars" className="hover:text-blue-500 text-gray-700">Calendars</a>
            <a href="/prints" className="hover:text-blue-500 text-gray-700">Prints</a>
            <a href="/gifts" className="hover:text-blue-500 text-gray-700">Gifts</a>
            <a href="/my-projects" className="hover:text-blue-500 text-gray-700">My Projects</a>
            <a href="/profile" className="hover:text-blue-500 text-gray-700">My Profile</a>
            <button
          onClick={() => signOut()}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-md"
        >
          Sign Out
        </button>
            </nav>
        </div>
        </header> */}

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold mb-4 text-gray-700">Welcome, {session.user?.name || session.user?.email}</h1>
        <p className="text-lg text-gray-700 mb-6">You're signed in as {session.user?.email}</p>
        {/* <button
          onClick={() => signOut()}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-md"
        >
          Sign Out
        </button> */}
        </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-gray-300">
    <header className="bg-white shadow-md py-4">
    <div className="container mx-auto flex justify-between items-center">
    <a href="http://localhost:3000" className="hover:text-blue-500 text-gray-700">
        <h1 className="text-3xl font-bold text-gray-900">Bugu</h1>
    </a>
        <nav className="space-x-6 text-lg">
            <a href="/photo-books" className="hover:text-blue-500 text-gray-700">Photo Books</a>
            <a href="/calendars" className="hover:text-blue-500 text-gray-700">Calendars</a>
            <a href="/prints" className="hover:text-blue-500 text-gray-700">Prints</a>
            <a href="/gifts" className="hover:text-blue-500 text-gray-700">Gifts</a>
            <a href="/my-projects" className="hover:text-blue-500 text-gray-700">My Projects</a>
        </nav>
    </div>
    </header>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl mb-4 text-gray-700">Sign In</h1>

      {/* Google Sign-In */}
      <button
        onClick={() => signIn('google')}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Sign in with Google
      </button>

      {/* Facebook Sign-In */}
      <button
        onClick={() => signIn('facebook')}
        className="bg-blue-700 text-white px-4 py-2 rounded-md mt-4"
      >
        Sign in with Facebook
      </button>

      {/* Sign-In with Credentials (Email/Password) */}
      <form
        className="mt-6"
        method="post"
        action="/api/auth/callback/credentials"
      >
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Sign in
        </button>
      </form>
      </div>
      </div>
);
}
