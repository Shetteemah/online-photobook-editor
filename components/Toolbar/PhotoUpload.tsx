import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useStateContext } from '../StateContext';

const PhotoUpload = () => {
  const { dispatch } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const onDrop = async (acceptedFiles: File[]) => {
    await handleUpload(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleFileInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      await handleUpload(fileArray);
    }
  };

  const handleUpload = async (files: File[]) => {
    setLoading(true);
    setError(null);

    // const uploadedUrls = await Promise.all(
    //   files.map(async (file) => {
    //     const formData = new FormData();
    //     formData.append('file', file);

    try {
      const uploadedUrls = await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append('file', file);
          // Mocking upload
          const url = URL.createObjectURL(file); // Replace this with real upload logic
          return url;
        })
      );
      setUploadedImages([...uploadedImages, ...uploadedUrls]);
      setLoading(false);
    } catch (err) {
      setError('Failed to upload files. Please try again.');
      setLoading(false);
    }
  };
  
    // Function to handle drag start and pass the image URL
    const handleDragStart = (e: React.DragEvent<HTMLImageElement>, url: string) => {
      e.dataTransfer.setData('text/plain', url); // Set the image URL as drag data
    };  
  // ---------------------------------------------------------------

  return (
    <div >
      <div {...getRootProps()} className="border-2 border-dashed border-green-800 p-4 rounded-lg text-center hover:bg-green-50 transition-colors duration-200 cursor-pointer" >
        <input {...getInputProps()} />
        <p className="text-gray-700">Drag & drop photos here, or click to select files</p>
      </div>
      <div className="mt-4">
        <label htmlFor="fileInput" className="p-2 bg-green-800 text-white hover:bg-green-600 rounded-md cursor-pointer">
          Choose File
        </label>
        <input
          {...getInputProps()}
          id="fileInput"
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
      </div>
      {loading && <p className="text-green-800 mt-2">Uploading...</p>}
      {error && <p className="text-green-800 mt-2">{error}</p>}

      <div className="uploaded-images mt-4 p-4 grid grid-cols-3 gap-4 rounded-lg">
      {uploadedImages.map((url, index) => (
          <div key={index} className="relative flex">
            <img src={url} alt={`uploaded-${index}`} className="w-full h-full object-cover rounded-lg" draggable onDragStart={(e) => handleDragStart(e, url)}  />
            <div>
              <button
                className="absolute text-green-800 hover:text-white p-1 rounded-full hover:bg-green-600"
                onClick={() => setUploadedImages(uploadedImages.filter((_, i) => i !== index))}
              >
                &times;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoUpload;
