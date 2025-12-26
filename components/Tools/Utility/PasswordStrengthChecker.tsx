
import React, { useState } from 'react';
import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react';

const PasswordStrengthChecker: React.FC = () => {
  const [pass, setPass] = useState('');
  
  const getStrength = (p: string) => {
    let s = 0;
    if (p.length > 8) s++;
    if (p.length > 12) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  };

  const score = getStrength(pass);
  const labels = ['Too Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Uncrackable'];
  const colors = ['bg-red-500', 'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400', 'bg-green-600'];

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm max-w-2xl mx-auto">
      <input 
        type="text" 
        className="w-full p-6 bg-gray-50 rounded-2xl text-xl font-mono border-none focus:ring-2 focus:ring-primary mb-8"
        placeholder="Type a password to test..."
        value={pass}
        onChange={e => setPass(e.target.value)}
      />
      <div className="space-y-4">
        <div className="flex justify-between font-bold text-gray-700">
          <span>Security Level</span>
          <span className={pass ? 'text-primary' : 'text-gray-300'}>{pass ? labels[score] : 'Enter Password'}</span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden flex">
          {[0, 1, 2, 3, 4, 5].map(idx => (
            <div key={idx} className={`flex-1 transition-all duration-500 ${idx <= score && pass ? colors[score] : ''} border-r border-white last:border-0`}></div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 pt-6">
          <div className={`p-4 rounded-xl text-xs font-bold border-2 ${pass.length > 8 ? 'border-green-100 text-green-600 bg-green-50' : 'border-gray-50 text-gray-300'}`}>Min 8 Characters</div>
          <div className={`p-4 rounded-xl text-xs font-bold border-2 ${/[A-Z]/.test(pass) ? 'border-green-100 text-green-600 bg-green-50' : 'border-gray-50 text-gray-300'}`}>Uppercase Letter</div>
          <div className={`p-4 rounded-xl text-xs font-bold border-2 ${/[0-9]/.test(pass) ? 'border-green-100 text-green-600 bg-green-50' : 'border-gray-50 text-gray-300'}`}>Includes Number</div>
          <div className={`p-4 rounded-xl text-xs font-bold border-2 ${/[^A-Za-z0-9]/.test(pass) ? 'border-green-100 text-green-600 bg-green-50' : 'border-gray-50 text-gray-300'}`}>Special Symbol</div>
        </div>
      </div>
    </div>
  );
};

export default PasswordStrengthChecker;
