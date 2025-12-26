
import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw, Check } from 'lucide-react';

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = '';
    if (includeUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    if (!charset) return;

    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(result);
  };

  useEffect(() => { generatePassword(); }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm max-w-2xl mx-auto">
      <div className="mb-8 relative group">
        <input 
          type="text" 
          readOnly 
          className="w-full p-6 bg-gray-900 text-primary text-2xl font-mono rounded-2xl border-none focus:ring-0 pr-24"
          value={password}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex space-x-2">
          <button 
            onClick={generatePassword}
            className="p-3 text-gray-400 hover:text-white transition-colors"
          >
            <RefreshCw className="w-6 h-6" />
          </button>
          <button 
            onClick={handleCopy}
            className="p-3 text-gray-400 hover:text-white transition-colors"
          >
            {copied ? <Check className="w-6 h-6 text-primary" /> : <Copy className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-4">
            <span className="font-bold text-gray-700">Password Length</span>
            <span className="text-primary font-bold text-lg">{length}</span>
          </div>
          <input 
            type="range" 
            min="6" max="64" 
            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Uppercase', state: includeUpper, setter: setIncludeUpper },
            { label: 'Lowercase', state: includeLower, setter: setIncludeLower },
            { label: 'Numbers', state: includeNumbers, setter: setIncludeNumbers },
            { label: 'Symbols', state: includeSymbols, setter: setIncludeSymbols },
          ].map((opt, idx) => (
            <button
              key={idx}
              onClick={() => opt.setter(!opt.state)}
              className={`p-4 rounded-2xl text-sm font-bold border-2 transition-all flex items-center justify-between ${
                opt.state ? 'bg-primary/5 border-primary text-gray-900' : 'bg-white border-gray-100 text-gray-400'
              }`}
            >
              {opt.label}
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${opt.state ? 'bg-primary border-primary' : 'border-gray-200'}`}>
                {opt.state && <Check className="w-3 h-3 text-gray-900" />}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
