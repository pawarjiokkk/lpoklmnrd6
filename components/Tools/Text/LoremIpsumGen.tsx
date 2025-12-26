
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const LoremIpsumGen: React.FC = () => {
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

  const generate = () => {
    setOutput(Array(count).fill(text).join('\n\n'));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          <div className="flex-1">
            <label className="block text-sm font-bold text-gray-700 mb-2">Number of Paragraphs</label>
            <input 
              type="number" 
              className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none"
              value={count}
              min="1" max="20"
              onChange={(e) => setCount(parseInt(e.target.value))}
            />
          </div>
          <button 
            onClick={generate}
            className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800"
          >
            Generate
          </button>
        </div>

        {output && (
          <div className="relative">
            <textarea 
              readOnly 
              className="w-full h-64 p-4 bg-gray-50 rounded-2xl border-none text-gray-600 text-sm leading-relaxed outline-none"
              value={output}
            />
            <button 
              onClick={handleCopy}
              className="absolute top-4 right-4 p-2 bg-white rounded-xl shadow-sm hover:bg-primary transition-colors border border-gray-100"
            >
              {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-gray-400" />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoremIpsumGen;
