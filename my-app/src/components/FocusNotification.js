import { useState, useEffect } from "react";

const FocusNotification = () => {
  const [average, setAverage] = useState(null); // State to store the fetched average
  const [notification, setNotification] = useState(false); // State to track notifications

  const fetchAverage = async () => {
    try {
      const response = await fetch("http://localhost:5001/get-average");
      if (response.ok) {
        const data = await response.json();
        const fetchedAverage = data.two_minute_average;
        console.log("2-Minute Average:", fetchedAverage);

        setAverage(fetchedAverage);
      } else {
        console.log("No data available yet.");
      }
    } catch (error) {
      console.error("Error fetching average:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchAverage, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (average !== null && average > 4.5) {
      setNotification(true);

      const timeout = setTimeout(() => {
        setNotification(false); 
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [average]);

  return (
    <div>
      {notification && (
        <div className="notification">
          <p>You're focused!</p>
        </div>
      )}
    </div>
  );
};

export default FocusNotification;
