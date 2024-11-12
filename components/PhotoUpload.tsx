// components/PhotoUpload.tsx
import { useDropzone } from 'react-dropzone';
import { useState } from 'react';

export default function PhotoUpload({ onUpload }: { onUpload: (photos: string[]) => void }) {
  const [files, setFiles] = useState<File[]>([]);
  
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
      const fileUrls = acceptedFiles.map(file => URL.createObjectURL(file));
      onUpload(fileUrls);
    },
  });

  return (
    <div className="mt-4">
      <div {...getRootProps()} className="border-2 border-dashed border-gray-400 p-6 rounded-lg text-center">
        <input {...getInputProps()} />
        <p className="text-gray-600">Drag 'n' drop some photos here, or click to select files</p>
      </div>
    </div>
  );
}
