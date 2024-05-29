import React, { useState, useEffect } from "react";
// import { get, child, getDatabase, ref } from "firebase/database";

const Display = () => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const db = getDatabase();
//     get(child(ref(db, "images/"), file.name))
//       .then((snapshot) => {
//         if (snapshot.exists()) {
//           setData(snapshot.val());
//         } else {
//           console.log("No data available");
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

  return (
    <div className="display-container">
      <div></div>
    </div>
  );
};

export default Display;
