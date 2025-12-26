
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const ColorPicker: React.FC = () => {
  const [color, setColor] = useState('#c2f711');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm max-w-lg mx-auto">
      <div className="flex flex-col items-center space-y-8">
        <div 
          className="w-full h-48 rounded-3xl border-8 border-white shadow-xl flex items-center justify-center transition-colors duration-200"
          style={{ backgroundColor: color }}
        >
          <input 
            type="color" 
            value={color} 
            onChange={e => setColor(e.target.value)} 
            className="w-16 h-16 cursor-pointer opacity-0 absolute"
          />
          <span className="text-white mix-blend-difference text-3xl font-black uppercase">{color}</span>
        </div>
        
        <div className="w-full space-y-4">
          <div className="bg-gray-50 p-4 rounded-2xl flex items-center justify-between border border-gray-100">
            <span className="font-mono text-gray-500 font-bold">HEX CODE: {color.toUpperCase()}</span>
            <button onClick={handleCopy} className="p-2 hover:bg-white rounded-lg transition-colors">
              {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-gray-400" />}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-gray-50 p-4 rounded-2xl text-xs font-bold text-gray-400">
               RGB: {parseInt(color.slice(1,3), 16)}, {parseInt(color.slice(3,5), 16)}, {parseInt(color.slice(5,7), 16)}
             </div>
             <div className="bg-gray-50 p-4 rounded-2xl text-xs font-bold text-gray-400">
               Click the color block above to pick!
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
