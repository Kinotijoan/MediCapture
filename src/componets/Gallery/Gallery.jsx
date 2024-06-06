import React, { useState, useEffect } from "react";
import UploadImage from "./UploadImage";
import Display from "./Display";
import {
  getDatabase,
  ref as dbRef,
  set,
  get,
  onChildAdded,
  onValue,
  remove,
} from "firebase/database";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { Home, Star, Eye, FileX } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../Auth/LogoutButton";
import Profile from "../Auth/Profile";
// import Header from "../Header";

const Gallery = () => {
  const [image, setImage] = React.useState();
  const [text, setText] = React.useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated } = useAuth0();

  const db = getDatabase();

  const handleImageChange = (e) => {
    e.preventDefault();
    setImage(e.target.files);
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
    console.log(e);
  };

  const handleTextChange = (e) => {
    e.preventDefault();
    setText(e.target.value.toString().trim());
  };

  const randomSizeClass = () => {
    const size = ["small_pin", "medium_pin", "large_pin"];
    return size[Math.floor(Math.random() * size.length)];
  };

  const userId = user?.sub;
  const uploadImage = async (e) => {
    e.preventDefault();

    if (image == null) {
      return alert("Kindly Input image");
    } else if (text == null) {
      return alert("Kindly Input text");
    } else if (image == null && text == null) {
      return alert("Kindly Input image and text");
    }

    setIsLoading(true); // Set loading state immediately after clicking upload

    const file = image[0]; // Access the first file from the image state

    try {
      // Upload the image to Firebase Storage
      const imageRef = ref(storage, `images/${userId}/${file.name + v4()}`); // Create image reference with UUID
      await uploadBytes(imageRef, file);

      // Get the download URL after successful upload
      const url = await getDownloadURL(imageRef);

      // Save image data to Firebase Realtime Database
      await set(
        dbRef(db, `images/${userId}/` + file.name.replace(/[.]?/gm, "") + v4()),
        {
          imageUrl: url,
          text: text,
          size: randomSizeClass(),
        }
      );

      console.log("Image uploaded and saved successfully!");
      setIsLoading(false); // Clear loading state on success
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsLoading(false); // Clear loading state on error
    } finally {
      setImage(null);
      setSelectedImage(null);
      setText("");
      const textValue = document.getElementById("text");
      textValue.value = "";
    }
  };
  const [images, setImages] = useState([]);
  const getImages = async () => {
    const firebaseRef = dbRef(db, `images/${userId}/`);
    // console.log(userId)
    await onValue(
      firebaseRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const imageData = snapshot.val();
          //   console.log(imageData);
          const imagesList = Object.keys(imageData).map(
            (key) => imageData[key]
          );
          //   console.log(imagesList);
          setImages(imagesList);
        } else {
          console.log("No images available");
        }
      },
      (error) => {
        console.error(error);
      }
    );
  };

  useEffect(() => {
    getImages();
  }, []);

  const handleCancel = () => {
    setImage(null);
    setText("");
    setSelectedImage(null);
  };

  const handleDelete = async (imgUrl) => {
    console.log("I am deleting");
    console.log(imgUrl);
    const firebaseRef = dbRef(db, `images/${userId}/`); // Reference to the images node
    console.log(firebaseRef);

    try {
      const snapshot = await get(firebaseRef); // Get all data from "images" node
      const data = snapshot.val(); // Get data as an object

      if (data) {
        // Iterate through each image data object
        for (const key in data) {
          if (data[key].imageUrl === imgUrl) {
            // Matching image URL found, delete the data
            await remove(dbRef(db, `images/${userId}/${key}`));
            //  await deleteDoc(doc(db, `images/${imgUrl}`))
            console.log("Image deleted successfully!");
            return; // Exit the function after successful deletion
          }
        }
        console.log("Image not found in database.");
      } else {
        console.log("No images found in database.");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleFavorite = async (imgUrl) => {
    console.log("I am favoriting");
    console.log(imgUrl);
    const firebaseRef = dbRef(db, `images/${userId}/`); // Reference to the images node
    console.log(firebaseRef);

    try {
      const snapshot = await get(firebaseRef); // Get all data from "images" node
      const data = snapshot.val(); // Get data as an object

      if (data) {
        // Iterate through each image data object
        for (const key in data) {
          if (data[key].imageUrl === imgUrl) {
            // Matching image URL found, transfer data to the favorites node?
            // Transfer all information the name should be same as the one that was aved to the database
            await set(
              dbRef(db, `favorites/${userId}/` + key.replace(/[.]?/gm, "")),
              {
                imageUrl: data[key].imageUrl,
                text: data[key].text,
                size: data[key].size,
              }
            );

            console.log("Image added to favoriites successfully!");
            return; // Exit the function after successful deletion
          }
        }
      }
    } catch (error) {
      console.error("Error adding image to Favorites:", error);
    }
  };

  const getFavorites = () => {
    const firebaseRef = dbRef(db, `favorites/${userId}/`);
    onValue(
      firebaseRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const imageData = snapshot.val();
          //   console.log(imageData);
          const imagesList = Object.keys(imageData).map(
            (key) => imageData[key]
          );
          //   console.log(imagesList);
          setImages(imagesList);
        } else {
          console.log("No images available");
        }
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const favoriteClick = () => {
    getFavorites();
  };

  const getAllClick = () => {
    getImages();
  };

  return (
    <div>
      {/* <Header/> */}
      <h1>MediCapture</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ marginLeft: "100px" }}>
          <Profile />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            color: "purple",
            justifyContent: "center",
            justifyContent: "space-evenly",
            fontSize: "",
            borderRadius: "20px",
            width: "15%",
            height: "5%",
            alignItems: "center",
            alignContent: "flex-end",
            float: "right",
            marginRight: "3rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Home onClick={getAllClick} size={32} />
            <p style={{ marginTop: "2xl" }}>Home</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Star
              style={{ textAlign: "center" }}
              onClick={favoriteClick}
              size={32}
            />
            <p>Favourite</p>
          </div>
          {/* <Eye size={32} /> */}
          <div>
            <LogoutButton />
          </div>
        </div>
      </div>
      <div className="gallery-container">
        <UploadImage
          handleImageChange={handleImageChange}
          handleTextChange={handleTextChange}
          uploadImage={uploadImage}
          selectedImage={selectedImage}
          isLoading={isLoading}
          handleCancel={handleCancel}
        />
        <Display
          images={images}
          handleDelete={handleDelete}
          handleFavorite={handleFavorite}
          getFavorites={getFavorites}
        />
      </div>
    </div>
  );
};
export default Gallery;
