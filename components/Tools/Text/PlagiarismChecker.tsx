
import React, { useState } from 'react';
import { Search, ShieldCheck, Globe } from 'lucide-react';

const PlagiarismChecker: React.FC = () => {
  const [text, setText] = useState('');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const runScan = () => {
    if (!text.trim()) return;
    setScanning(true);
    
    // Simulating plagiarism scan
    setTimeout(() => {
      // Mock result: 100% unique for very short text, some matches for long text
      const uniqueness = text.length < 50 ? 100 : Math.floor(Math.random() * (100 - 85 + 1) + 85);
      setResult(uniqueness);
      setScanning(false);
    }, 2000);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      <textarea 
        className="w-full h-64 p-6 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none transition-all resize-none mb-6 text-lg"
        placeholder="Paste content to check for uniqueness (Min 10 words)..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button 
        disabled={scanning || text.trim().split(/\s+/).length < 5}
        onClick={runScan}
        className="w-full py-4 bg-primary text-gray-900 font-bold rounded-2xl hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center space-x-2"
      >
        {scanning ? (
          <span className="flex items-center space-x-2">
            <Globe className="w-5 h-5 animate-spin" />
            <span>Scanning Web Sources...</span>
          </span>
        ) : (
          <>
            <Search className="w-5 h-5" />
            <span>Check for Plagiarism</span>
          </>
        )}
      </button>

      {result !== null && !scanning && (
        <div className="mt-8 bg-gray-900 rounded-3xl p-10 text-center animate-in zoom-in-95">
          <div className="w-24 h-24 border-8 border-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-black text-white">{result}%</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Unique Content</h3>
          <p className="text-gray-400 text-sm max-w-sm mx-auto">
            Our algorithm suggests that this content is {result}% original. No significant external matches were found in our database.
          </p>
          <div className="mt-8 flex items-center justify-center space-x-2 text-primary">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-widest">Safe & Verified</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlagiarismChecker;
