import Link from 'next/link';

export default function ProjectsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">My Projects</h1>
      <Link href="/profile" className="text-blue-500 underline">My Account</Link>

      {/* Tab Navigation */}
      <div className="mt-4">
        <nav className="flex space-x-4 border-b-2 pb-2">
          <button className="border-b-2 border-black pb-1 text-black font-semibold">Photo book</button>
          <button className="text-gray-500 hover:text-black">Calendar</button>
          <button className="text-gray-500 hover:text-black">Invitation cards</button>
          <button className="text-gray-500 hover:text-black">Greeting cards</button>
        </nav>
      </div>

      {/* Main Project Content */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Bugu Photo Book – Your open projects</h2>
        <p className="text-gray-600 mt-2">
          Here you will find all the open Bugu Photo Book projects you have designed online. These will be available to you for 6 months from the last saved change.
        </p>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Create New Project */}
          <div className="bg-white p-4 shadow-md rounded-md text-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" id="Polaroid--Streamline-Sharp.svg" height="64" width="64"><desc>Polaroid Streamline Icon: https://streamlinehq.com</desc><g id="Flat/08-Images-Photography/03-Photos/polaroid--photos-polaroid-picture-camera-photography-photo-pictures-image"><path id="Subtract" fill="#2859c5" fill-rule="evenodd" d="M8.378826666666665 50.666666666666664H50.66799999999999V16.33072l10.340533333333333 2.7707466666666662 2.575733333333333 0.6901866666666666 -0.6901333333333333 2.5757866666666667L52.54133333333333 61.00453333333333l-0.6901333333333333 2.575733333333333 -2.575733333333333 -0.6901333333333333 -38.63717333333333 -10.352799999999998 -2.5757866666666667 -0.6901333333333333L8.378826666666665 50.666666666666664Z" clip-rule="evenodd" stroke-width="1"></path><path id="Union" fill="#8fbffa" fill-rule="evenodd" d="M0 0h45.33333333333333v45.33333333333333H0V0Z" clip-rule="evenodd" stroke-width="1"></path><path id="Rectangle 2219" fill="#2859c5" d="M0 32h45.33333333333333v13.333333333333332H0z" stroke-width="1"></path></g></svg>
            <p className="mt-4 font-bold">
              <Link href="/new-photobook">Create Photo Book</Link>
            </p>
          </div>

          {/* Link to BUGU myPhotos */}
          <div className="bg-white p-4 shadow-md rounded-md text-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" id="Cloud-Share--Streamline-Sharp.svg" height="64" width="64"><desc>Cloud Share Streamline Icon: https://streamlinehq.com</desc><g id="Flat/06-Programming/06-Clouds/cloud-share--cloud-network-internet-server-share"><path id="Subtract" fill="#8fbffa" fill-rule="evenodd" d="M15.301066666666665 12.761066666666666C18.1592 6.389333333333333 24.557866666666662 1.9466666666666665 32 1.9466666666666665C41.282133333333334 1.9466666666666665 48.949333333333335 8.859466666666666 50.1344 17.8176C57.62853333333334 18.995733333333334 63.36 25.481866666666665 63.36 33.306666666666665C63.36 41.34506666666667 57.31146666666667 47.9704 49.517333333333326 48.879999999999995C48.868 47.93973333333333 48.08586666666666 47.09493333333333 47.19706666666666 46.37546666666666C49.8848 44.20133333333334 51.6 40.879999999999995 51.6 37.22666666666667C51.6 30.849866666666664 46.35493333333333 25.46666666666667 39.839999999999996 25.46666666666667C34.41493333333333 25.46666666666667 29.848 29.14 28.490666666666662 34.1352L25.867466666666665 35.446933333333334C24.535466666666665 34.913066666666666 23.077599999999997 34.61333333333333 21.546666666666667 34.61333333333333C15.051733333333333 34.61333333333333 9.786666666666665 39.8784 9.786666666666665 46.373333333333335C9.786666666666665 46.42906666666667 9.786933333333334 46.48479999999999 9.787733333333332 46.54C4.3191999999999995 43.377066666666664 0.6399999999999999 37.465066666666665 0.6399999999999999 30.69333333333333C0.6399999999999999 21.833066666666667 6.9370666666666665 14.446933333333334 15.301066666666665 12.761066666666666Z" clip-rule="evenodd" stroke-width="1"></path><path id="Union" fill="#2859c5" d="M39.839999999999996 30.69333333333333C36.23173333333333 30.69333333333333 33.306666666666665 33.618399999999994 33.306666666666665 37.22666666666667C33.306666666666665 37.34053333333333 33.309599999999996 37.45386666666666 33.3152 37.56613333333333L25.709333333333333 41.36986666666667C24.577066666666667 40.42026666666666 23.124799999999997 39.839999999999996 21.546666666666667 39.839999999999996C17.938399999999998 39.839999999999996 15.013333333333332 42.76506666666666 15.013333333333332 46.373333333333335S17.938399999999998 52.906666666666666 21.546666666666667 52.906666666666666C23.127466666666667 52.906666666666666 24.580266666666663 52.327466666666666 25.7128 51.37866666666666L33.3152 55.17946666666666C33.309599999999996 55.292 33.306666666666665 55.40586666666667 33.306666666666665 55.519999999999996C33.306666666666665 59.12826666666667 36.23173333333333 62.05333333333333 39.839999999999996 62.05333333333333C43.4376 62.05333333333333 46.373333333333335 59.053866666666664 46.373333333333335 55.519999999999996C46.373333333333335 51.99466666666667 43.43333333333334 48.986666666666665 39.839999999999996 48.986666666666665C38.24666666666666 48.986666666666665 36.78693333333333 49.556799999999996 35.65306666666666 50.50453333333333L28.070933333333333 46.714133333333336C28.0768 46.60106666666667 28.08 46.48746666666666 28.08 46.373333333333335C28.08 46.2592 28.0768 46.1456 28.070933333333333 46.03253333333333L35.65226666666666 42.24133333333333C36.78613333333333 43.1896 38.246399999999994 43.76 39.839999999999996 43.76C43.4376 43.76 46.373333333333335 40.76053333333333 46.373333333333335 37.22666666666667C46.373333333333335 33.70133333333333 43.43333333333334 30.69333333333333 39.839999999999996 30.69333333333333Z" stroke-width="1"></path></g></svg>
            <p className="mt-4 font-bold">
              <Link href="https://www.BUGU-myphotos.com">To my projects on Bugu Cloud</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
