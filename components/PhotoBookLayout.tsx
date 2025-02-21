import Image from 'next/image';
import { usePhotoBook } from '../context/PhotoBookContext';

export default function PhotoBookLayout({ pageId }: { pageId: string }) {
  const { photoBookState } = usePhotoBook();
  const page = photoBookState.pages.find((p) => p.pageId === pageId);

  if (!page) {
    return <p>Page not found</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      {page.frames.map((frame) => (
        <div key={frame.frameId} className="h-64 w-full border border-gray-300 rounded-md relative">
          {frame.photo ? (
            <img src={frame.photo} alt="Uploaded" className="h-full w-full object-cover" />
          ) : (
            <p className="text-gray-500 text-center">Empty Frame</p>
          )}
        </div>
      ))}
    </div>
  );
}
