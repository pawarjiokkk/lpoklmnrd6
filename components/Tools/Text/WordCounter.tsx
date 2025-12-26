
import React, { useState } from 'react';
import { Trash2, Copy, Check, FileText } from 'lucide-react';

const WordCounter: React.FC = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charWithSpaces = text.length;
  const charWithoutSpaces = text.replace(/\s/g, '').length;
  const sentenceCount = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const paragraphCount = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white p-4 sm:p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-primary" />
          <span className="text-sm font-black text-gray-900 uppercase tracking-widest">Workspace</span>
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
           <button 
            onClick={() => setText('')}
            className="flex-1 sm:flex-none px-4 py-2 bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all flex items-center justify-center space-x-2 border border-transparent hover:border-red-100"
            title="Clear text"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-xs font-bold sm:hidden">Clear</span>
          </button>
          <button 
            disabled={!text}
            onClick={handleCopy}
            className={`flex-[2] sm:flex-none px-6 py-2 rounded-xl font-bold transition-all flex items-center justify-center space-x-2 border shadow-sm ${
              copied 
              ? 'bg-green-500 text-white border-green-400' 
              : 'bg-primary text-gray-900 border-primary/20 hover:shadow-lg disabled:opacity-50'
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span className="text-sm">{copied ? 'Copied!' : 'Copy Text'}</span>
          </button>
        </div>
      </div>

      <textarea 
        className="w-full h-64 sm:h-80 p-6 bg-gray-50 rounded-[2rem] border-2 border-transparent focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all resize-none mb-8 custom-scrollbar text-lg text-gray-800 placeholder:text-gray-300 shadow-inner"
        placeholder="Start typing or paste your content here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck="false"
      />
      
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {[
          { label: 'Words', value: wordCount, color: 'text-gray-900' },
          { label: 'Chars (With Space)', value: charWithSpaces, color: 'text-gray-600' },
          { label: 'Chars (No Space)', value: charWithoutSpaces, color: 'text-gray-600' },
          { label: 'Sentences', value: sentenceCount, color: 'text-gray-600' },
          { label: 'Paragraphs', value: paragraphCount, color: 'text-gray-600' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-gray-50 p-5 rounded-2xl text-center border border-gray-100 group hover:bg-white hover:border-primary/20 transition-all">
            <div className={`text-2xl font-black ${stat.color} group-hover:scale-110 transition-transform`}>{stat.value}</div>
            <div className="text-[10px] font-black text-gray-400 uppercase mt-1 tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordCounter;
