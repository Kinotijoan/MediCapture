import { Upload } from "lucide-react";
import React from "react";

const UploadImage = ({
  handleImageChange,
  handleTextChange,
  uploadImage,
  selectedImage,
  isLoading,
  handleCancel
}) => {
  return (
    <form action="">
      {/* <h4>Upload Image</h4> */}
      <div className="input-container">
        <div>
          <label htmlFor="image">
            <div className="image-input">
              {selectedImage ? (
                // Show image preview if selected
                <img
                  src={selectedImage}
                  alt="Selected Image"
                  style={{ width: "100%", height: "100%", zIndex: "90" }}
                />
              ) : (
                // Show upload icon and text if no image selected
                <>
                  Upload
                  <Upload size={30} />
                </>
              )}
            </div>
          </label>
          <input
            id="image"
            name="image"
            onChange={handleImageChange}
            type="file"
            accept="image/*"
          />
        </div>
        <div className="text-div">
          <textarea
            className="text-input"
            placeholder="A little Recap ..."
            onChange={handleTextChange}
            name="text"
            id="text"
          ></textarea>
        </div>
      </div>
      {isLoading &&
        <div>
          <p>Loading preview...</p>
          <input type="range" name="loading" min="0" max="100" />
        </div>
       }
      <div className="button-container">
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={uploadImage}>Upload</button>
      </div>
      <div></div>
    </form>
  );
};

export default UploadImage;
