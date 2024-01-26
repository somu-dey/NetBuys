import React, { useState, useEffect } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { database } from "../components/firebase";

const MyWishlist = () => {
  const [fieldValues, setFieldValues] = useState([]);
  const userExist = JSON.parse(localStorage.getItem("user"));
  const userId = userExist.uid;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userFavouritesRef = collection(
          database,
          "Favourites",
          userId,
          "UserFavourites"
        );
        const querySnapshot = await getDocs(userFavouritesRef);

        const valuesArray = querySnapshot.docs.map((doc) => doc.data().id);

        setFieldValues(valuesArray);

        // Subscribe to changes in the 'UserFavourites' collection
        const unsubscribe = onSnapshot(userFavouritesRef, (snapshot) => {
          const updatedValuesArray = snapshot.docs.map((doc) => doc.data().id);
          setFieldValues(updatedValuesArray);
        });

        // Unsubscribe from the snapshot listener when the component unmounts
        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  console.log(fieldValues);

  return (
    <div>
      {fieldValues.map((data, index) => (
        <h2 key={index}>{data}</h2>
      ))}
    </div>
  );
};

export default MyWishlist;
