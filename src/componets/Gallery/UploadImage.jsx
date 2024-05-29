import { Upload } from "lucide-react";

const UploadImage = ({ handleChange, uploadImage }) => {
  return (
    <form action="">
      <h4>Upload Image</h4>
      <div className="input-container">
        <div>
          <label htmlFor="image">
            <div className="image-input">
              Upload
              <Upload size={30} />
            </div>
          </label>
          <input
            id="image"
            name="image"
            onChange={() => handleChange}
            type="file"
          />
        </div>
        <div className="text-div">
          <textarea
            className="text-input"
            placeholder="A little Recap ..."
            onChange={() => handleChange}
            name="text"
            id=""
          ></textarea>
        </div>
      </div>
      <div className="button-container">
        <button>Cancel</button>
        <button onClick={uploadImage}>Upload</button>
      </div>
    </form>
  );
};

export default UploadImage;
