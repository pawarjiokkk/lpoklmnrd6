
import React, { useState } from 'react';
import { Trash2, Copy, Check } from 'lucide-react';

const SentenceCounter: React.FC = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const sentenceCount = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      <textarea 
        className="w-full h-64 p-6 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none transition-all resize-none mb-8 text-xl"
        placeholder="Paste your text here to count sentences..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="w-full md:w-1/2 bg-primary/10 p-6 rounded-2xl border border-primary/20 text-center">
          <span className="font-bold text-gray-500 uppercase text-xs tracking-wider block mb-1">Total Sentences</span>
          <span className="text-4xl font-extrabold text-gray-900">{sentenceCount}</span>
        </div>
        <div className="w-full md:w-1/2 flex space-x-4">
          <button 
            onClick={handleCopy}
            className="flex-1 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
          >
            {copied ? <Check className="w-5 h-5 text-primary" /> : <Copy className="w-5 h-5" />}
            <span>Copy</span>
          </button>
          <button 
            onClick={() => setText('')}
            className="p-4 bg-gray-100 text-gray-400 hover:text-red-500 rounded-2xl transition-colors"
          >
            <Trash2 className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SentenceCounter;
