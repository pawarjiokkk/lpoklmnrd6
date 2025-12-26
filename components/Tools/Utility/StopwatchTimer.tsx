
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Timer } from 'lucide-react';

const StopwatchTimer: React.FC = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (running) {
      timerRef.current = window.setInterval(() => {
        setTime(prev => prev + 10);
      }, 10);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [running]);

  const formatTime = (ms: number) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    const centi = Math.floor((ms % 1000) / 10);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${centi.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm max-w-lg mx-auto text-center">
      <div className="bg-gray-900 p-12 rounded-[2.5rem] mb-10 border-8 border-gray-800 shadow-2xl">
        <div className="text-6xl font-black text-primary font-mono tabular-nums">{formatTime(time)}</div>
      </div>
      <div className="flex space-x-4">
        <button 
          onClick={() => setRunning(!running)} 
          className={`flex-1 py-5 rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all ${running ? 'bg-orange-100 text-orange-600' : 'bg-primary text-gray-900 shadow-lg'}`}
        >
          {running ? <><Pause className="w-6 h-6" /> <span>Pause</span></> : <><Play className="w-6 h-6" /> <span>Start</span></>}
        </button>
        <button 
          onClick={() => { setTime(0); setRunning(false); }} 
          className="px-8 py-5 bg-gray-100 text-gray-400 rounded-2xl hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default StopwatchTimer;
