import { createFileRoute, Link } from '@tanstack/react-router'
import { memo, useEffect, useState } from 'react';

export const Route = createFileRoute('/pomodoro')({
  component: PomodoroTimer,
})

const TimerDisplay = memo(({ timeLeft }: { timeLeft: number }) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return <div className="timer-display">{formatTime(timeLeft)}</div>;
});

function PomodoroTimer() {
   const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
    const [isRunning, setIsRunning] = useState(false);
    const [tasks, setTasks] = useState<string[]>([]);
    const [newTask, setNewTask] = useState('');
  
    useEffect(() => {
      let timer: NodeJS.Timeout | undefined;
      if (isRunning) {
        timer = setInterval(() => {
          setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
      } else {
        clearInterval(timer);
      }
      return () => clearInterval(timer);
    }, [isRunning]);
  
    const addTask = () => {
      if (newTask.trim()) {
        setTasks([...tasks, newTask]);
        setNewTask('');
      }
    };
  
    return (
      <div className="pomodoro-timer">
        <h1>Pomodoro Timer</h1>
        <TimerDisplay timeLeft={timeLeft} />
        <div className="controls">
          <button onClick={() => setIsRunning(!isRunning)}>
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button onClick={() => setTimeLeft(25 * 60)}>Reset</button>
        </div>
        <div className="task-section">
          <h2>Tasks</h2>
          <div className="task-input">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task"
            />
            <button onClick={addTask}>Add</button>
          </div>
          <ul className="task-list">
            {tasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        </div>
        <Link to="/about" className="nav-link">Go to About Page</Link>
      </div>
    );
}
