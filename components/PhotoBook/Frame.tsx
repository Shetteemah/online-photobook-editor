// components/PhotoBook/Frame.tsx
import React, { useState, useEffect, useRef } from 'react';
import ResizableBox from '../../pages/lib/ResizableBox';
import { FaTrash, FaCropAlt } from 'react-icons/fa';
import { overlayDefaultEditor, openDefaultEditor } from '@pqina/pintura';

interface FrameProps {
  width: number;
  height: number;
}

const Frame: React.FC<FrameProps> = ({ width, height }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [editorInstance, setEditorInstance] = useState<any>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);  // State to toggle between overlay and modal
  const [imageState, setImageState] = useState<any>(null);
  const overlayEditorRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [frameSize, setFrameSize] = useState({ width, height });

  // const frameSize = { width, height };

  const handleOpenEditor = () => {
    console.log("Crop icon clicked - handleOpenEditor called");

    if (!image) {
      console.log("No image in frame to edit.");
      return;
    }

    // Decide based on isModal state whether to open overlay or modal editor
    // if (isModal) {
      console.log("Opening modal editor");
      const editor = openDefaultEditor({
        src: image,
        imageState: imageState,
        stickers: [['Emoji', ['⭐️', '😊', '👍', '👎', '☀️', '🌤', '🌥']]]
      });

      editor.on('process', (res) => {
        setImageState(res.imageState);
        const newImageUrl = URL.createObjectURL(res.dest);
        setImage(newImageUrl);
        editor.destroy();
        setEditorInstance(null);
      });

      setEditorInstance(editor);
    // } else {
    //   if (!overlayEditorRef.current) {
    //     console.log("Overlay editor ref is missing.");
    //     return;
    //   }
      
    //   console.log("Opening overlay editor");
    //   setIsOverlayOpen(true);
    //   const editor = overlayDefaultEditor(overlayEditorRef.current, {
    //     src: image,
    //     imageState: imageState,
    //     stickers: [['Emoji', ['⭐️', '😊', '👍', '👎', '☀️', '🌤', '🌥']]]
    //   });

    //   editor.on('process', (res) => {
    //     setImageState(res.imageState);
    //     const newImageUrl = URL.createObjectURL(res.dest);
    //     setImage(newImageUrl);
    //     editor.destroy();
    //     setEditorInstance(null);
    //     setIsOverlayOpen(false);
    //   });

    //   setEditorInstance(editor);
    // }
  };

  const handleCloseOverlay = () => {
    console.log("Close Editor button clicked");
    if (editorInstance) {
      editorInstance.destroy();
      setEditorInstance(null);
    }
    setIsOverlayOpen(false);
  };

  const handleDeleteImage = () => {
    if (image) {
      console.log("Delete button clicked");
      setImage(null);
      setImageState(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const imageUrl = e.dataTransfer.getData('text/plain');
    if (imageUrl) {
      console.log("Image dropped:", imageUrl);
      setImage(imageUrl);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleClick = () => {
    setIsActive(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (frameRef.current && !frameRef.current.contains(target)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    if (isActive) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isActive]);

  return (
    <div
      className="relative"
      onDrop={handleDrop}
      style={{ width: frameSize.width, height: frameSize.height }}
    >
      {/* <div className="absolute z-10 top-6 left-6  flex items-center space-x-2">
        <label className="text-black">Editor Mode:</label>
        <select onChange={(e) => setIsModal(e.target.value === "modal")}>
          <option className="text-black" value="overlay">Overlay</option>
          <option className="text-black" value="modal">Modal</option>
        </select>
      </div> */}

      <ResizableBox
        ref={frameRef}
        style={{
          backgroundImage: `url('/images/image-placeholder.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: '1px solid green',
        }}
        width={frameSize.width}
        height={frameSize.height}
        lockAspectRatio={false}
        // =======
        handle={(h, ref) => <span className={`custom-handle custom-handle-${h}`} ref={ref} />}
        handleSize={[8, 8]}
        resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 's', 'n']}
        className="frame  custom-box relative overflow-hidden"
        minConstraints={[100, 100]}
        maxConstraints={[width, height]}
        onMouseDown={handleClick}
        onResizeStop={(e, data) => setFrameSize({ width: data.size.width, height: data.size.height })}

      >
        {image ? (
          <img src={image} alt="cropped" className="w-full h-full object-cover" />
        ) : (
          <div className="flex justify-center items-center h-full">
            {/* <span className="text-gray-600">Drag & Drop Image</span> */}
          </div>
        )}

        <div
          ref={overlayEditorRef}
          className={`overlay-editor absolute z-100 w-full h-full ${isOverlayOpen ? 'block' : 'hidden'}`}
          style={{ display: isOverlayOpen ? 'block' : 'none' }}
        ></div>

        {isActive && (
          <div className="absolute flex space-x-2 right-1/4 bottom-2 z-50">
            <button
              aria-label="Open editor"
              className="bg-green-800 text-white p-2 w-full rounded-full hover:bg-green-600"
              onClick={handleOpenEditor}
            >
              <FaCropAlt />
            </button>
            <button
              aria-label="Delete image"
              className="bg-green-800 text-white p-2 w-full rounded-full hover:bg-green-600"
              onClick={handleDeleteImage}
            >
              <FaTrash />
            </button>
          </div>
        )}

        {isOverlayOpen && (
          <button
            aria-label="Close overlay editor"
            className="bg-gray-500 text-white p-2 w-full rounded-full hover:bg-gray-600 absolute top-2 right-2"
            onClick={handleCloseOverlay}
          >
            Close Edtor
          </button>
        )}
      </ResizableBox>
    </div>
  );
};

export default Frame;
