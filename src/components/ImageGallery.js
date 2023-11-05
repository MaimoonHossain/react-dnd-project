import React, { useEffect, useState } from 'react';
import Image from './Image';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const ImageGallery = ({ images, setImages }) => {
  const [isDropInProgress, setDropInProgress] = useState(false);
  const [selected, setSelected] = useState([]);
  const handleUpload = (file) => {
    const newImage = {
      id: images.length + 1,
      src: URL.createObjectURL(file),
      isFeatured: false,
    };
    setImages([...images, newImage]);
  };

  const handleDeleteSelected = () => {
    const updatedImages = images.filter(
      (image, index) => !selected.includes(index)
    );
    setImages(updatedImages);

    setSelected([]);
    console.log('Previously selected (in handle delete)', selected);
  };

  useEffect(() => {
    console.log('Previously selected (in use effect)', selected);
  }, [selected]);

  const onDragEnd = (result) => {
    console.log('result', result);
    if (isDropInProgress) {
      return;
    }
    if (!result.destination) return;
    setDropInProgress(true);
    const updatedImages = [...images];
    const [reorderedImage] = updatedImages.splice(result.source.index, 1);
    updatedImages.splice(result.destination.index, 0, reorderedImage);
    console.log('updatedImages', updatedImages);
    setImages(updatedImages);
    setTimeout(() => {
      setDropInProgress(false);
    }, 500);
  };

  return (
    <div className='bg-white md:mx-40 md: md:my-10 rounded-md'>
      <div className='flex flex-row justify-between py-4 pl-6 text-xl font-bold border-b-black-600'>
        {!selected.length ? (
          <h1 className='flex items-center text-2xl'>Gallery</h1>
        ) : (
          <h1 className='flex items-center text-xl py-2'>
            ☑️ ${selected.length} Files Selected
          </h1>
        )}
        {selected.length ? (
          <div className='top-2 right-2 pr-6 text-red-600'>
            <button
              class='inline-flex items-center px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md'
              onClick={handleDeleteSelected}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class='h-5 w-5 mr-2'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                />
              </svg>
              Delete
            </button>
          </div>
        ) : (
          <div className='top-2 right-2 pr-6 text-white'>
            <label className='cursor-pointer'>
              <input
                type='file'
                accept='image/*'
                className='hidden'
                onChange={(e) => handleUpload(e.target.files[0])}
              />
              <p className='px-4 py-1.5 bg-blue-500 rounded-md shadow-md text-[16px] font-medium text-center flex items-center'>
                <span className='text-xl pr-2 mb-1 font-extrabold flex flex-col items-center'>
                  +
                </span>
                Add Images
              </p>
            </label>
          </div>
        )}
      </div>

      <hr className='w-full border-t border-gray-400'></hr>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='gallery' direction='both'>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className='grid grid-cols-3 md:grid-cols-5 gap-6 m-10 pb-10'
              style={{ gridAutoRows: '200px', overflow: 'hidden' }}
            >
              {images.map((image, index) => (
                <Image
                  src={image.src}
                  alt={`${index}`}
                  key={index}
                  image={image}
                  selected={selected}
                  setSelected={setSelected}
                  index={index}
                />
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
    // </div>
  );
};

export default ImageGallery;
