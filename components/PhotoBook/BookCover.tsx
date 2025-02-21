import React from 'react';

const BookCover = ({ coverImage, title, subtitle }) => {
  return (
    <div className="book-cover-container w-full h-[600px] sm:w-[70%] md:w-[60%] lg:w-[50%] bg-white relative border border-gray-300 rounded-lg shadow-lg overflow-hidden">
      {/* Cover Image */}
      <div className="cover-image w-full h-[75%] bg-cover bg-center" style={{ backgroundImage: `url(${coverImage})` }}></div>

      {/* Cover Text */}
      <div className="cover-text p-4 h-[25%] bg-white flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <p className="text-md text-gray-600 mt-2">{subtitle}</p>
      </div>
    </div>
  );
};

export default BookCover;