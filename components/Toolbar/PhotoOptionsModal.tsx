import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaTrash, FaPen, FaCropAlt, FaSyncAlt } from 'react-icons/fa';

const PhotoOptionsModal = ({ isOpen, onClose, image, onApplyChanges }) => {
  const [brightness, setBrightness] = useState(1);
  const [contrast, setContrast] = useState(1);

  const applyChanges = () => {
    onApplyChanges({ brightness, contrast });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Photo Options"
      className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-20"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <h2 className="text-lg font-bold mb-4">Photo Options</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Brightness</label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={brightness}
          onChange={(e) => setBrightness(parseFloat(e.target.value))}
          className="w-full mt-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Contrast</label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={contrast}
          onChange={(e) => setContrast(parseFloat(e.target.value))}
          className="w-full mt-2"
        />
      </div>
      <div className="flex justify-between items-center mt-6">
        <div className="flex space-x-4">
          <button className="flex items-center text-gray-700 hover:text-green-800">
            <FaPen className="mr-1" /> Edit
          </button>
          <button className="flex items-center text-gray-700 hover:text-green-800">
            <FaCropAlt className="mr-1" /> Crop
          </button>
          <button className="flex items-center text-gray-700 hover:text-green-800">
            <FaSyncAlt className="mr-1" /> Reset
          </button>
          <button className="flex items-center text-gray-700 hover:text-green-800">
            <FaTrash className="mr-1" /> Delete
          </button>
        </div>
        <button
          onClick={applyChanges}
          className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Apply Changes
        </button>
      </div>
    </Modal>
  );
};

export default PhotoOptionsModal;