import React from 'react'
import UploadImage from './UploadImage'
import Display from './Display'

const Gallery = () => {
  return (
    <>
    
      <h2>DailyDumps</h2>
      <div className="gallery-container">
        <UploadImage />
        <Display />
      </div>
    </>
  );
}

export default Gallery