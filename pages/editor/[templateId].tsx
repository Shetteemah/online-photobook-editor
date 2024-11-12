// pages/editor/[templateId].tsx
import { useState } from 'react';
import PhotoUpload from '../../components/PhotoUpload';
import PhotoBookLayout from '../../components/PhotoBookLayout';
import PhotoBookLayoutBuilder from '../../components/PhotoBookLayoutBuilder';
import SideMenu from '../../components/SideMenu';
import { useRouter } from 'next/router';

// export default function PhotoBookEditor() {
//   const [photos, setPhotos] = useState<string[]>([]);
//   const [layoutMode, setLayoutMode] = useState('preview'); // preview or edit
//   const [selectedOption, setSelectedOption] = useState('photos');

//   const handleUpload = (uploadedPhotos: string[]) => {
//     setPhotos([...photos, ...uploadedPhotos]);
//   };

export default function PhotoBookEditor() {
  const router = useRouter();
  const { format, orientation, cover, paperQuality } = router.query;

  const [photos, setPhotos] = useState<string[]>([]);
  const [layoutMode, setLayoutMode] = useState('edit');
  const [selectedOption, setSelectedOption] = useState('photos');

  const handleUpload = (uploadedPhotos: string[]) => {
    setPhotos([...photos, ...uploadedPhotos]);
  };

  const getPageDimensions = () => {
    // Define dimensions based on format and orientation
    const formats = {
      Large: { width: 21, height: 28 },
      Medium: { width: 15, height: 20 },
      Small: { width: 10, height: 15 },
    };
    const selectedFormat = formats[format as string] || formats.Large;

    if (orientation === 'landscape') {
      return { width: selectedFormat.height, height: selectedFormat.width };
    }
    return { width: selectedFormat.width, height: selectedFormat.height };
  };

  const { width, height } = getPageDimensions();

  return (
    <div className="flex">
      <SideMenu selectedOption={selectedOption} onSelectOption={setSelectedOption} />

      <div className="w-4/5 p-6">
        <h1 className="text-2xl font-bold mb-4">Photo Book Editor</h1>

        {selectedOption === 'photos' && <PhotoUpload onUpload={handleUpload} />}

        {layoutMode === 'preview' ? (
          <div>
            <h2>Preview Mode</h2>
            <PhotoBookLayout photos={photos} />
            <button onClick={() => setLayoutMode('edit')}>Edit Layout</button>
          </div>
        ) : (
          <div>
            <h2>Edit Mode</h2>
            <PhotoBookLayoutBuilder photos={photos} />
            <button onClick={() => setLayoutMode('preview')}>Preview</button>
          </div>
        )}
      </div>

      <div className="w-4/5 p-6">
        <h1 className="text-2xl font-bold mb-4">Photo Book Editor</h1>

        <div
          className="relative bg-gray-200 border"
          style={{
            width: `${width}cm`,
            height: `${height}cm`,
            margin: '0 auto',
          }}
        >
          {/* This serves as the background page layout */}
          {layoutMode === 'edit' ? (
            <PhotoBookLayoutBuilder photos={photos} />
          ) : (
            <div>Preview Mode</div>
          )}
        </div>

        {/* Upload Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Upload Photos</h2>
          <PhotoUpload onUpload={handleUpload} />
        </div>

        {/* Toggle Between Edit and Preview */}
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => setLayoutMode(layoutMode === 'edit' ? 'preview' : 'edit')}
        >
          {layoutMode === 'edit' ? 'Preview' : 'Edit Layout'}
        </button>
      </div>
    </div>
  );
}
