import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { usePhotoBook } from '../context/PhotoBookContext';

export default function PhotoBookLayoutBuilder({ pageId }: { pageId: string }) {
  const { photoBookState, addFrameToPage } = usePhotoBook();
  const page = photoBookState.pages.find((p) => p.pageId === pageId);
  const [draggingFrames, setDraggingFrames] = useState(page?.frames || []);

  if (!page) {
    return <p>Page not found</p>;
  }

  const handleDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;

    const reorderedFrames = Array.from(draggingFrames);
    const [moved] = reorderedFrames.splice(source.index, 1);
    reorderedFrames.splice(destination.index, 0, moved);

    setDraggingFrames(reorderedFrames);
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={() => addFrameToPage(pageId)}
      >
        Add Frame
      </button>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="frames">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="grid grid-cols-2 gap-4 mt-6"
            >
              {draggingFrames.map((frame, index) => (
                <Draggable key={frame.frameId} draggableId={frame.frameId} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="h-64 w-full border border-gray-300 rounded-md relative"
                    >
                      {frame.photo ? (
                        <img src={frame.photo} alt="Uploaded" className="h-full w-full object-cover" />
                      ) : (
                        <p className="text-gray-500 text-center">Empty Frame</p>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
