// pages/editor/[templateId].tsx
import { useState } from 'react';
import PhotoUpload from '../../components/PhotoUpload';
import PhotoBookLayout from '../../components/PhotoBookLayout';
import PhotoBookLayoutBuilder from '../../components/PhotoBookLayoutBuilder';
import SideMenu from '../../components/SideMenu';
import { useRouter } from 'next/router';
import ImageCrop from '../../components/Toolbar/ImageCrop';
import PhotoBookPage from '../../components/PhotoBook/PhotoBookPage';
import PageNavigation from '../../components/PhotoBook/PageNavigation';
import Sidebar from '../../components/Toolbar/Sidebar';
import Toolbar from '../../components/Toolbar/Toolbar';


const Editor = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(
    Array.from({ length: 15 }, () => ({
      layout: 'multi-photo', photos: [], texts: [],
    }))
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="editor-container relative h-screen flex">
      <Sidebar className="sidebar w-64 bg-gray-100" />
      <div className="editor-area flex flex-col w-full bg-gray-100">
        <Toolbar className="w-full" />
        
        <div className="flex-grow flex items-center justify-center">
          <PhotoBookPage
            layout="multi-photo"
            photos={pages[currentPage].photos}
            texts={pages[currentPage].texts}
            pageNumber={currentPage + 1}
            isRestricted={(currentPage === 1 && 'left') || (currentPage === pages.length - 1 && 'right')}
          />
        </div>
        
        <PageNavigation
          onPageChange={handlePageChange}
          currentPage={currentPage}
          totalPages={pages.length}
          setPages={setPages}
        />
      </div>
    </div>
  );
};

export default Editor;
