import DragDrop from './js/dragDrop.js'


new DragDrop()
  // Focus Notification Logic
  let average = null;
  let notificationTimeout = null;

  // Fetch the average from the server
  const fetchAverage = async () => {
    try {
      const response = await fetch("http://localhost:5001/get-average");
      if (response.ok) {
        const data = await response.json();
        const fetchedAverage = data.two_minute_average;
        console.log("2-Minute Average:", fetchedAverage);

        average = fetchedAverage;
        showFocusNotification();
      } else {
        console.log("No data available yet.");
      }
    } catch (error) {
      console.error("Error fetching average:", error);
    }
  };

  // Fetch average every 2 minutes
  setInterval(fetchAverage, 120000); // This fetches the average every 2 minutes

  // Function to show the notification
  const showFocusNotification = () => {
    // Only show notification if the average is above a certain threshold
    if (average !== null && average > 3.43) {  
        const container = document.querySelector('.container'); // Selects the element with class="container"
  
        // Check if the container exists
        if (!container) {
          console.error('Error: Container element not found.');
          return; // Exit the function to prevent further errors
        }
      
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.innerHTML = `<p style="background: orange;">You're focused!</p>`;
        
        // Append the notification to the container
        container.appendChild(notification);

      // Hide notification after 10 seconds
      if (notificationTimeout) {
        clearTimeout(notificationTimeout); // Clear any existing timeout
      }

      notificationTimeout = setTimeout(() => {
        notification.remove();
      }, 10000);
    }
  };
showFocusNotification()