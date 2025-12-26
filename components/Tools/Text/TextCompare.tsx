
import React, { useState } from 'react';
import { Diff, ArrowLeftRight, Trash2 } from 'lucide-react';

const TextCompare: React.FC = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diffResult, setDiffResult] = useState<{ identical: boolean, diffs: number } | null>(null);

  const compare = () => {
    if (!text1 && !text2) return;
    const isIdentical = text1 === text2;
    // Simple line-based difference count
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    let diffs = Math.abs(lines1.length - lines2.length);
    const minLines = Math.min(lines1.length, lines2.length);
    for (let i = 0; i < minLines; i++) {
      if (lines1[i] !== lines2[i]) diffs++;
    }
    setDiffResult({ identical: isIdentical, diffs });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex justify-between mb-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Original Text</span>
            <button onClick={() => setText1('')} className="text-gray-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
          </div>
          <textarea 
            className="w-full h-80 p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none resize-none font-mono text-sm"
            placeholder="Enter first text..."
            value={text1}
            onChange={(e) => setText1(e.target.value)}
          />
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex justify-between mb-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Modified Text</span>
            <button onClick={() => setText2('')} className="text-gray-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
          </div>
          <textarea 
            className="w-full h-80 p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none resize-none font-mono text-sm"
            placeholder="Enter second text..."
            value={text2}
            onChange={(e) => setText2(e.target.value)}
          />
        </div>
      </div>

      <button 
        onClick={compare}
        className="w-full py-5 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-all flex items-center justify-center space-x-3 shadow-xl"
      >
        <ArrowLeftRight className="w-5 h-5" />
        <span>Compare Now</span>
      </button>

      {diffResult && (
        <div className={`p-8 rounded-3xl border text-center animate-in fade-in slide-in-from-bottom-4 ${diffResult.identical ? 'bg-green-50 border-green-100' : 'bg-orange-50 border-orange-100'}`}>
          {diffResult.identical ? (
            <div>
              <div className="text-3xl font-bold text-green-700 mb-2">Identical!</div>
              <p className="text-green-600">The two texts are 100% the same.</p>
            </div>
          ) : (
            <div>
              <div className="text-3xl font-bold text-orange-700 mb-2">Differences Found</div>
              <p className="text-orange-600">The texts are different. Approximately {diffResult.diffs} lines differ.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TextCompare;
