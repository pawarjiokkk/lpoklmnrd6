
import React, { useState } from 'react';

const LoanEMICalculator: React.FC = () => {
  const [amount, setAmount] = useState('500000');
  const [interest, setInterest] = useState('8.5');
  const [tenure, setTenure] = useState('5');
  const [emi, setEmi] = useState<number | null>(null);

  const calculate = () => {
    const P = parseFloat(amount);
    const r = parseFloat(interest) / 12 / 100;
    const n = parseFloat(tenure) * 12;
    if (P && r && n) {
      const emiValue = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setEmi(Math.round(emiValue));
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Loan Amount</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Interest (%)</label>
            <input type="number" value={interest} onChange={e => setInterest(e.target.value)} className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Tenure (Years)</label>
            <input type="number" value={tenure} onChange={e => setTenure(e.target.value)} className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none" />
          </div>
        </div>
        <button onClick={calculate} className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl">Calculate EMI</button>
        {emi && (
          <div className="pt-8 border-t border-gray-100 text-center">
            <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Monthly Payment</span>
            <div className="text-5xl font-black text-primary mt-2">{emi.toLocaleString()}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanEMICalculator;
