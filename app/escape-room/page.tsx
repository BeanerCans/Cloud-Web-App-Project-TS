'use client';

import { useEffect, useState } from 'react';

type Stage = 'intro' | 'stage1' | 'stage2' | 'stage3' | 'complete';

export default function EscapeRoom() {
  const [stage, setStage] = useState<Stage>('intro');
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  // Simple manual timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (running) {
      timer = setInterval(() => setTime((t) => t + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [running]);

  function startGame() {
    setStage('stage1');
    setRunning(true);
  }

  return (
    <main
      className="min-h-screen bg-cover bg-center p-4 text-white"
      style={{
        backgroundImage: "url('/escape-room-bg.jpg')", // add your image to /public
      }}
    >
      <div className="backdrop-blur-md bg-black/50 p-6 rounded max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Escape Room</h1>
        <TimerDisplay time={time} />
        {stage === 'intro' && (
          <Intro startGame={startGame} />
        )}
        {stage === 'stage1' && (
          <Stage1 next={() => setStage('stage2')} />
        )}
        {stage === 'stage2' && (
          <Stage2 next={() => setStage('stage3')} />
        )}
        {stage === 'stage3' && (
          <Stage3 next={() => setStage('complete')} />
        )}
        {stage === 'complete' && <Complete time={time} />}
      </div>
    </main>
  );
}

function TimerDisplay({ time }: { time: number }) {
  const mins = Math.floor(time / 60);
  const secs = time % 60;
  return (
    <p className="text-lg mb-4">
      ⏱️ Time: {mins}:{secs.toString().padStart(2, '0')}
    </p>
  );
}

function Intro({ startGame }: { startGame: () => void }) {
  return (
    <div>
      <p>Welcome to the coding escape room! You must complete 3 coding challenges to escape.</p>
      <button
        onClick={startGame}
        className="mt-4 px-4 py-2 bg-green-600 rounded"
      >
        Start Game
      </button>
    </div>
  );
}

function Stage1({ next }: { next: () => void }) {
    const [input, setInput] = useState('');
    const correct = '<h1>Hello World</h1>';
    const [message, setMessage] = useState('');

    function check() {
        if (input.trim() === correct) {
            setMessage('Correct! Moving to next stage.');
            setTimeout(next, 1500);
        } else {
            setMessage('Incorrect. Try formatting the code properly.');
        }
    }

    return (
        <div>
            <h2 className="text-2xl mb-2"> Stage 1: Formate the code correctly</h2>
            <p>Enter a valid HTML tag that prints "Hello World":</p>
            <textarea
                className="w-full text-black p-2 mt-2"
                rows={3}
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={check} className="mt-2 px-4 py-2 bg-blue-600 rounded">
                Submit
            </button>
            <p className="mt-2">{message}</p>
        </div>
    );
}

function Stage2({ next }: { next: () => void }) {
    const [answer, setAnswer] = useState('');
    const [message, setMessage] = useState('');

    function check() {
        if (answer.trim() === 'console.log("Hello, world!");') {
            setMessage('Great! Moving to next stage.');
            setTimeout(next, 1500);
        } else {
            setMessage('Hint: You need to fix the synax of a JavaScript log statement.')
        }
    }

    return (
        <div>
            <h2 className="text-2xl mb-2">Stage 2: Debug the code</h2>
            <p>Fix this line: <code>consolelog("Hello, world!")</code></p>
            <input
                className="w-full text-black p-2 mt-2"
                placeholder="Enter corrected code"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
            />
            <button onClick={check} className="mt-2 px-4 py-2 bg-blue-600 rounded">
                Submit
            </button>
            <p className="mt-2">{message}</p>    
        </div>
    );
}

function Stage3({ next }: { next: () => void }) {
    const [input, setInput] = useState('');
    const [message, setMessage] = useState('');

    function check() {
        const expected = 'for(let i=0;i<=1000;i++){console.log(i);}';
        const normalised = input.replace(/\s+/g, '');
        if (normalised === expected) {
            setMessage('Perfect loop! You escaped!');
            setTimeout(next, 1500);
        } else {
            setMessage('That loop is not quite right. Remember to log numbers from 0 to 1000.');
        }
    }

    return (
        <div>
            <h2 className="text-2xl mb-2">Stage 3: Write a loop</h2>
            <p>Write a JavaScript loop that logs numbers from 0 to 1000:</p>
            <textarea
                className="w-full text-black p-2 mt-2"
                rows={3}
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={check} className="mt-2 px-4 py-2 bg-blue-600 rounded">
                Submit
            </button>
            <p className="mt-2">{message}</p>
        </div>
    );
}

function Complete({ time }: {time: number}) {
    return (
        <div>
            <h2 className="text-2xl mb-2">CONGRATULATIONS!!! YOU ESCAPED!</h2>
            <p>You completed the Escape Room in {time} seconds.</p>
            <p className="mt-4">Well done developer! didn't cheat did you?</p>
        </div>
    );
}