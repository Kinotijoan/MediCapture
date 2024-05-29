import React from "react";
import UploadImage from "./UploadImage";
import Display from "./Display";
import { getDatabase, ref as dbRef, set } from "firebase/database";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const Gallery = () => {
  const [value, setValue] = React.useState({
    image: "",
    text: "",
  });

  const [data, setData] = React.useState(null);

  const handleChange = (e) => {
    e.preventDefault();
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const uploadImage = async (e) => {
    e.preventDefault();

    if (value.image == null) {
      return alert("Kindly Input image");
    } else if (value.text == null) {
      return alert("Kindly Input text");
    } else if (value.image == null && value.text == null) {
      return alert("Kindly Input image and text");
    }
    const imageRef = ref(storage, `images/ ${value.image.name + v4()}`);
    await uploadBytes(imageRef, value.image)
      .then(() => {
        console.log("Image Uploaded");
      })
      .catch((error) => {
        console.log(error);
      });
    await getDownloadURL(imageRef).then((url) => {
      console.log(url);
      const db = getDatabase();
      set(dbRef(db, "images/" + value.image.name + v4()), {
        imageUrl: url,
        text: value.text,
      });
    });
  };

  return (
    <>
      <h2>DailyDumps</h2>
      <div className="gallery-container">
        <UploadImage handleChange={handleChange} uploadImage={uploadImage} />
        <Display />
      </div>
    </>
  );
};
export default Gallery;