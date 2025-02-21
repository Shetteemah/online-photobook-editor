import Cropper from 'react-easy-crop';
import { useState } from 'react';

const ImageCrop = ({ photo, onCropComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState(4 / 3); // Default aspect ratio
  const [flip, setFlip] = useState({ horizontal: false, vertical: false });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);

  // Function to handle the crop area change
  const onCropAreaChange = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels); // Store the pixels for cropping
  };

  // Function to handle crop completion and generate a cropped image
  const handleCropComplete = async () => {
    try {
      const croppedUrl = await getCroppedImage(photo, croppedAreaPixels);
      setCroppedImageUrl(croppedUrl); // Store the cropped image URL
      onCropComplete(croppedUrl); // Pass cropped image URL back to parent
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative">
      <Cropper
        image={photo}
        crop={crop}
        zoom={zoom}
        rotation={rotation}
        aspect={aspect}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropAreaChange}
        cropShape="rect"
        showGrid={false}
        className="rounded-lg shadow-lg"
      />
      <div className="mt-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300" onClick={() => setFlip({ ...flip, horizontal: !flip.horizontal })}>
            Flip Horizontal
          </button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300" onClick={() => setFlip({ ...flip, vertical: !flip.vertical })}>
            Flip Vertical
          </button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300" onClick={() => setRotation(rotation + 90)}>
            Rotate
          </button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300" onClick={() => setZoom(1)}>
            Reset
          </button>
        </div>
        <button
          onClick={handleCropComplete}
          className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Apply Crop
        </button>
      </div>
    </div>
  );
};

export default ImageCrop;