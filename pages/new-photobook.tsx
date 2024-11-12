// pages/new-photobook.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import Carousel from '../components/Carousel';

export default function CreatePhotoBook() {
  const router = useRouter();
  const [bookConfig, setBookConfig] = useState({
    format: 'Large',
    orientation: 'portrait',
    cover: 'hardcover',
    paperQuality: 'digital print matt',
  });

  const handleConfigChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookConfig({ ...bookConfig, [name]: value });
  };

  const startEditor = () => {
    router.push({
      pathname: 'http://localhost:3001/editor',
      query: bookConfig,
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        <div className="md:w-1/2">
          <Carousel />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-blue-600 mb-6">Configure Your Photo Book</h1>

          <form className="grid grid-cols-1 gap-6 mb-6">
            <div>
              <label className="block font-semibold">Photo Book format</label>
              <select
                name="format"
                value={bookConfig.format}
                onChange={handleConfigChange}
                className="border p-2 rounded-md mt-2 w-full"
              >
                <option value="Large">Large (21 × 28 cm)</option>
                <option value="Medium">Medium (15 × 20 cm)</option>
                <option value="Small">Small (10 × 15 cm)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold">Orientation</label>
              <select
                name="orientation"
                value={bookConfig.orientation}
                onChange={handleConfigChange}
                className="border p-2 rounded-md mt-2 w-full"
              >
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold">Cover</label>
              <select
                name="cover"
                value={bookConfig.cover}
                onChange={handleConfigChange}
                className="border p-2 rounded-md mt-2 w-full"
              >
                <option value="hardcover">Hardcover</option>
                <option value="softcover">Softcover</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold">Paper Quality</label>
              <select
                name="paperQuality"
                value={bookConfig.paperQuality}
                onChange={handleConfigChange}
                className="border p-2 rounded-md mt-2 w-full"
              >
                <option value="digital print matt">Digital Print Matt</option>
                <option value="glossy">Glossy</option>
              </select>
            </div>
          </form>

          <div className="text-right">
            <button
              onClick={startEditor}
              className="bg-blue-600 text-white px-6 py-2 rounded-md"
            >
              Design Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
