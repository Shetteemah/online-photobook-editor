import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Frame {
  frameId: string;
  image: string | null;
}

interface Page {
  pageId: string;
  frames: Frame[];
}

interface PhotoBookState {
  pages: Page[];
}

interface PhotoBookContextType {
  photoBookState: PhotoBookState;
  addPage: () => void;
  addFrameToPage: (pageId: string) => void;
  handlePhotoUpload: (pageId: string, frameId: string, image: string) => void;
}

const PhotoBookContext = createContext<PhotoBookContextType | undefined>(undefined);

    // Define the initial state
    const initialPhotoBookState: PhotoBookState = {
        pages: [
          {
            pageId: `page-1`,
            frames: [{ frameId: `frame-1`, photo: null }],
          },
        ],
      };

export const PhotoBookProvider = ({ children }: { children: ReactNode }) => {
const [photoBookState, setPhotoBookState] = useState<PhotoBookState>(initialPhotoBookState);

  const addPage = () => {
    setPhotoBookState((prevState) => ({
      ...prevState,
      pages: [
        ...prevState.pages,
        { pageId: `page-${Date.now()}`, frames: [] },
      ],
    }));
  };

  const addFrameToPage = (pageId: string) => {
    setPhotoBookState((prevState) => ({
      ...prevState,
      pages: prevState.pages.map((page) =>
        page.pageId === pageId
          ? {
              ...page,
              frames: [
                ...page.frames,
                { frameId: `frame-${Date.now()}`, image: null },
              ],
            }
          : page
      ),
    }));
  };
  
  const handlePhotoUpload = (pageId: string, frameId: string, image: string) => {
    setPhotoBookState((prevState) => ({
      ...prevState,
      pages: prevState.pages.map((page) =>
        page.pageId === pageId
          ? {
              ...page,
              frames: page.frames.map((frame) =>
                frame.frameId === frameId
                  ? { ...frame, image }
                  : frame
              ),
            }
          : page
      ),
    }));
  };
  
  return (
    <PhotoBookContext.Provider
      value={{ photoBookState, addPage, addFrameToPage, handlePhotoUpload }}
    >
      {children}
    </PhotoBookContext.Provider>
  );
};

export const usePhotoBook = () => {
  const context = useContext(PhotoBookContext);
  if (!context) {
    throw new Error('usePhotoBook must be used within a PhotoBookProvider');
  }
  return context;
};
