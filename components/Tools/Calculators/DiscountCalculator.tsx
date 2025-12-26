
import React, { useState } from 'react';

const DiscountCalculator: React.FC = () => {
  const [price, setPrice] = useState('100');
  const [discount, setDiscount] = useState('20');
  const [result, setResult] = useState<{ savings: number, final: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(price);
    const d = parseFloat(discount);
    if (p && d) {
      const s = (p * d) / 100;
      setResult({ savings: s, final: p - s });
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Original Price</label>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Discount %</label>
            <input type="number" value={discount} onChange={e => setDiscount(e.target.value)} className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none" />
          </div>
        </div>
        <button onClick={calculate} className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl">Find Final Price</button>
        {result && (
          <div className="pt-8 border-t border-gray-100 grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-2xl text-center">
              <span className="text-xs font-bold text-gray-400">Total Savings</span>
              <div className="text-2xl font-bold text-green-500">{result.savings.toFixed(2)}</div>
            </div>
            <div className="bg-primary/10 p-4 rounded-2xl text-center">
              <span className="text-xs font-bold text-gray-500">Pay Only</span>
              <div className="text-2xl font-bold text-gray-900">{result.final.toFixed(2)}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscountCalculator;
