
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState<{ years: number, months: number, days: number } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;
    const birth = new Date(birthDate);
    const now = new Date();
    
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += lastMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    setResult({ years, months, days });
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm max-w-2xl mx-auto">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Select Date of Birth</label>
          <div className="relative">
            <input 
              type="date" 
              className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none transition-all"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
        </div>

        <button 
          onClick={calculateAge}
          className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-colors shadow-lg"
        >
          Calculate Age
        </button>

        {result && (
          <div className="pt-8 border-t border-gray-100 grid grid-cols-3 gap-4">
            <div className="bg-primary/10 p-4 rounded-2xl text-center">
              <div className="text-3xl font-bold text-gray-900">{result.years}</div>
              <div className="text-xs text-gray-600 uppercase font-bold mt-1">Years</div>
            </div>
            <div className="bg-primary/10 p-4 rounded-2xl text-center">
              <div className="text-3xl font-bold text-gray-900">{result.months}</div>
              <div className="text-xs text-gray-600 uppercase font-bold mt-1">Months</div>
            </div>
            <div className="bg-primary/10 p-4 rounded-2xl text-center">
              <div className="text-3xl font-bold text-gray-900">{result.days}</div>
              <div className="text-xs text-gray-600 uppercase font-bold mt-1">Days</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgeCalculator;
