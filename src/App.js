import { useState } from 'react';
import ImageGallery from './components/ImageGallery';

function App() {
  const [images, setImages] = useState([
    { id: 1, src: 'images/image-1.png' },
    { id: 2, src: 'images/image-2.png' },
    { id: 3, src: 'images/image-3.png' },
    { id: 4, src: 'images/image-4.png' },
    { id: 5, src: 'images/image-5.png' },
    { id: 6, src: 'images/image-6.png' },
    { id: 7, src: 'images/image-7.png' },
    { id: 8, src: 'images/image-8.png' },
    { id: 9, src: 'images/image-9.png' },
    { id: 10, src: 'images/image-10.jpeg' },
    { id: 11, src: 'images/image-11.jpeg' },
    { id: 12, src: 'images/image-12.png' },
  ]);

  return (
    <div className='App'>
      <ImageGallery images={images} setImages={setImages} />
    </div>
  );
}

export default App;
