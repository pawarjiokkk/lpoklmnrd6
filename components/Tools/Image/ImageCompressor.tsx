
import React, { useState, useRef } from 'react';
import { Upload, Download, Loader2, Image as ImageIcon, Zap, SlidersHorizontal } from 'lucide-react';

const ImageCompressor: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [compressing, setCompressing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setCompressedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCompress = () => {
    if (!image) return;
    setCompressing(true);
    
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      setTimeout(() => {
        const compressedData = canvas.toDataURL('image/jpeg', quality);
        setCompressedImage(compressedData);
        setCompressing(false);
      }, 800);
    };
  };

  return (
    <div className="bg-white p-4 sm:p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Upload Area */}
        <div className="lg:col-span-7">
          <label className={`border-4 border-dashed rounded-[2rem] p-12 flex flex-col items-center justify-center text-center relative transition-all cursor-pointer min-h-[350px] ${image ? 'border-primary/20 bg-primary/5' : 'border-gray-100 hover:border-primary hover:bg-gray-50'}`}>
            {image ? (
              <div className="relative group">
                <img src={image} className="max-h-[300px] rounded-2xl shadow-2xl transition-transform group-hover:scale-[1.02]" alt="Original" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-2xl transition-opacity">
                   <span className="text-white font-bold text-sm">Change Image</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto text-gray-300 shadow-inner">
                  <Upload className="w-10 h-10" />
                </div>
                <div>
                  <p className="font-black text-gray-900 text-xl">Upload Image</p>
                  <p className="text-sm text-gray-400 mt-2 max-w-xs leading-relaxed">Drop your JPG, PNG, or WebP here for instant compression.</p>
                </div>
              </div>
            )}
            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleUpload} accept="image/*" />
          </label>
        </div>

        {/* Settings Area */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-8 p-4 bg-gray-50 rounded-[2rem] border border-gray-100">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-gray-900">
              <SlidersHorizontal className="w-5 h-5" />
              <h4 className="font-black uppercase tracking-widest text-xs">Compression Level</h4>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <div className="flex justify-between items-end mb-4">
                <span className="text-sm font-bold text-gray-500">Quality</span>
                <span className="text-2xl font-black text-primary">{Math.round(quality * 100)}%</span>
              </div>
              <input 
                type="range" 
                min="0.1" max="1.0" step="0.05"
                className="w-full h-3 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
              />
              <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-300 uppercase">
                <span>Small File</span>
                <span>Best Quality</span>
              </div>
            </div>
          </div>

          <button 
            disabled={!image || compressing}
            onClick={handleCompress}
            className="w-full py-5 bg-gray-900 text-white font-black rounded-2xl hover:bg-gray-800 disabled:opacity-50 transition-all flex items-center justify-center space-x-3 shadow-xl hover:-translate-y-1 active:scale-95"
          >
            {compressing ? <Loader2 className="w-6 h-6 animate-spin" /> : (
              <>
                <Zap className="w-6 h-6 text-primary fill-primary" />
                <span className="text-lg">Compress Now</span>
              </>
            )}
          </button>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {compressedImage && (
        <div className="bg-green-50 p-6 sm:p-8 rounded-[2rem] border border-green-100 flex flex-col md:flex-row items-center justify-between gap-6 animate-in slide-in-from-bottom-4">
          <div className="flex items-center space-x-5">
            <div className="p-4 bg-green-100 rounded-2xl shadow-sm">
              <ImageIcon className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <p className="font-black text-green-900 text-lg leading-none mb-1">Compression Complete!</p>
              <p className="text-sm text-green-600 font-medium">Your optimized image is ready.</p>
            </div>
          </div>
          <a 
            href={compressedImage} 
            download="compressed-image.jpg"
            className="w-full md:w-auto px-10 py-4 bg-green-600 text-white font-black rounded-2xl hover:bg-green-700 transition-all flex items-center justify-center space-x-3 shadow-lg hover:shadow-green-200"
          >
            <Download className="w-5 h-5" />
            <span>Download Image</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageCompressor;
