import React, { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const PomodoroTimer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(0);

  const handleReset = () => {
    setKey((prevKey) => prevKey + 1);
    setIsPlaying(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white' }}>
      <h1>Pomodoro Timer</h1>
      <CountdownCircleTimer
        key={key}
        isPlaying={isPlaying}
        duration={25 * 60}
        colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000', 0.33]]}
        onComplete={() => {
          alert("Time’s up! Take a break.");
          return { shouldRepeat: false };
        }}
      >
        {({ remainingTime }) => {
          const minutes = Math.floor(remainingTime / 60);
          const seconds = remainingTime % 60;
          return (
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff' }}>
              {minutes}:{seconds.toString().padStart(2, '0')}
            </div>
          );
        }}
      </CountdownCircleTimer>
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => setIsPlaying((prev) => !prev)}>
          {isPlaying ? 'Pause' : 'Start'}
        </button>
        <button onClick={handleReset} style={{ marginLeft: '10px' }}>Reset</button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
