import numpy as np
import matplotlib.pyplot as plt
from pylsl import StreamInlet, resolve_byprop
from plyer import notification
from flask import Flask, jsonify, request
from flask_cors import CORS
import threading


# Flask app initialization
app = Flask(__name__)

CORS(app)

# Sampling rate for Muse 2
SAMPLING_RATE = 256  # 256 Hz

# Buffer size (1-second window of data)
BUFFER_SIZE = SAMPLING_RATE

# Duration for 2-minute average (in seconds)
TWO_MINUTES = 10

# Global variable to store the latest 2-minute average
latest_two_minute_avg = None

def calculate_beta_alpha_ratio(eeg_data, sampling_rate):
    """
    Calculate the Beta/Alpha power ratio from EEG data.
    """
    fft_result = np.fft.fft(eeg_data)
    frequencies = np.fft.fftfreq(len(eeg_data), 1 / sampling_rate)
    power = np.abs(fft_result) ** 2

    alpha_band = (frequencies >= 8) & (frequencies <= 12)  # Alpha: 8-12 Hz
    beta_band = (frequencies >= 13) & (frequencies <= 30)  # Beta: 13-30 Hz

    alpha_power = np.sum(power[alpha_band])
    beta_power = np.sum(power[beta_band])

    return beta_power / alpha_power if alpha_power != 0 else 0

def low_focus(two_min_avg):
    if two_min_avg < 4.5:  
        show_notif()

def show_notif():
    notification.notify(
        title='Time to Refocus',
        message='Visit our app to help refocus.',
        timeout=10
    )

def stream_eeg_data():
    global latest_two_minute_avg
    print("Resolving EEG stream...")
    streams = resolve_byprop('type', 'EEG')  # Find EEG streams
    if not streams:
        print("No EEG streams found. Exiting.")
        return

    inlet = StreamInlet(streams[0])
    print("EEG stream resolved. Starting data collection...")

    buffers = {0: [], 1: [], 2: [], 3: []}  # TP9, AF7, AF8, TP10
    averages = []  # Store 1-second averages for 2-minute calculation

    plt.ion()  # Interactive mode to update the graph in real-time
    fig, ax = plt.subplots()
    ax.set_xlabel("Time (s)")
    ax.set_ylabel("Beta/Alpha Ratio")
    ax.set_title("Beta/Alpha Ratio Over Time")
    line, = ax.plot([], [], 'b-', label="Beta/Alpha Ratio")
    ax.legend()

    time_counter = 0  # Time counter for the x-axis
    x_data = []  # Time data for plotting
    y_data = []  # Beta/Alpha ratio data for plotting

    try:
        while True:
            sample, timestamp = inlet.pull_sample(timeout=0.01)
            if sample is None:
                continue

            for channel in range(4):
                buffers[channel].append(sample[channel])

            if all(len(buffers[channel]) >= BUFFER_SIZE for channel in buffers):
                ratios = []
                for channel in range(4):
                    channel_data = buffers[channel][:BUFFER_SIZE]
                    ratio = calculate_beta_alpha_ratio(channel_data, SAMPLING_RATE)
                    ratios.append(ratio)
                    buffers[channel] = buffers[channel][BUFFER_SIZE:]

                average_ratio = np.mean(ratios)
                averages.append(average_ratio)
                x_data.append(time_counter)
                y_data.append(average_ratio)

                line.set_xdata(x_data)
                line.set_ydata(y_data)
                ax.relim()
                ax.autoscale_view()
                plt.pause(0.01)

                if len(averages) >= TWO_MINUTES:
                    latest_two_minute_avg = np.mean(averages)
                    print(f"2-Minute Average Beta/Alpha Ratio: {latest_two_minute_avg:.2f}")
                    low_focus(latest_two_minute_avg)
                    averages = []

                time_counter += 1

    except KeyboardInterrupt:
        print("\nStreaming stopped. Exiting program.")
        plt.ioff()
        plt.show()

# Flask endpoint to get the latest 2-minute average
@app.route("/get-average", methods=["GET"])
def get_average():
    global latest_two_minute_avg
    if latest_two_minute_avg is not None:
        return jsonify({"two_minute_average": latest_two_minute_avg}), 200
    else:
        return jsonify({"message": "No data available yet"}), 204

# Run Flask app in a separate thread
def start_flask_app():
    app.run(port=5001, debug=False)

if __name__ == "__main__":
    # Start the Flask app in a separate thread
    flask_thread = threading.Thread(target=start_flask_app)
    flask_thread.daemon = True
    flask_thread.start()

    # Start streaming EEG data
    stream_eeg_data()
