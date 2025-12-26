
import React, { useState } from 'react';
import { Repeat } from 'lucide-react';

const CurrencyConverter: React.FC = () => {
  const [rate, setRate] = useState('1');
  const [amount, setAmount] = useState('100');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const r = parseFloat(rate);
    const a = parseFloat(amount);
    if (r && a) setResult(r * a);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm max-w-lg mx-auto">
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Exchange Rate (1 From = ? To)</label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none" />
        </div>
        <div className="flex justify-center"><Repeat className="w-6 h-6 text-gray-200" /></div>
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Amount to Convert</label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none" />
        </div>
        <button onClick={calculate} className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl">Convert</button>
        {result !== null && (
          <div className="pt-8 border-t border-gray-100 text-center">
            <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Result</span>
            <div className="text-4xl font-black text-primary mt-2">{result.toFixed(2)}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
