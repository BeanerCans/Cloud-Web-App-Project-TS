'use client';

import { useState } from 'react';

export default function PrelabPage() {
  // Example questions
  const [answers, setAnswers] = useState<string[]>(['', '', '']);

  const questions = [
    'What is VSCode?',
    'What is Node.js used for?',
    'Why do we use version control systems like Git?',
  ];

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Pre-lab Questions</h1>
      <form className="space-y-6">
        {questions.map((q, i) => (
          <div key={i}>
            <label className="block font-semibold mb-1">{q}</label>
            <textarea
              className="border p-2 w-full"
              rows={3}
              value={answers[i]}
              onChange={e => {
                const updated = [...answers];
                updated[i] = e.target.value;
                setAnswers(updated);
              }}
            />
          </div>
        ))}
        <button
          type="submit"
          className="mt-4 px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200"
          onClick={e => {
            e.preventDefault();
            alert('Answers submitted!');
          }}
        >
          Submit
        </button>
      </form>
    </main>
  );
}