import React, { useState } from 'react';
import PhotoUpload from './PhotoUpload';
import TemplateSelector from './TemplateSelector';
import TextTool from './TextTool';
import ClipArtTool from './ClipArtTool';
import { SlPicture, SlFrame, SlStar } from "react-icons/sl";
import { TfiText } from "react-icons/tfi";
import { TbBackground } from "react-icons/tb";
import { AiOutlineArrowLeft } from 'react-icons/ai';


const Sidebar = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([
    { layout: 'single-photo', photos: [], texts: [] },
    { layout: 'multi-photo', photos: [], texts: [] },
    { layout: 'single-photo', photos: [], texts: [] },
  ]);

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

  const addNewPage = () => {
    const newPage = { layout: 'single-photo', photos: [], texts: [] };
    setPages([...pages.slice(0, currentPage), newPage, ...pages.slice(currentPage)]);
  };

  const deletePage = () => {
    if (pages.length > 3) {
      setPages(pages.filter((_, index) => index !== currentPage));
      setCurrentPage(currentPage > 1 ? currentPage - 1 : 0);
    }
  };

  const changeLayout = (layout: string) => {
    const updatedPages = [...pages];
    updatedPages[currentPage].layout = layout;
    setPages(updatedPages);
  };

  const handleSectionClick = (section) => {
    setActiveSection(section === activeSection ? null : section);
  };

  return (
    <div className="flex  border-green-800">
      {/* Sidebar */}
        <div className="sidebar bg-white flex flex-col items-center py-0 h-screen w-17 space-y-4 pt-14">
            <button 
                className={`w-full flex flex-col items-center text-green-800 p-2 ${activeSection === 'photos' ? 'bg-green-100' : ''}`}
                onClick={() => handleSectionClick('photos')}
                title="Manage Photos"
            >
                <SlPicture/>
                <span className="text-xs">photos</span>
            </button>
            <button 
                className={`w-full flex flex-col items-center text-green-800 p-2 ${activeSection === 'template' ? 'bg-green-100' : ''}`} 
                onClick={() => handleSectionClick('template')}
                title="Manage Template"
            >
                <SlFrame/>
                <span className="text-xs">Template</span>
            </button>
            <button 
                className={`w-full flex flex-col items-center text-green-800 p-2 ${activeSection === 'text' ? 'bg-green-100' : ''}`} 
                onClick={() => handleSectionClick('text')}
                title="Manage Text"
            >
                <TfiText/>
                <span className="text-xs">text</span>
            </button>
            <button 
                className={`w-full flex flex-col items-center text-green-800 p-2 ${activeSection === 'cliparts' ? 'bg-green-100' : ''}`} 
                onClick={() => handleSectionClick('cliparts')}
                title="Manage Cliparts"
            >
                <SlStar/>
                <span className="text-xs">cliparts</span>
            </button>
            <button 
                className={`w-full flex flex-col items-center text-green-800 p-2 ${activeSection === 'background' ? 'bg-green-100' : ''}`} 
                onClick={() => handleSectionClick('background')}
                title="Manage Background"
            >
                <TbBackground/>
                <span className="text-xs">background</span>
            </button>
        </div>
        {/* Expanded Content Panel */}
        {activeSection && (
        <div className="content-panel bg-green-100 w-64 flex flex-col relative">
          {/* Back Button */}
          <div className="absolute bg-white w-full hover:empty text-green-800 relative">
            <button 
                className="absolute m-2 text-green-800 relative"
                onClick={() => setActiveSection(null)}
            >
                <AiOutlineArrowLeft size={24}/>
            </button>
          </div>
{/*
      <div className="toolbar p-4 bg-white h-full w-full lg:w-1/5">
        <PhotoUpload onPhotoUploaded={handlePhotoUpload} />
        <TemplateSelector onTemplateSelected={changeLayout} />
        <TextTool addText={addTextToPage} />
        <ClipArtTool addClipArt={setImageToCrop} />
      </div>
*/}
          {/* Section-Specific Content */}
          {activeSection === 'photos' && (
            <div className="flex flex-col m-4">
              <h2 className="text-lg text-green-800 font-bold">Photos</h2>
              <PhotoUpload />
            </div>
          )}
          {activeSection === 'template' && (
            <div className="flex flex-col m-4">
              <h2 className="text-lg text-green-800 font-bold">Template</h2>
              <TemplateSelector onTemplateSelected={changeLayout}/>
            </div>
          )}
          {activeSection === 'text' && (
            <div className="flex flex-col m-4">
              <h2 className="text-lg text-green-800 font-bold">Text</h2>
              <TextTool addText={addTextToPage}/>
            </div>
          )}
          {activeSection === 'cliparts' && (
            <div className="flex flex-col m-4">
              <h2 className="text-lg text-green-800 font-bold">Cliparts</h2>
              <ClipArtTool addClipArt={setImageToCrop}/>
            </div>
          )}
          {activeSection === 'background' && (
            <div className="flex flex-col m-4">
              <h2 className="text-lg text-green-800 font-bold">Background</h2>
              <BackgroundPanel />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const BackgroundPanel = () => <div className="text-green-600">Background Section</div>;

export default Sidebar;
