const container = document.getElementById('container');

function createZigZagWave() {
    // Create an SVG element for the wave
    const svgNamespace = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNamespace, "svg");
    const polyline = document.createElementNS(svgNamespace, "polyline");
    svg.appendChild(polyline);
    svg.classList.add('wave');

    // Set random number of zig-zag lines (between 1 and 5)
    const lines = Math.floor(Math.random() * 10) + 1;

    // Generate points for the zig-zag path
    let points = "";
    let x = 0;
    let y = 0;
    const amplitude = Math.random() * 30 + 20; // Random amplitude between 20 and 50px
    const wavelength = Math.random() * 50 + 30; // Random wavelength between 30 and 80px
    let xOffset = Math.random() * 50;  // Random x offset to make waves uneven

    for (let i = 0; i < lines; i++) {
        x += wavelength + xOffset;
        y = (i % 2 === 0 ? amplitude : -amplitude);
        points += `${x},${y} `;
    }

    polyline.setAttribute("points", points);
    polyline.setAttribute("stroke-linejoin", "round");

    // Randomize scale for size - for bigger difference in sizes
    const scale = Math.random() * 1.5 + 0.5; // Scale between 0.5 and 2.5
    svg.style.setProperty('--scale', scale);

    // Random rotation angle for zig-zag effect
    const rotationAngle = Math.random() * 60 - 30;  
    svg.style.setProperty('--rotation-angle', rotationAngle + 'deg');

    // Random position - Can start from anywhere (top, bottom, left, right)
    const edgeChoice = Math.floor(Math.random() * 4);  // Randomly select a starting edge (0: top, 1: right, 2: bottom, 3: left)
    let startX, startY;

    switch (edgeChoice) {
        case 0: // Top edge
            startX = Math.random() * window.innerWidth;
            startY = 0;
            break;
        case 1: // Right edge
            startX = window.innerWidth;
            startY = Math.random() * window.innerHeight;
            break;
        case 2: // Bottom edge
            startX = Math.random() * window.innerWidth;
            startY = window.innerHeight;
            break;
        case 3: // Left edge
            startX = 0;
            startY = Math.random() * window.innerHeight;
            break;
    }

    // Set random direction for wave's movement
    const angle = Math.random() * 360;  // Random angle between 0 and 360 degrees
    const distance = Math.random() * 100 + 300;  // Distance the wave travels

    // Calculate end position based on random angle
    const endX = startX + Math.cos(angle * Math.PI / 180) * distance;  // Horizontal movement
    const endY = startY + Math.sin(angle * Math.PI / 180) * distance;  // Vertical movement

    svg.style.setProperty('--start-x', startX + 'px');
    svg.style.setProperty('--start-y', startY + 'px');
    svg.style.setProperty('--end-x', endX + 'px');
    svg.style.setProperty('--end-y', endY + 'px');

    // Set random duration for the wave's movement
    const duration = Math.random() * 6 + 4; // Between 4 and 10 seconds
    svg.style.animationDuration = duration + 's, ' + (Math.random() * 3 + 1) + 's';

    // Randomize the wave opacity for dynamic brightness effect
    const opacity = Math.random() * 0.6 + 0.4; // Random opacity between 0.4 and 1
    svg.style.opacity = opacity;

    container.appendChild(svg);

    // Remove the wave after it falls out of view
    setTimeout(() => {
        svg.remove();
    }, duration * 2000);
}

// Create new waves at shorter intervals for higher frequency
setInterval(createZigZagWave, 80); // Adjust frequency of wave creation (faster rate)
// Get references to the DOM elements
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Function to add a new task to the list
function addTask() {
    const taskText = taskInput.value.trim(); // Get the value from the input
    if (taskText !== "") { // If input is not empty
        // Create a new list item
        const li = document.createElement('li');
        
        // Create checkbox and add it to the list item
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        
        // Create a text node for the task description
        const textNode = document.createTextNode(taskText);
        
        // Append the checkbox and text to the list item
        li.appendChild(checkbox);
        li.appendChild(textNode);
        
        // Append the list item to the task list
        taskList.appendChild(li);
        
        // Clear the input field
        taskInput.value = "";
        
        // Add event listener to remove task when checkbox is ticked
        checkbox.addEventListener('change', function() {
            if (checkbox.checked) {
                li.style.display = 'none'; // Hide the task when checked
            }
        });
    }
}

// Add event listener to the "Add" button
addTaskButton.addEventListener('click', addTask);

// Allow pressing Enter to add a task
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});
