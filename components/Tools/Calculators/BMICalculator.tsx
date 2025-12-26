
import React, { useState } from 'react';

const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<{ bmi: number, status: string, color: string } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // convert cm to m
    if (w && h) {
      const bmi = parseFloat((w / (h * h)).toFixed(1));
      let status = '';
      let color = '';
      if (bmi < 18.5) { status = 'Underweight'; color = 'text-blue-500'; }
      else if (bmi < 25) { status = 'Healthy Weight'; color = 'text-green-500'; }
      else if (bmi < 30) { status = 'Overweight'; color = 'text-orange-500'; }
      else { status = 'Obese'; color = 'text-red-500'; }
      setResult({ bmi, status, color });
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Weight (kg)</label>
            <input 
              type="number" 
              className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g. 70"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Height (cm)</label>
            <input 
              type="number" 
              className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="e.g. 175"
            />
          </div>
        </div>
        <button 
          onClick={calculate}
          className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-colors shadow-lg"
        >
          Calculate BMI
        </button>

        {result && (
          <div className="pt-8 border-t border-gray-100 text-center">
            <div className="text-5xl font-extrabold text-gray-900 mb-2">{result.bmi}</div>
            <div className={`text-xl font-bold uppercase ${result.color}`}>{result.status}</div>
            <p className="mt-4 text-sm text-gray-500 italic">Body Mass Index is a simple index of weight-for-height.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMICalculator;
