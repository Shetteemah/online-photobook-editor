// pages/SelectTemplatePage.tsx
import { useState } from 'react';
import DynamicCarousel from '../components/DynamicCarousel';
import { useRouter } from 'next/router';

const templates = [
  {
    id: 'template1',
    title: 'Wedding (Collage White)',
    images: [
      { src: '/images/wedding-album-1.jpg', alt: 'Collage White 1' },
      { src: '/images/wedding-album-2.jpg', alt: 'Collage White 2' },
      { src: '/images/photo-book.gif', alt: 'Collage White 3' },
    ],
  },
  {
    id: 'template2',
    title: 'Wanderlust (Collage Black)',
    images: [
      { src: '/images/black-book.jpg', alt: 'Wanderlust Collage Black 1' },
      { src: '/images/hc_black_1.jpg', alt: 'Wanderlust Collage Black 2' },
    ],
  },
  {
    id: 'template3',
    title: 'Travel Memories',
    images: [
      { src: '/images/travel-book-cover.jpg', alt: 'Travel Memories 1' },
      { src: '/images/travel-book-1.jpg', alt: 'Travel Memories 2' },
      { src: '/images/travel-book-2.jpg', alt: 'Travel Memories 3' },
      { src: '/images/travel-book-3.jpg', alt: 'Travel Memories 4' },
      { src: '/images/travel-book-4.jpg', alt: 'Travel Memories 5' },
    ],
  },
  {
    id: 'template4',
    title: 'Family Photo Album (Spiral Bind)',
    images: [
      { src: '/images/family-album-1.jpg', alt: 'Family Album 1' },
      { src: '/images/family-album-2.jpg', alt: 'Family Album 2' },
      { src: '/images/family-album-3.jpg', alt: 'Family Album 3' },
      { src: '/images/family-album-4.jpg', alt: 'Family Album 4' },
    ],
  },
];

export default function SelectTemplatePage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const proceedToEditor = () => {
    if (selectedTemplate) {
      router.push(`/editor/${selectedTemplate}`);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Choose Your Design Template</h1>
      <p className="text-gray-600 mb-4">All design elements can be changed according to your wishes.</p>

      {/* Template Grid with Carousel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="bg-white p-4 shadow-md rounded-md text-center">
            <p className="font-bold mb-2">{template.title}</p>
            <DynamicCarousel images={template.images} />
            <button
              onClick={() => handleTemplateSelect(template.id)}
              className={`text-white py-2 px-4 rounded-md ${
                selectedTemplate === template.id ? 'bg-blue-600' : 'bg-red-500'
              }`}
            >
              {selectedTemplate === template.id ? 'Selected' : 'Choose template'}
            </button>
          </div>
        ))}
      </div>

      <div className="text-right mt-6">
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-md"
          onClick={proceedToEditor}
        >
          Continue to Editor
        </button>
      </div>
    </div>
  );
}
