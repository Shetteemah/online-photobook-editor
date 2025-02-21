const ClipArtTool = ({ addClipArt }) => {
    const cliparts = [
      '/clipart/heart.png',
      '/clipart/star.png',
      '/clipart/smile.webp',
    ];
  
    return (
      <div className="clipart-tool mt-4 grid grid-cols-3 gap-2">
        {cliparts.map((clipart, index) => (
          <img
            key={index}
            src={clipart}
            alt="Clipart"
            className="cursor-pointer"
            width={40}
            height={40}
            onClick={() => addClipArt(clipart)}
          />
        ))}
      </div>
    );
  };
  
  export default ClipArtTool;
  