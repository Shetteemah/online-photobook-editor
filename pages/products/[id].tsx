import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PhotoUpload from '../../components/PhotoUpload';
import PhotoBookLayoutBuilder from '../../components/PhotoBookLayoutBuilder';

export default function ProductPage({ productData }: { productData: any }) {
  const router = useRouter();
  const [photos, setPhotos] = useState<{ id: string; url: string }[]>([]);

  const handleUpload = (newPhotos: string[]) => {
    const uploadedPhotos = newPhotos.map((url, index) => ({
      id: `photo-${photos.length + index}`,
      url,
    }));
    setPhotos([...photos, ...uploadedPhotos]);
  };

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <Head>
        <title>{productData.name} | Bugu</title>
        <meta name="description" content={productData.description} />
      </Head>

      <h1 className="text-3xl font-bold" tabIndex={0}>
        {productData.name}
      </h1>
      <p className="text-lg text-gray-700">{productData.description}</p>

      <div className="mt-6" role="region" aria-labelledby="upload-photos-section">
        <h2 id="upload-photos-section" className="text-xl font-semibold">
          Upload Photos
        </h2>
        <PhotoUpload onUpload={handleUpload} />
      </div>

      {photos.length > 0 && (
        <div className="mt-6" role="region" aria-labelledby="customize-layout-section">
          <h2 id="customize-layout-section" className="text-xl font-semibold">
            Customize Layout
          </h2>
          <PhotoBookLayoutBuilder photos={photos} />
        </div>
      )}
    </div>
  );
}
