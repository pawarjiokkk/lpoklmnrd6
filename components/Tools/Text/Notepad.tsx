
import React, { useState, useEffect } from 'react';
import { Save, Trash2 } from 'lucide-react';

const Notepad: React.FC = () => {
  const [content, setContent] = useState(() => {
    return localStorage.getItem('explorea_notepad') || '';
  });

  useEffect(() => {
    localStorage.setItem('explorea_notepad', content);
  }, [content]);

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
           <div className="w-2 h-2 bg-green-500 rounded-full"></div>
           <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Auto-Saving Enabled</span>
        </div>
        <button 
          onClick={() => { if(confirm('Clear all notes?')) setContent(''); }}
          className="flex items-center space-x-2 text-sm text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear Notes</span>
        </button>
      </div>
      <textarea 
        className="w-full h-[500px] p-8 bg-gray-50 rounded-[2rem] border-none focus:ring-2 focus:ring-primary outline-none transition-all resize-none text-lg leading-relaxed placeholder:text-gray-300 custom-scrollbar"
        placeholder="Start typing your notes here. They are automatically saved to your browser's local storage..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
};

export default Notepad;
