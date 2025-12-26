
import React, { useState } from 'react';

const PercentageCalculator: React.FC = () => {
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const v1 = parseFloat(val1);
    const v2 = parseFloat(val2);
    if (!isNaN(v1) && !isNaN(v2)) {
      setResult((v1 / 100) * v2);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm max-w-2xl mx-auto">
      <h3 className="text-xl font-bold mb-6">What is X% of Y?</h3>
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-1 w-full">
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Percentage (X)</label>
          <input 
            type="number" 
            className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary"
            value={val1}
            onChange={(e) => setVal1(e.target.value)}
            placeholder="%"
          />
        </div>
        <div className="text-gray-400 font-bold">of</div>
        <div className="flex-1 w-full">
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Value (Y)</label>
          <input 
            type="number" 
            className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary"
            value={val2}
            onChange={(e) => setVal2(e.target.value)}
            placeholder="e.g. 500"
          />
        </div>
      </div>
      
      <button 
        onClick={calculate}
        className="w-full mt-8 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800"
      >
        Calculate
      </button>

      {result !== null && (
        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
          <div className="text-sm text-gray-500 mb-1">Result:</div>
          <div className="text-4xl font-extrabold text-primary">{result}</div>
        </div>
      )}
    </div>
  );
};

export default PercentageCalculator;
