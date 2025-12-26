
import React, { useState } from 'react';
import { SpellCheck, CheckCircle2, AlertCircle } from 'lucide-react';

const GrammarChecker: React.FC = () => {
  const [text, setText] = useState('');
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<{ score: number, issues: string[] } | null>(null);

  const checkGrammar = () => {
    if (!text.trim()) return;
    setChecking(true);
    
    // Simulating basic JS logic for common errors
    setTimeout(() => {
      const issues: string[] = [];
      if (text.includes(' i ')) issues.push('Capitalize single "i"');
      if (text.match(/ {2,}/)) issues.push('Double spaces detected');
      if (text.match(/[,.!?][a-zA-Z]/)) issues.push('Missing space after punctuation');
      if (text.toLowerCase().includes('there') && text.toLowerCase().includes('their')) issues.push('Check "there/their" usage');
      
      setResult({ 
        score: Math.max(100 - (issues.length * 10), 60),
        issues 
      });
      setChecking(false);
    }, 1200);
  };

  return (
    <div className="bg-white p-4 sm:p-8 rounded-3xl border border-gray-100 shadow-sm">
      <textarea 
        className="w-full h-48 sm:h-64 p-4 sm:p-6 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none transition-all resize-none mb-6 text-base sm:text-lg"
        placeholder="Paste your text here to check for common writing errors..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      
      <button 
        disabled={checking || !text.trim()}
        onClick={checkGrammar}
        className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 disabled:opacity-50 transition-all flex items-center justify-center space-x-2"
      >
        {checking ? (
          <span className="flex items-center space-x-2">
            <SpellCheck className="w-5 h-5 animate-bounce" />
            <span>Analyzing...</span>
          </span>
        ) : (
          <span>Run Grammar Check</span>
        )}
      </button>

      {result && !checking && (
        <div className="mt-8 space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 p-6 rounded-2xl border border-gray-100 gap-4">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Writing Score</span>
              <span className="text-3xl sm:text-4xl font-extrabold text-gray-900">{result.score}/100</span>
            </div>
            <div className={`p-4 rounded-full w-fit ${result.score > 80 ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
              {result.score > 80 ? <CheckCircle2 className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Potential Issues</h4>
            {result.issues.length > 0 ? (
              result.issues.map((issue, idx) => (
                <div key={idx} className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl text-red-700 text-sm font-medium">
                  {issue}
                </div>
              ))
            ) : (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl text-green-700 text-sm font-medium">
                No major issues found! Your writing looks great.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GrammarChecker;
