import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Image = ({ image, src, index, selected, setSelected }) => {
  const id = image.id;

  const [isHovered, setIsHovered] = useState(false);

  const handleCheckboxChange = (itemId) => {
    setSelected((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemId)) {
        return prevSelectedItems.filter((id) => id !== itemId);
      } else {
        return [...prevSelectedItems, itemId];
      }
    });
    console.log('selected image', id);
  };

  return (
    <Draggable key={index} draggableId={`image-${index}`} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${
            index === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'
          }`}
        >
          <div
            onMouseEnter={() => {
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
            }}
          >
            {isHovered || selected.includes(index) ? (
              <input
                type='checkbox'
                className='absolute m-4 bg-sky-400 h-4 w-4'
                checked={selected.includes(index)}
                onChange={() => handleCheckboxChange(index)}
              />
            ) : null}
            <img
              className={`object-cover w-full h-full border border-gray-400 rounded-md shadow-md transition duration-300 ${
                selected.includes(index)
                  ? 'bg-slate-400 shadow-xl'
                  : 'hover:bg-slate-400 hover:shadow-xl'
              }`}
              src={src}
              alt={`${index}`}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
              }}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Image;
