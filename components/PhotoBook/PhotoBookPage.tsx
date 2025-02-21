// components/PhotoBook/PhotoBookPage.tsx
import React from 'react';
import Frame from './Frame';

const PhotoBookPage = ({ layout, photos, texts, pageNumber, isRestricted }) => {
  const isCoverPage = pageNumber === 1;
  const frameWidth = isCoverPage ? 480 : 480;  // 480 + 50 for cover page
  const frameHeight = isCoverPage ? 600 : 600; // 600 + 20 for cover page

  return (
    <div
      className={`photobook-page-container flex justify-center items-center relative w-full h-full ${
        isCoverPage ? '' : ''
      }`} // Apply shadow if it's the cover page
    style={{
        backgroundImage: `url('${
          isCoverPage
            ? '/images/photo-book-cover-3-1632x1056.png'
            : '/images/photo-book-pages-1632x1056.png'
        }')`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        // boxShadow: isCoverPage ? '0 4px 8px rgba(0, 0, 0, 0.3)' : 'none',
      }}
    >
      {layout === 'multi-photo' && (
        <div className="multi-leaf-container flex justify-center w-full h-full" style={{boxShadow: isCoverPage ? '8 8 8 rgba(0, 0, 0, 0.6)' : 'none'}}>
          <div className="left-leaf flex items-center justify-center">
            {isRestricted === 'left' ? (
              <div className="restricted-area flex flex-col w-[480px] h-[600px] items-center justify-center text-gray-400">
                <i className="icon-info text-2xl"></i>
                <p>This page cannot be edited</p>
              </div>
            ) : (
              <>
                <Frame width={frameWidth} height={frameHeight} /> {/* Frame inherits restricted-area size */}
                {photos[0] && <img src={photos[0]} alt="Left Photo" className="object-cover" />}
                {texts[0] && <p className="absolute text-black">{texts[0]}</p>}
              </>
            )}
          </div>

          <div className='w-10'></div>

          <div className="right-leaf flex items-center justify-center">
            {isRestricted === 'right' ? (
              <div className="restricted-area flex flex-col w-[480px] h-[600px] items-center justify-center text-gray-400">
                <i className="icon-info text-2xl"></i>
                <p>This page cannot be edited</p>
              </div>
            ) : (
              <>
                <Frame width={frameWidth} height={frameHeight} /> {/* Frame inherits restricted-area size */}
                {photos[1] && <img src={photos[1]} alt="Right Photo" className="object-cover" />}
                {texts[1] && <p className="absolute text-black">{texts[1]}</p>}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoBookPage;
