
import React, { useState } from 'react';

const GSTCalculator: React.FC = () => {
  const [price, setPrice] = useState('1000');
  const [gstRate, setGstRate] = useState('18');
  const [type, setType] = useState<'add' | 'remove'>('add');
  const [result, setResult] = useState<{ amount: number, total: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(price);
    const r = parseFloat(gstRate);
    if (p && r) {
      if (type === 'add') {
        const gst = (p * r) / 100;
        setResult({ amount: gst, total: p + gst });
      } else {
        const total = p / (1 + r / 100);
        setResult({ amount: p - total, total: total });
      }
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="flex space-x-2 bg-gray-50 p-2 rounded-2xl mb-4">
          <button onClick={() => setType('add')} className={`flex-1 py-3 rounded-xl font-bold ${type === 'add' ? 'bg-primary text-gray-900 shadow-sm' : 'text-gray-400'}`}>Add GST</button>
          <button onClick={() => setType('remove')} className={`flex-1 py-3 rounded-xl font-bold ${type === 'remove' ? 'bg-primary text-gray-900 shadow-sm' : 'text-gray-400'}`}>Remove GST</button>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Price</label>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">GST Rate (%)</label>
            <input type="number" value={gstRate} onChange={e => setGstRate(e.target.value)} className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none" />
          </div>
        </div>
        <button onClick={calculate} className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl">Calculate GST</button>
        {result && (
          <div className="pt-8 border-t border-gray-100 grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-2xl text-center">
              <span className="text-xs font-bold text-gray-400">GST Amount</span>
              <div className="text-2xl font-bold">{result.amount.toFixed(2)}</div>
            </div>
            <div className="bg-primary/10 p-4 rounded-2xl text-center">
              <span className="text-xs font-bold text-gray-500">Net Total</span>
              <div className="text-2xl font-bold">{result.total.toFixed(2)}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GSTCalculator;
