import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { Trash2, Share2, Star } from "lucide-react";
import { getDatabase, ref as dbRef, get, remove } from "firebase/database";

const Display = ({ images, handleDelete, handleFavorite }) => {
  const db = getDatabase();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedImage(null); // Clear selected image on close
  };

  const handleDeleteClick = (e, imgUrl) => {
    e.stopPropagation();
    handleDelete(imgUrl);
    //  setText(e.target.value.toString().trim());
  };

  const handleFavoriteClick = (e, imgUrl) => {
    e.stopPropagation();
    handleFavorite(imgUrl);
  };

  return (
    <div className="image-display">
      <Fade>
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              color: "black",
              borderRadius: "20px",
              breakInside: "avoid",
              border: "1px solid purple",
              margin: "1rem",
            }}
            className="image-hover"
            onClick={() => handleImageClick(image, index)}
          >
            {/* <p>{image.size}</p> */}
            <img className={image.size} src={image.imageUrl} />
            <div
              style={{
                backgroundColor: "rgb(128, 128, 128, 0.1)",
                width: "100%",
                position: "sticky",
                bottom: "0",
                display: "flex",
                justifyContent: "space-around",
                padding: "0.5rem",
                color: "purple",
              }}
            >
              <div
                onClick={(event) => handleDeleteClick(event, image.imageUrl)}
              >
                <Trash2 />
              </div>
              {/* <div>
                <Share2 />
              </div> */}
              <div
                onClick={(event) => {
                  handleFavoriteClick(event, image.imageUrl);
                }}
              >
                <Star />
              </div>
            </div>
          </div>
        ))}
      </Fade>

      {isModalOpen && (
        <div className="image-modal">
          <div className="modal-content">
            <img
              src={selectedImage?.imageUrl}
              alt={selectedImage?.text}
              style={{ width: "100%", height: "60%" }}
            />
            {selectedImage?.text && (
              <div
                style={{
                  backgroundColor: "plum",
                  width: "100%",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  height: "50px",
                  textAlign: "left",
                  borderRadius: "10px",
                }}
              >
                <p style={{ paddingLeft: "1rem" }}>{selectedImage.text}</p>
              </div>
            )}
            <button onClick={handleModalClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Display;
