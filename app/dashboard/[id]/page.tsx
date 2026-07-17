"use client"

import { useEffect, useState } from 'react';

type DaySession = {
  day: number;
  lesson: string;
  task: string;
  encouragement: string;
};

export default function Dashboard({ params }: { params: { id: string } }) {
  const [session, setSession] = useState<DaySession | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/day', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: params.id }),
      });

      const data = await res.json();
      setSession(data);
    }

    load();
  }, [params.id]);

  if (!session) {
    return <p style={{ padding: 40 }}>Preparing your mentor session...</p>;
  }

  return (
    <main style={{ maxWidth: 700, margin: '60px auto', padding: 20 }}>
      <h2>Day {session.day}</h2>

      <h3 style={{ marginTop: 20 }}>What you’ll learn today</h3>
      <p>{session.lesson}</p>

      <h3 style={{ marginTop: 20 }}>Your one task</h3>
      <p>{session.task}</p>

      <p style={{ marginTop: 30, color: '#555' }}>
        {session.encouragement}
      </p>

      <button
        style={{
          marginTop: 30,
          padding: 14,
          width: '100%',
          background: '#16a34a',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
        onClick={() => alert('Task completed (next step coming)')}
      >
        I completed today’s task
      </button>
    </main>
  );
}