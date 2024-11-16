from flask import Flask, jsonify
from threading import Thread
from pylsl import StreamInlet, resolve_byprop
import numpy as np

app = Flask(__name__)

# Global variable to store the Beta/Alpha ratio
beta_alpha_ratio = None

# Constants
SAMPLING_RATE = 256
BUFFER_SIZE = SAMPLING_RATE

def calculate_beta_alpha_ratio(eeg_data, sampling_rate):
    """
    Calculate the Beta/Alpha power ratio from EEG data.
    """
    fft_result = np.fft.fft(eeg_data)
    frequencies = np.fft.fftfreq(len(eeg_data), 1 / sampling_rate)
    power = np.abs(fft_result) ** 2

    # Define frequency bands
    alpha_band = (frequencies >= 8) & (frequencies <= 12)  # Alpha: 8-12 Hz
    beta_band = (frequencies >= 13) & (frequencies <= 30)  # Beta: 13-30 Hz

    # Calculate power in Alpha and Beta bands
    alpha_power = np.sum(power[alpha_band])
    beta_power = np.sum(power[beta_band])

    # Return Beta/Alpha ratio
    return beta_power / alpha_power if alpha_power != 0 else 0


def process_muse_data():
    """Continuously process EEG data from the MuseLSL stream."""
    global beta_alpha_ratio

    print("Resolving EEG stream using resolve_byprop...")
    streams = resolve_byprop('type', 'EEG', timeout=10)
    if not streams:
        print("No EEG streams found. Make sure the MuseLSL stream is running.")
        return

    inlet = StreamInlet(streams[0])
    buffer = []

    print("Processing EEG data...")
    while True:
        try:
            sample, _ = inlet.pull_sample()
            buffer.append(sample[0])  # TP9 channel, adjust if needed

            if len(buffer) >= BUFFER_SIZE:
                beta_alpha_ratio = calculate_beta_alpha_ratio(buffer[:BUFFER_SIZE], SAMPLING_RATE)
                buffer = buffer[BUFFER_SIZE:]
        except Exception as e:
            print(f"Error processing data: {e}")
            break


@app.route('/get-ratio', methods=['GET'])
def get_ratio():
    """API endpoint to fetch the current Beta/Alpha ratio."""
    # print(beta_alpha_ratio)
    return jsonify({"beta_alpha_ratio": beta_alpha_ratio})


if __name__ == '__main__':
    # Run the data processing in a background thread
    Thread(target=process_muse_data, daemon=True).start()
    # Start the Flask API
    app.run(port=5000)

