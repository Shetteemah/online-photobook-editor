// components/PhotoBookLayout.tsx
import Image from 'next/image';

export default function PhotoBookLayout({ photos }: { photos: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      {photos.map((photo, index) => (
        <div key={index} className="h-64 w-full border border-gray-300 rounded-md">
          <Image src={photo} alt={`Photo ${index + 1}`} layout="fill" objectFit="cover" />
        </div>
      ))}
    </div>
  );
}
