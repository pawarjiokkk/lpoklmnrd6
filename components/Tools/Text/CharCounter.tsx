
import React, { useState } from 'react';
import { Copy, Trash2, Check } from 'lucide-react';

const CharCounter: React.FC = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const charWithSpaces = text.length;
  const charWithoutSpaces = text.replace(/\s/g, '').length;

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm">
      <textarea 
        className="w-full h-64 p-4 sm:p-6 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none transition-all resize-none mb-8 text-lg sm:text-xl"
        placeholder="Paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-center justify-between">
          <span className="font-bold text-gray-500 uppercase text-xs tracking-wider">With Spaces</span>
          <span className="text-3xl font-extrabold text-gray-900">{charWithSpaces}</span>
        </div>
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-center justify-between">
          <span className="font-bold text-gray-500 uppercase text-xs tracking-wider">No Spaces</span>
          <span className="text-3xl font-extrabold text-gray-900">{charWithoutSpaces}</span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={handleCopy}
          className="flex-1 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
        >
          {copied ? <Check className="w-5 h-5 text-primary" /> : <Copy className="w-5 h-5" />}
          <span>Copy Text</span>
        </button>
        <button 
          onClick={() => setText('')}
          className="w-full sm:w-auto px-8 py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-colors flex justify-center"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CharCounter;
