import React, { useContext } from 'react';
import { StateContext } from '../StateContext';
import { FaTrash, FaCropAlt, FaUndo, FaRedo, FaSave, FaEye } from 'react-icons/fa';


const Toolbar = () => {
  const { state, dispatch } = useContext(StateContext);

  const undo = () => dispatch({ type: 'UNDO_ACTION' });
  const redo = () => dispatch({ type: 'REDO_ACTION' });
  // Define saveProject and previewProject based on what they should do with the state or dispatch

  return (
    <div className="flex justify-between bg-white">
      {/* Undo/Redo Buttons */}
      <div className="flex space-x-2">
      <button 
          className="toolbar-btn w-full flex flex-col items-center text-green-800 hover:text-green-800 p-2"
          onClick={undo}
          title="Undo Action"
        >
          <FaUndo/>
          <span className="text-xs">Undo</span>
        </button>
        <button 
          className="toolbar-btn w-full flex flex-col items-center text-green-800 hover:text-green-800 p-2"
          onClick={undo}
          title="Redo Action"
        >
          <FaRedo/>
          <span className="text-xs">Redo</span>
        </button>
        {/* <button onClick={undo} className="toolbar-btn w-full bg-green-800 text-white hover:bg-green-600">Undo</button>
        <button onClick={redo} className="toolbar-btn w-full bg-green-800 text-white hover:bg-green-600">Redo</button> */}
      </div>

      {/* Preview and Save */}
      <div className="flex space-x-2">
        <button 
          className="toolbar-btn w-full flex flex-col items-center text-green-800 p-2"
          onClick={() => console.log('Preview Project')}
          title="Preview Photos"
        >
          <FaEye/>
          <span className="text-xs">Preview</span>
        </button>
        <button 
          className="toolbar-btn w-full flex flex-col items-center text-green-800 p-2"
          onClick={() => console.log('Save Project')}
          title="Save Project"
        >
          <FaSave/>
          <span className="text-xs">Save</span>
        </button>
      </div>
    </div>
  );
};

export default Toolbar;