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
  setInterval(fetchAverage, 5000); // This fetches the average every 2 minutes

  // Function to show the notification
  const showFocusNotification = () => {
    if (average !== null && average > 4.5) {
      const container = document.querySelector('.container'); // Selects the element with class="container"
  
      // Check if the container exists
      if (!container) {
        console.error('Error: Container element not found.');
        return; // Exit the function to prevent further errors
      }
  
      // Check if a notification already exists
      let notification = container.querySelector('.notification');
      if (!notification) {
        // Create the notification if it doesn't exist
        notification = document.createElement('div');
        notification.classList.add('notification');
        container.appendChild(notification);
      }
  
      // Update the notification content
      notification.innerHTML = `<p style="background: orange;">You're focused!</p>`;
  
      // Clear any existing timeout
      if (notificationTimeout) {
        clearTimeout(notificationTimeout);
      }
  
      // Set a timeout to remove the notification after 5 seconds
      notificationTimeout = setTimeout(() => {
        notification.remove();
      }, 5000);
    }
  };
showFocusNotification()