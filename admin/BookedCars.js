import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../components/firebase";
const BookedCars = () => {
  const [finalData, setFinalData] = useState([]);
  const convertDate = (timestamp) => {
    const milliseconds = timestamp * 1000;
    const date = new Date(milliseconds);
    // console.log(date);
    const options = {
      month: "long", // Full month name (e.g., "March")
      day: "2-digit", // Two-digit day (e.g., "21")
      year: "numeric", // Full year (e.g., "2024")
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        // setLoading(true);

        const subcollectionRef = collection(database, "BookedCars");
        const getValue = await getDocs(subcollectionRef);

        setFinalData(
          getValue.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  // console.log(finalData);
  return (
    <div className="container-fluid d-flex flex-column">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <h1 className="p-4">Currently Booked Cars</h1>
      </div>
      <div
        className="d-flex flex-wrap justify-content-center w-100 align-items-center "
        style={{
          gap: "3rem",
          height: "100%",
          flexDirection: "row",
          flexWrap: "wrap",
          // border: "4px solid black",
          boxSizing: "border-box",
        }}
      >
        {finalData.map((data) => (
          <div
            className="row"
            key={data.id}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              flexWrap: "wrap",
              // width: "10rem",
            }}
          >
            <div
              style={{
                borderRadius: "1rem",
                backgroundColor: "#FA4226",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                padding: "1rem",
                // width: "10rem",
                color: "white",
              }}
            >
              <p>Email: {data?.email}</p>
              <p>Model Name: {data.model}</p>
              <p>Fuel Type: {data.fuel}</p>
              <p>Start Date: {convertDate(data.startDate.seconds)}</p>
              <p>End Date: {convertDate(data.endDate.seconds)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookedCars;
