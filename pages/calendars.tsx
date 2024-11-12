import Head from 'next/head';

export default function Calendars() {
  return (
    <div className="p-6">
      <Head>
        <title>Calendars | CEWE Replica</title>
        <meta name="description" content="Create customized photo calendars with CEWE Replica." />
      </Head>

      <h1 className="text-3xl font-bold">Calendars</h1>
      <p className="text-lg mt-4 text-gray-700">
        Design personalized calendars with your favorite photos. Choose from different formats and styles.
      </p>

      {/* Add content for calendar customization */}
    </div>
  );
}
