
import React, { useState } from 'react';
import { Clock, Info } from 'lucide-react';

const ReadingTimeCalculator: React.FC = () => {
  const [text, setText] = useState('');
  const [wpm, setWpm] = useState(225);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const minutes = Math.ceil(wordCount / wpm);

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      <div className="mb-8">
        <label className="block text-sm font-bold text-gray-700 mb-2">Adjust Reading Speed (WPM)</label>
        <div className="flex items-center space-x-4">
          <input 
            type="range" 
            min="100" max="500" step="25"
            className="flex-grow h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary"
            value={wpm}
            onChange={(e) => setWpm(parseInt(e.target.value))}
          />
          <span className="bg-gray-50 px-4 py-2 rounded-xl font-bold text-gray-900 border border-gray-100 w-20 text-center">{wpm}</span>
        </div>
        <p className="text-xs text-gray-400 mt-2 flex items-center">
          <Info className="w-3 h-3 mr-1" />
          Average adult reading speed is 200-250 WPM.
        </p>
      </div>

      <textarea 
        className="w-full h-64 p-6 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none transition-all resize-none mb-8 text-lg"
        placeholder="Paste your article or essay here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="bg-gray-900 p-8 rounded-3xl text-center">
        <div className="flex items-center justify-center space-x-3 mb-2">
          <Clock className="w-6 h-6 text-primary" />
          <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Estimated Reading Time</span>
        </div>
        <div className="text-5xl font-extrabold text-white">
          {minutes} <span className="text-2xl font-normal text-gray-500">min{minutes !== 1 ? 's' : ''}</span>
        </div>
        <div className="mt-4 text-sm text-gray-500">Based on {wordCount} words</div>
      </div>
    </div>
  );
};

export default ReadingTimeCalculator;
