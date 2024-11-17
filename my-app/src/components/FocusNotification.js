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

  // Fetching average every 2 mins
  useEffect(() => {
    const interval = setInterval(fetchAverage, 120000);
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  // Use effect to trigger notification based on average value
  useEffect(() => {
    if (average !== null && average > 3.43) {
      setNotification(true);

      // Set timeout to hide notification after 10 seconds
      const timeout = setTimeout(() => {
        setNotification(false); // Hide notification after 10 seconds
      }, 10000);

      // Clean up timeout when the component unmounts or when the notification is cleared
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
