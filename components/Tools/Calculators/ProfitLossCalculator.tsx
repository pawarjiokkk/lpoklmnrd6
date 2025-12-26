
import React, { useState } from 'react';

const ProfitLossCalculator: React.FC = () => {
  const [cost, setCost] = useState('');
  const [sale, setSale] = useState('');
  const [result, setResult] = useState<{ amount: number, percent: number, isProfit: boolean } | null>(null);

  const calculate = () => {
    const c = parseFloat(cost);
    const s = parseFloat(sale);
    if (c && s) {
      const diff = s - c;
      const pct = (diff / c) * 100;
      setResult({ amount: Math.abs(diff), percent: Math.abs(pct), isProfit: diff >= 0 });
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Cost Price</label>
            <input type="number" value={cost} onChange={e => setCost(e.target.value)} className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Sale Price</label>
            <input type="number" value={sale} onChange={e => setSale(e.target.value)} className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none" />
          </div>
        </div>
        <button onClick={calculate} className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl">Check Profit/Loss</button>
        {result && (
          <div className="pt-8 border-t border-gray-100 text-center">
            <div className={`text-xl font-black uppercase tracking-widest ${result.isProfit ? 'text-green-500' : 'text-red-500'}`}>
              {result.isProfit ? 'PROFIT' : 'LOSS'}
            </div>
            <div className="text-5xl font-black text-gray-900 mt-2">{result.amount.toFixed(2)}</div>
            <div className="text-sm font-bold text-gray-400 mt-2">{result.percent.toFixed(2)}% Margin</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfitLossCalculator;
