
import React, { useState } from 'react';

const UnitConverter: React.FC = () => {
  const [category, setCategory] = useState<'length' | 'weight' | 'temp'>('length');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<number | string>(0);

  const convert = (val: string) => {
    const v = parseFloat(val);
    if (isNaN(v)) { setOutput(0); return; }
    
    if (category === 'length') setOutput((v * 3.28084).toFixed(2) + ' ft (from m)');
    if (category === 'weight') setOutput((v * 2.20462).toFixed(2) + ' lbs (from kg)');
    if (category === 'temp') setOutput(((v * 9/5) + 32).toFixed(1) + ' °F (from °C)');
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm max-w-lg mx-auto">
      <div className="flex space-x-2 mb-8 bg-gray-50 p-2 rounded-2xl">
        {['length', 'weight', 'temp'].map(cat => (
          <button 
            key={cat}
            onClick={() => { setCategory(cat as any); setInput(''); setOutput(0); }}
            className={`flex-1 py-3 rounded-xl font-bold capitalize transition-all ${category === cat ? 'bg-primary text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Input Value ({category === 'temp' ? '°C' : category === 'length' ? 'Meters' : 'KG'})</label>
          <input 
            type="number" 
            className="w-full p-4 bg-gray-50 rounded-xl focus:ring-2 focus:ring-primary outline-none" 
            value={input}
            onChange={e => { setInput(e.target.value); convert(e.target.value); }}
          />
        </div>
        <div className="text-center text-gray-300">⬇️ CONVERTED TO ⬇️</div>
        <div className="p-8 bg-gray-900 rounded-2xl text-center">
          <div className="text-4xl font-extrabold text-primary">{output}</div>
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;
