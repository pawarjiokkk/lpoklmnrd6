
import React, { useState } from 'react';
import { Info, Upload, FileText, Maximize, Clock, Database, AlertCircle, RefreshCw } from 'lucide-react';

const ImageMetadata: React.FC = () => {
  const [data, setData] = useState<{ [key: string]: string | number } | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    setData(null);

    const reader = new FileReader();
    
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setPreview(result);

      const img = new Image();
      img.onload = () => {
        setData({
          'Filename': file.name,
          'File Size': (file.size / 1024).toFixed(2) + ' KB',
          'MIME Type': file.type,
          'Width': img.width + ' px',
          'Height': img.height + ' px',
          'Aspect Ratio': (img.width / img.height).toFixed(2),
          'Resolution': (img.width * img.height / 1000000).toFixed(2) + ' MP',
          'Last Modified': new Date(file.lastModified).toLocaleString(),
          'Bits per Channel': '8-bit (Standard)',
          'Color Space': 'sRGB'
        });
        setLoading(false);
      };

      img.onerror = () => {
        setError("Could not read image dimensions. The file might be corrupted or in an unsupported format.");
        setLoading(false);
      };

      img.src = result;
    };

    reader.onerror = () => {
      setError("Failed to read the file. Please try another image.");
      setLoading(false);
    };

    reader.readAsDataURL(file);
  };

  const reset = () => {
    setData(null);
    setPreview(null);
    setError(null);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      {!data && !loading && (
        <label className="border-2 border-dashed border-gray-200 rounded-[2rem] p-20 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-gray-50 transition-all group">
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8 text-gray-400 group-hover:text-primary" />
          </div>
          <p className="font-bold text-gray-900 text-lg">Upload Image to Analyze</p>
          <p className="text-sm text-gray-500 mt-2 text-center max-w-xs">Supported: JPG, PNG, WEBP, GIF. We'll extract technical details and dimensions.</p>
          <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
        </label>
      )}

      {loading && (
        <div className="py-20 text-center">
          <RefreshCw className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
          <p className="font-bold text-gray-900">Analyzing Metadata...</p>
        </div>
      )}

      {error && (
        <div className="p-6 bg-red-50 border border-red-100 rounded-2xl flex items-center space-x-4 text-red-700">
          <AlertCircle className="w-6 h-6 shrink-0" />
          <p className="text-sm font-medium">{error}</p>
          <button onClick={reset} className="text-xs font-bold uppercase tracking-widest underline ml-auto">Retry</button>
        </div>
      )}

      {data && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-4 rounded-3xl flex items-center justify-center border border-gray-100">
              <img src={preview!} className="max-h-80 rounded-xl shadow-lg" alt="Preview" />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center px-2">
                <Database className="w-5 h-5 mr-2 text-primary" />
                Technical Details
              </h3>
              <div className="bg-gray-900 rounded-[2rem] overflow-hidden border border-gray-800">
                <table className="w-full text-left text-sm">
                  <tbody>
                    {Object.entries(data).map(([key, val], idx) => (
                      <tr key={key} className={idx % 2 === 0 ? 'bg-gray-800/30' : ''}>
                        <td className="p-4 font-bold text-gray-400 border-b border-gray-800/50">{key}</td>
                        <td className="p-4 text-white border-b border-gray-800/50">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <button 
            onClick={reset} 
            className="w-full py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-colors"
          >
            Reset and Upload Another
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageMetadata;
