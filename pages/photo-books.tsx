import Head from 'next/head';

export default function PhotoBooks() {
  return (
    <div className="p-6">
      <Head>
        <title>Photo Books | CEWE Replica</title>
        <meta name="description" content="Create your personalized photo books with CEWE Replica." />
      </Head>

      <h1 className="text-3xl font-bold">Photo Books</h1>
      <p className="text-lg mt-4 text-gray-700">
        Create stunning photo books to capture your memories. Customize the size, layout, and design of your photo book.
      </p>

      {/* Add content and links for different types of photo books */}
    </div>
  );
}
