// components/PhotoBookLayoutBuilder.tsx
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Image from 'next/image';

export default function PhotoBookLayoutBuilder({ photos }: { photos: string[] }) {
  const [photoList, setPhotoList] = useState(photos);

  const handleDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;

    const reorderedPhotos = Array.from(photoList);
    const [removed] = reorderedPhotos.splice(source.index, 1);
    reorderedPhotos.splice(destination.index, 0, removed);

    setPhotoList(reorderedPhotos);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="photo-book-layout" direction="horizontal">
        {(provided) => (
          <div className="grid grid-cols-2 gap-4 mt-4" {...provided.droppableProps} ref={provided.innerRef}>
            {photoList.map((photo, index) => (
              <Draggable key={photo} draggableId={photo} index={index}>
                {(provided) => (
                  <div
                    className="h-64 w-full border border-gray-300 rounded-md"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Image src={photo} alt={`Photo ${index + 1}`} layout="fill" objectFit="cover" />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
