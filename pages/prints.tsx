import Head from 'next/head';

export default function Prints() {
  return (
    <div className="p-6">
      <Head>
        <title>Prints | CEWE Replica</title>
        <meta name="description" content="Get high-quality prints of your favorite photos with CEWE Replica." />
      </Head>

      <h1 className="text-3xl font-bold">Prints</h1>
      <p className="text-lg mt-4 text-gray-700">
        Order high-quality prints of your favorite photos in various sizes and formats.
      </p>

      {/* Add content for ordering photo prints */}
    </div>
  );
}
