import React from 'react'
import { Upload } from 'lucide-react';
import { getDatabase, ref as dbRef, set } from "firebase/database";
import { storage } from '../../firebase';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import { v4 } from 'uuid';
import Display from './Display';

const UploadImage = () => {
  const[value, setValue] = React.useState({
    image: '',
    text: ''
  })

  const [data, setData] = React.useState(null);

  const handleChange = (e) => {
    e.preventDefault()
    setValue({
      ...value,
      [e.target.name]: e.target.value
    })
  }



  const uploadImage = (e) => {
    e.preventDefault()
    
    if(value.image == null) {
      return alert("Kindly Input image")
    }
    else if(value.text == null) {
      return alert("Kindly Input text")
    }
    else if (value.image == null && value.text == null) {
      return alert("Kindly Input image and text")
    }
    const imageRef = ref(storage, `images/ ${value.image.name + v4()}`);
    uploadBytes(imageRef, value.image).then(() => {
      console.log('Image Uploaded')
    }).catch((error) => {
      console.log(error)
    });
    getDownloadURL(imageRef).then((url) => {
      console.log(url)
      const db = getDatabase();
      set(dbRef(db, 'images/' + value.image.name + v4()), {
        imageUrl: url,
        text: value.text
      })
    })

    //  useEffect(() => {
    //    const db = getDatabase();
    //    get(child(ref(db, "images/"), file.name))
    //      .then((snapshot) => {
    //        if (snapshot.exists()) {
    //          setData(snapshot.val());
    //        } else {
    //          console.log("No data available");
    //        }
    //      })
    //      .catch((error) => {
    //        console.error(error);
    //      });
    //  }, []);
  }

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
              onChange={handleChange}
              type="file"
            />
          </div>
          <div className="text-div">
            <textarea
              className="text-input"
              placeholder="A little Recap ..."
              onChange={handleChange}
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
}

export default UploadImage