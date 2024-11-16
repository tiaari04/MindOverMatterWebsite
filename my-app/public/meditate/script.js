document.addEventListener('DOMContentLoaded', () => {
  // Breathing functionality
  let isBreathingIn = true;
  const totalTime = 2 * 60 * 1000; // 2 minutes in milliseconds
  const intervalTime = 20; // Interval for smooth animation
  let elapsedTime = 0;

  // Timer bar element
  const timerBar = document.getElementById('timerBar');
  const breatheText = document.getElementById('breatheText');
  const backButton = document.getElementById('backButton');

  // Toggle breathing state every 5 seconds
  setInterval(() => {
    isBreathingIn = !isBreathingIn;
    breatheText.textContent = isBreathingIn ? 'Breathe In' : 'Breathe Out';
  }, 5000);

  // Update the timer bar every 20ms
  const timerInterval = setInterval(() => {
    elapsedTime += intervalTime;
    const progress = (elapsedTime / totalTime) * 100;
    timerBar.style.width = progress + '%';

    if (elapsedTime >= totalTime) {
      clearInterval(timerInterval); // Stop the timer when it reaches total time
    }
  }, intervalTime);

  // Handle back button click
  backButton.addEventListener('click', () => {
    window.history.back(); // Redirect to home page
  });

  // Wave functionality
  const container = document.getElementById("container");

  function createZigZagWave() {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNamespace, "svg");
    const polyline = document.createElementNS(svgNamespace, "polyline");
    svg.appendChild(polyline);
    svg.classList.add("wave");

    const lines = Math.floor(Math.random() * 10) + 1;
    let points = "";
    let x = 0;
    let y = 0;
    const amplitude = Math.random() * 30 + 20;
    const wavelength = Math.random() * 50 + 30;
    let xOffset = Math.random() * 50;

    for (let i = 0; i < lines; i++) {
      x += wavelength + xOffset;
      y = i % 2 === 0 ? amplitude : -amplitude;
      points += `${x},${y} `;
    }

    polyline.setAttribute("points", points);
    polyline.setAttribute("stroke-linejoin", "round");

    const scale = Math.random() * 1.5 + 0.5;
    svg.style.setProperty("--scale", scale);

    const rotationAngle = Math.random() * 60 - 30;
    svg.style.setProperty("--rotation-angle", rotationAngle + "deg");

    const edgeChoice = Math.floor(Math.random() * 4);
    let startX, startY;

    switch (edgeChoice) {
      case 0:
        startX = Math.random() * window.innerWidth;
        startY = 0;
        break;
      case 1:
        startX = window.innerWidth;
        startY = Math.random() * window.innerHeight;
        break;
      case 2:
        startX = Math.random() * window.innerWidth;
        startY = window.innerHeight;
        break;
      case 3:
        startX = 0;
        startY = Math.random() * window.innerHeight;
        break;
    }

    const angle = Math.random() * 360;
    const distance = Math.random() * 100 + 300;
    const endX = startX + Math.cos((angle * Math.PI) / 180) * distance;
    const endY = startY + Math.sin((angle * Math.PI) / 180) * distance;

    svg.style.setProperty("--start-x", startX + "px");
    svg.style.setProperty("--start-y", startY + "px");
    svg.style.setProperty("--end-x", endX + "px");
    svg.style.setProperty("--end-y", endY + "px");

    const duration = Math.random() * 6 + 4;
    svg.style.animationDuration = duration + "s, " + (Math.random() * 3 + 1) + "s";

    const opacity = Math.random() * 0.6 + 0.4;
    svg.style.opacity = opacity;

    container.appendChild(svg);

    setTimeout(() => {
      svg.remove();
    }, duration * 2000);
  }

  // Create waves every 80ms
  const waveInterval = setInterval(createZigZagWave, 80);

  // Cleanup function when the page is unloaded or the timer finishes
  setTimeout(() => {
    clearInterval(waveInterval); // Stop creating waves after the timer is done
  }, totalTime);

});
