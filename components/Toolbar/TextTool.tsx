import { useState } from 'react';

const TextTool = ({ addText }) => {
  const [text, setText] = useState('');

  const handleAddText = () => {
    if (text.trim()) {
      addText(text);  // Call the function passed as a prop
      setText('');    // Clear the input after adding
    }
  };

  return (
    <div className="text-tool mt-4">
      <input
        type="text"
        className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-800"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add text..."
      />
      <button
        className="mt-2 bg-green-800 text-white px-4 py-2 rounded-lg w-full hover:bg-green-600 transition-colors duration-200"
        onClick={handleAddText}
      >
        Add Text
      </button>
    </div>
  );
};

export default TextTool;