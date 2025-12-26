
import React, { useState } from 'react';
import { Dices, RefreshCw } from 'lucide-react';

const RandomNumberGenerator: React.FC = () => {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [result, setResult] = useState<number | null>(null);

  const generate = () => {
    const res = Math.floor(Math.random() * (max - min + 1)) + min;
    setResult(res);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm max-w-md mx-auto text-center">
      <div className="grid grid-cols-2 gap-4 mb-8 text-left">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Min Range</label>
          <input type="number" value={min} onChange={e => setMin(parseInt(e.target.value))} className="w-full p-4 bg-gray-50 rounded-xl" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Max Range</label>
          <input type="number" value={max} onChange={e => setMax(parseInt(e.target.value))} className="w-full p-4 bg-gray-50 rounded-xl" />
        </div>
      </div>
      <div className="mb-8">
        <div className="text-sm text-gray-400 mb-2 font-bold uppercase tracking-widest">Generated Result</div>
        <div className="text-7xl font-black text-primary py-8 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
          {result ?? '?'}
        </div>
      </div>
      <button onClick={generate} className="w-full py-5 bg-gray-900 text-white font-bold rounded-2xl flex items-center justify-center space-x-2 text-xl">
        <Dices className="w-6 h-6" />
        <span>Roll Dice</span>
      </button>
    </div>
  );
};

export default RandomNumberGenerator;
