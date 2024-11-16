import numpy as np
from pylsl import StreamInlet, resolve_stream

# Sampling rate for Muse 2
SAMPLING_RATE = 256  # 256 Hz

# Buffer size (1-second window of data)
BUFFER_SIZE = SAMPLING_RATE

def calculate_beta_alpha_ratio(eeg_data, sampling_rate):
    """
    Calculate the Beta/Alpha power ratio from EEG data.
    """
    # Apply FFT to the EEG data
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

def main():
    print("Resolving EEG stream...")
    streams = resolve_stream('type', 'EEG') 
    print("here") # Find EEG streams
    if not streams:
        print("No EEG streams found. Exiting.")
        return

    inlet = StreamInlet(streams[0])
    print("EEG stream resolved. Starting data collection...")

    buffer = []
    print("Streaming data... Press Ctrl+C to stop.")
    try:
        while True:
            # Pull a single sample from the EEG stream
            sample, timestamp = inlet.pull_sample(timeout=0.01)  # Wait up to 10 ms
            if sample is None:
                continue  # Skip if no sample is received within the timeout

            buffer.append(sample[0])  # Use the TP9 channel (index 0)

            # If buffer size reaches 1 second, process the data
            if len(buffer) >= BUFFER_SIZE:
                ratio = calculate_beta_alpha_ratio(buffer[:BUFFER_SIZE], SAMPLING_RATE)
                print(f"Beta/Alpha Ratio: {ratio:.2f}")

                # Clear the buffer
                buffer = buffer[BUFFER_SIZE:]

    except KeyboardInterrupt:
        print("\nStreaming stopped. Exiting program.")

if __name__ == "__main__":
    main()
