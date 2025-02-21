import { useState } from 'react';
import PhotoUpload from '../components/Toolbar/PhotoUpload';
import TemplateSelector from '../components/Toolbar/TemplateSelector';
import TextTool from '../components/Toolbar/TextTool';
import ClipArtTool from '../components/Toolbar/ClipArtTool';
import ImageCrop from '../Toolbar/ImageCrop';
import PhotoBookPage from './PhotoBookPage';
import { FaArrowLeft, FaArrowRight, FaPlus, FaRegTrashAlt } from 'react-icons/fa';
  
const PageNavigation = ({ onPageChange, currentPage, totalPages, setPages }) => {
  const [pages, setLocalPages] = useState(
    Array.from({ length: 15 }, (_, i) => ({
      layout: 'multi-photo', // Set default layout to multi-photo
      photos: [],
      texts: [],
    }))
  );
  // const [currentPage, setCurrentPage] = useState(1);
  
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isCropping, setIsCropping] = useState(false);
  const [imageToCrop, setImageToCrop] = useState(null);

  const handlePhotoUpload = (photos) => {
    setUploadedImages((prev) => [...prev, ...photos]);
  };

  const addTextToPage = (text: string) => {
    const updatedPages = [...pages];
    if (!updatedPages[currentPage].texts) {
      updatedPages[currentPage].texts = [];
    }
    updatedPages[currentPage].texts.push(text);
    setPages(updatedPages);
  };

  // const addNewPage = () => {
  //   const newPage = { layout: 'single-photo', photos: [], texts: [] };
  //   setPages([...pages.slice(0, currentPage), newPage, ...pages.slice(currentPage)]);
  // };

  // const deletePage = () => {
  //   if (pages.length > 15) {
  //     setPages(pages.filter((_, index) => index !== currentPage));
  //     setCurrentPage(currentPage > 1 ? currentPage - 1 : 0);
  //   }
  // };

  const changeLayout = (layout: string) => {
    const updatedPages = [...pages];
    updatedPages[currentPage].layout = layout;
    setPages(updatedPages);
  };

  const handlePageChange = (newPage) => {
    onPageChange(newPage);
  };

  const addNewPage = () => {
    const newPage = { layout: 'multi-photo', photos: [], texts: [] };
    const updatedPages = [...pages.slice(0, currentPage + 1), newPage, ...pages.slice(currentPage + 1)];
    setPages(updatedPages);
    setLocalPages(updatedPages);
    onPageChange(currentPage + 1);
  };

  const deletePage = () => {
    if (pages.length > 15) {
      const updatedPages = pages.filter((_, index) => index !== currentPage);
      setPages(updatedPages);
      setLocalPages(updatedPages);
      onPageChange(currentPage > 0 ? currentPage - 1 : 0);
    }
  };

  return (
    <div className="page-navigation w-full justify-between items-center pl-4 pr-4 bg-white">
        <span className="text-xs grid text-center text-gray-400">{`Page ${currentPage + 1} of ${pages.length}`}</span>

      <div className="w-full flex justify-between items-center ">
        <button 
          className={`flex flex-col items-center ${currentPage === 0 ? ' text-gray-500' : 'text-green-800 '}`}
          disabled={currentPage === 0}
          onClick={() => handlePageChange(currentPage - 1)}
          title="Previous Page"
        >
          <FaArrowLeft/>
          <span className="text-xs">Previous Page</span>
        </button>


        {!isCropping && (
          <>
              <button 
                className="flex flex-col items-center text-green-800 hover:text-green-800 p-2"
                onClick={addNewPage}
                title="Add Page"
              >
                <FaPlus/>
                <span className="text-xs">Add Page</span>
              </button>
              {currentPage > 0 && (
                <button 
                  className={`flex flex-col items-center ${pages.length <= 15 ? 'text-gray-500' : 'text-green-800'}`}
                  disabled={pages.length <= 15}
                  onClick={deletePage}
                  title="Delete Page"
                >
                  <FaRegTrashAlt/>
                  <span className="text-xs">Delete Page</span>
                </button>
              )}
          </>
        )}

        <button 
          className={`flex flex-col items-center ${currentPage === pages.length - 1 ? ' text-gray-500' : 'text-green-800 '}`}
          disabled={currentPage === pages.length - 1}
          onClick={() => handlePageChange(currentPage + 1)}
          title="Next Page"
        >
          <FaArrowRight/>
          <span className="text-xs">Next Page</span>
        </button>
      </div>
    </div>
  );
};

export default PageNavigation;
