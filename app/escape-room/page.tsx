'use client';

import { useEffect, useState } from 'react';

// -----------------------------
// 1️⃣ MAIN COMPONENT
// -----------------------------
type Stage = 'intro' | 'stage1' | 'stage2' | 'stage3' | 'complete';

export default function EscapeRoom() {
  const [stage, setStage] = useState<Stage>('intro');
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  // Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (running) timer = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, [running]);

  function startGame() {
    setStage('stage1');
    setRunning(true);
  }

  // Save progress function
  async function saveProgress(stage: string, time: number) {
    const res = await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentId: '12345678',
        stage,
        time,
      }),
    });
    if (res.ok) alert('✅ Progress saved!');
    else alert('❌ Failed to save progress.');
  }

  return (
    <main
      className="min-h-screen bg-cover bg-center p-4 text-white"
      style={{ backgroundImage: "url('/escape-room-bg.jpg')" }}
    >
      <div className="backdrop-blur-md bg-black/50 p-6 rounded max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Escape Room</h1>
        <p className="text-lg mb-4">⏱️ Time: {time}s</p>

        {stage === 'intro' && <Intro startGame={startGame} />}
        {stage === 'stage1' && (
          <Stage1
            next={() => setStage('stage2')}
            save={() => saveProgress('stage1', time)}
          />
        )}
        {stage === 'stage2' && (
          <Stage2
            next={() => setStage('stage3')}
            save={() => saveProgress('stage2', time)}
          />
        )}
        {stage === 'stage3' && (
          <Stage3
            next={() => setStage('complete')}
            save={() => saveProgress('stage3', time)}
          />
        )}
        {stage === 'complete' && (
          <Complete
            time={time}
            save={() => saveProgress('complete', time)}
          />
        )}
      </div>
    </main>
  );
}

// -----------------------------
// 2️⃣ STAGE COMPONENTS
// -----------------------------
function Intro({ startGame }: { startGame: () => void }) {
  return (
    <div>
      <p>Welcome to the coding escape room! Complete 3 coding tasks to escape.</p>
      <button
        onClick={startGame}
        className="mt-4 px-4 py-2 bg-green-600 rounded"
      >
        Start Game
      </button>
    </div>
  );
}

// Stage 1
function Stage1({ next, save }: { next: () => void; save: () => void }) {
  const [input, setInput] = useState('');
  const correct = '<h1>Hello World</h1>';
  const [message, setMessage] = useState('');

  function check() {
    if (input.trim() === correct) {
      setMessage('✅ Correct! Moving to Stage 2...');
      setTimeout(next, 1500);
    } else {
      setMessage('❌ Incorrect. Try again.');
    }
  }

  return (
    <div>
      <h2 className="text-2xl mb-2">Stage 1: Format the code correctly</h2>
      <textarea
        className="w-full text-black p-2 mt-2"
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="flex gap-2 mt-2">
        <button onClick={check} className="px-4 py-2 bg-blue-600 rounded">
          Submit
        </button>
        <button onClick={save} className="px-4 py-2 bg-green-700 rounded">
          Save Progress
        </button>
      </div>
      <p className="mt-2">{message}</p>
    </div>
  );
}

// Stage 2
function Stage2({ next, save }: { next: () => void; save: () => void }) {
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');

  function check() {
    if (answer.trim() === 'console.log("Hello, world!")') {
      setMessage('✅ Correct! Moving to Stage 3...');
      setTimeout(next, 1500);
    } else {
      setMessage('❌ Hint: Fix the syntax of the JS log statement.');
    }
  }

  return (
    <div>
      <h2 className="text-2xl mb-2">Stage 2: Debug the code</h2>
      <p>Fix this line: <code>consolelog("Hello, world!")</code></p>
      <input
        className="w-full text-black p-2 mt-2"
        placeholder="Enter fixed code"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <div className="flex gap-2 mt-2">
        <button onClick={check} className="px-4 py-2 bg-blue-600 rounded">
          Submit
        </button>
        <button onClick={save} className="px-4 py-2 bg-green-700 rounded">
          Save Progress
        </button>
      </div>
      <p className="mt-2">{message}</p>
    </div>
  );
}

// Stage 3
function Stage3({ next, save }: { next: () => void; save: () => void }) {
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');

  function check() {
    const expected = 'for(let i=0;i<=1000;i++){console.log(i);}';
    const normalized = input.replace(/\s+/g, '');
    if (normalized === expected) {
      setMessage('✅ Great job! You escaped!');
      setTimeout(next, 1500);
    } else {
      setMessage('❌ Hint: Use a for loop from 0 to 1000.');
    }
  }

  return (
    <div>
      <h2 className="text-2xl mb-2">Stage 3: Write a loop</h2>
      <textarea
        className="w-full text-black p-2 mt-2"
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="flex gap-2 mt-2">
        <button onClick={check} className="px-4 py-2 bg-blue-600 rounded">
          Submit
        </button>
        <button onClick={save} className="px-4 py-2 bg-green-700 rounded">
          Save Progress
        </button>
      </div>
      <p className="mt-2">{message}</p>
    </div>
  );
}

// Completion Screen
function Complete({ time, save }: { time: number; save: () => void }) {
  return (
    <div>
      <h2 className="text-2xl mb-2">🎉 You Escaped!</h2>
      <p>You finished in {time} seconds.</p>
      <button
        onClick={save}
        className="mt-4 px-4 py-2 bg-green-700 rounded"
      >
        Save Final Result
      </button>
    </div>
  );
}
