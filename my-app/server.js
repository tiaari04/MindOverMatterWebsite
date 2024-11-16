const express = require("express");
const { spawn } = require("child_process");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Endpoint to start MuseLSL and Python script
app.post("/connect-muse", (req, res) => {
  console.log("Starting MuseLSL Stream...");

  // Start MuseLSL stream using spawn
  const museProcess = spawn("muselsl", ["stream", "--name", "Muse-AB89"]);

  // Handle MuseLSL output
  museProcess.stdout.on("data", (data) => {
    console.log(`MuseLSL Output: ${data.toString()}`);
  });

  // Handle MuseLSL errors
  museProcess.stderr.on("data", (data) => {
    console.error(`MuseLSL Error: ${data.toString()}`);
  });

  // Listen for MuseLSL process exit
  museProcess.on("close", (code) => {
    if (code === 0) {
      console.log("MuseLSL Stream started successfully. Running Python script...");

      // Start the Python script
      const pythonProcess = spawn("python", ["muse_focus_tracker.py"]);

      // Handle Python script output
      pythonProcess.stdout.on("data", (data) => {
        console.log(`Python Script Output: ${data.toString()}`);
      });

      // Handle Python script errors
      pythonProcess.stderr.on("data", (data) => {
        console.error(`Python Script Error: ${data.toString()}`);
      });

      // Listen for Python process exit
      pythonProcess.on("close", (code) => {
        console.log(`Python script exited with code ${code}`);
      });
    } else {
      console.error(`MuseLSL stream exited with code ${code}`);
    }
  });

  // Send immediate response to the client
  res.send("Attempting to connect MuseLSL stream and start Python script...");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
