
import React, { useState, useRef } from 'react';
// Fix: Added missing ShieldCheck to the lucide-react imports
import { Upload, Download, Maximize, RefreshCw, AlertCircle, Link, Unlink, ArrowRightLeft, Image as ImageIcon, CheckCircle, XCircle, Settings2, Sparkles, ShieldCheck } from 'lucide-react';

const ImageResizer: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);
  const [aspectRatio, setAspectRatio] = useState<number>(1);
  const [lockAspect, setLockAspect] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);
    setSuccess(false);

    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setError("Invalid file type. Please upload a JPG, PNG, or WebP.");
      if (e.target) e.target.value = '';
      return;
    }

    setProcessing(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        setOriginalWidth(img.width);
        setOriginalHeight(img.height);
        setWidth(img.width);
        setHeight(img.height);
        setAspectRatio(img.width / img.height);
        setImage(img.src);
        setProcessing(false);
      };
      img.onerror = () => {
        setError("The image file appears to be corrupted.");
        setProcessing(false);
        setImage(null);
      };
      img.src = ev.target?.result as string;
    };
    reader.onerror = () => {
      setError("Failed to read the file.");
      setProcessing(false);
    };
    reader.readAsDataURL(file);
  };

  const handleWidthChange = (val: string) => {
    const num = parseInt(val) || 0;
    setWidth(num);
    if (lockAspect && aspectRatio) {
      setHeight(Math.round(num / aspectRatio));
    }
  };

  const handleHeightChange = (val: string) => {
    const num = parseInt(val) || 0;
    setHeight(num);
    if (lockAspect && aspectRatio) {
      setWidth(Math.round(num * aspectRatio));
    }
  };

  const handleResize = () => {
    if (!image || !canvasRef.current || width <= 0 || height <= 0) return;
    setProcessing(true);
    setError(null);
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      try {
        canvas.width = width;
        canvas.height = height;
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);
        }
        
        const link = document.createElement('a');
        link.download = `exploreatoolhub-resized-${width}x${height}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        setProcessing(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } catch (err) {
        setError("Failed to resize. Try a smaller dimension.");
        setProcessing(false);
      }
    };

    img.onerror = () => {
      setError("Failed to load image for resizing.");
      setProcessing(false);
    };

    img.src = image;
  };

  return (
    <div className="bg-white p-4 sm:p-10 rounded-[3rem] border border-gray-100 shadow-xl overflow-hidden">
      {/* Error/Success Feedback Overlay */}
      <div className="space-y-4 mb-8">
        {error && (
          <div className="p-5 bg-red-50 border border-red-100 rounded-[1.5rem] flex items-center space-x-4 text-red-700 animate-in slide-in-from-top-4">
            <div className="bg-white p-2 rounded-xl shadow-sm">
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-sm font-black">{error}</p>
            <button onClick={() => setError(null)} className="ml-auto text-red-300 hover:text-red-500 transition-colors">
              <XCircle className="w-6 h-6" />
            </button>
          </div>
        )}

        {success && (
          <div className="p-5 bg-green-50 border border-green-100 rounded-[1.5rem] flex items-center space-x-4 text-green-700 animate-in slide-in-from-top-4">
            <div className="bg-white p-2 rounded-xl shadow-sm">
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-sm font-black">Success! Image scaled perfectly.</p>
          </div>
        )}
      </div>

      {!image && !processing && (
        <label className="group relative block border-4 border-dashed border-gray-100 rounded-[3rem] p-16 sm:p-32 text-center cursor-pointer hover:border-primary hover:bg-gray-50/50 transition-all duration-500">
          <div className="w-28 h-28 bg-white rounded-[2rem] border border-gray-100 flex items-center justify-center mx-auto mb-8 group-hover:bg-primary group-hover:rotate-6 group-hover:scale-110 transition-all shadow-sm">
            <Upload className="w-12 h-12 text-gray-200 group-hover:text-gray-900 transition-colors" />
          </div>
          <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Drop Image to Resize</h3>
          <p className="text-gray-400 font-medium max-w-sm mx-auto leading-relaxed">
            Professional scaling for <span className="text-gray-900 font-bold">JPG, PNG, and WebP</span>. High-quality resampling included.
          </p>
          <div className="mt-10 flex justify-center items-center space-x-6">
             <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-gray-300">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Local Only</span>
             </div>
             <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-gray-300">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>High Resolution</span>
             </div>
          </div>
          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden" 
            onChange={handleUpload} 
            accept=".jpg,.jpeg,.png,.webp" 
          />
        </label>
      )}

      {processing && (
        <div className="py-32 flex flex-col items-center justify-center space-y-8 animate-pulse">
          <div className="relative">
             <RefreshCw className="w-24 h-24 text-primary animate-spin" />
             <div className="absolute inset-0 flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-gray-200" />
             </div>
          </div>
          <div>
            <p className="text-2xl font-black text-gray-900 text-center">Resampling Image...</p>
            <p className="text-sm text-gray-400 font-medium text-center mt-2">Smoothing pixels for the best quality result.</p>
          </div>
        </div>
      )}

      {image && !processing && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 animate-in zoom-in-95 duration-700">
          {/* Enhanced Preview Section */}
          <div className="xl:col-span-8">
            <div className="bg-gray-900 rounded-[3rem] p-10 border border-gray-800 shadow-inner min-h-[500px] lg:min-h-[650px] flex flex-col relative overflow-hidden group">
              <div className="absolute top-6 left-10 z-10 flex items-center space-x-3">
                <div className="bg-primary px-3 py-1 rounded-full text-[9px] font-black text-gray-900 uppercase tracking-widest shadow-lg">Scaling View</div>
                <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{originalWidth}x{originalHeight} → {width}x{height}</div>
              </div>
              
              <div className="flex-grow flex items-center justify-center relative">
                 {/* Visual Background Pattern */}
                 <div className="absolute inset-0 opacity-[0.03] pointer-events-none grid grid-cols-12 grid-rows-12 gap-1">
                    {Array.from({length: 144}).map((_, i) => <div key={i} className="border border-white/20"></div>)}
                 </div>

                 <div className="relative">
                    <img 
                      src={image} 
                      className="max-w-full max-h-[350px] lg:max-h-[450px] rounded-2xl shadow-2xl ring-8 ring-white/5 transition-all duration-500" 
                      style={{ 
                        opacity: width > 0 && height > 0 ? 1 : 0.3,
                        transform: `scale(${Math.min(1.1, width / originalWidth || 1)})` 
                      }}
                      alt="Resizer Preview" 
                    />
                    
                    {/* Measurement Overlay Labels */}
                    <div className="absolute -top-6 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white text-gray-900 px-3 py-1 rounded-full text-[10px] font-black shadow-xl border border-gray-100">{width}px Wide</div>
                    </div>
                    <div className="absolute -right-6 top-0 bottom-0 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white text-gray-900 px-3 py-1 rounded-full text-[10px] font-black shadow-xl border border-gray-100 whitespace-nowrap rotate-90">{height}px High</div>
                    </div>
                 </div>
              </div>

              <div className="mt-8 flex items-center justify-center space-x-12 px-8 py-4 bg-white/5 rounded-[2rem] border border-white/5">
                 <div className="text-center">
                    <p className="text-[9px] font-black text-gray-500 uppercase mb-1">Scale Ratio</p>
                    <p className="text-xl font-black text-primary">{(width / originalWidth).toFixed(2)}x</p>
                 </div>
                 <div className="h-10 w-[1px] bg-white/10"></div>
                 <div className="text-center">
                    <p className="text-[9px] font-black text-gray-500 uppercase mb-1">Status</p>
                    <p className="text-xl font-black text-white">{width > originalWidth ? 'Upscaling' : 'Downscaling'}</p>
                 </div>
              </div>
            </div>
          </div>

          {/* Precision Controls Sidebar */}
          <div className="xl:col-span-4 flex flex-col gap-6">
            <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 flex-grow shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] flex items-center">
                  <Settings2 className="w-4 h-4 mr-2" />
                  Dimensions
                </h4>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              </div>

              <div className="space-y-6">
                <div className="group relative">
                  <label className="text-[10px] font-black text-gray-400 uppercase absolute left-6 top-4 group-focus-within:text-primary transition-colors">Width (px)</label>
                  <input 
                    type="number" 
                    value={width || ''} 
                    onChange={(e) => handleWidthChange(e.target.value)} 
                    className="w-full pt-10 pb-4 px-6 bg-white rounded-[1.5rem] border-2 border-transparent focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none font-black text-xl text-gray-900 shadow-sm transition-all"
                    placeholder="0"
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-20 group-hover:opacity-100 transition-opacity">
                     <Maximize className="w-5 h-5" />
                  </div>
                </div>

                <div className="flex items-center justify-center">
                   <button 
                    onClick={() => setLockAspect(!lockAspect)}
                    className={`relative w-full py-4 rounded-[1.5rem] border-2 flex items-center justify-center space-x-3 transition-all duration-500 transform active:scale-95 ${
                      lockAspect 
                      ? 'bg-primary border-primary text-gray-900 shadow-lg shadow-primary/20' 
                      : 'bg-white border-gray-100 text-gray-300 hover:border-gray-200'
                    }`}
                   >
                     {lockAspect ? <Link className="w-5 h-5 animate-in zoom-in" /> : <Unlink className="w-5 h-5 animate-in zoom-in" />}
                     <span className="text-[11px] font-black uppercase tracking-widest">
                       {lockAspect ? 'Proportions Locked' : 'Unlocked Aspect'}
                     </span>
                     {lockAspect && <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-primary"></div>}
                   </button>
                </div>

                <div className="group relative">
                  <label className="text-[10px] font-black text-gray-400 uppercase absolute left-6 top-4 group-focus-within:text-primary transition-colors">Height (px)</label>
                  <input 
                    type="number" 
                    value={height || ''} 
                    onChange={(e) => handleHeightChange(e.target.value)} 
                    className="w-full pt-10 pb-4 px-6 bg-white rounded-[1.5rem] border-2 border-transparent focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none font-black text-xl text-gray-900 shadow-sm transition-all"
                    placeholder="0"
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-20 group-hover:opacity-100 transition-opacity">
                     <Maximize className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Quick Percentages */}
              <div className="mt-10 pt-8 border-t border-gray-100">
                 <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-4">Quick Presets</p>
                 <div className="grid grid-cols-2 gap-3">
                    {[0.5, 0.25].map((p) => (
                      <button 
                        key={p}
                        onClick={() => handleWidthChange(Math.round(originalWidth * p).toString())}
                        className="py-3 bg-white rounded-xl border border-gray-100 text-xs font-black hover:border-primary hover:text-primary transition-all active:scale-95"
                      >
                        {p * 100}% Scale
                      </button>
                    ))}
                 </div>
              </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={handleResize} 
                disabled={width <= 0 || height <= 0}
                className="w-full py-7 bg-gray-900 text-white font-black rounded-[2rem] flex items-center justify-center space-x-3 shadow-2xl hover:bg-black transition-all hover:-translate-y-1 active:scale-[0.98] disabled:opacity-50 group overflow-hidden relative"
              >
                <div className="bg-primary p-2.5 rounded-xl group-hover:rotate-12 transition-transform">
                  <Download className="w-6 h-6 text-gray-900" />
                </div>
                <span className="text-xl">Resize & Save</span>
                <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000"></div>
              </button>
              
              <button 
                onClick={() => {
                  setImage(null);
                  setError(null);
                  setSuccess(false);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }} 
                className="w-full py-4 bg-white border-2 border-gray-100 text-gray-400 font-black rounded-[1.5rem] hover:bg-gray-50 hover:text-gray-600 transition-all text-sm uppercase tracking-[0.2em]"
              >
                Start Over
              </button>
            </div>

            <div className="p-8 bg-primary/5 rounded-[2rem] border border-primary/10">
               <div className="flex items-center space-x-3 mb-3">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <span className="text-[11px] font-black uppercase text-gray-700">Privacy First</span>
               </div>
               <p className="text-[11px] text-gray-500 leading-relaxed font-bold">
                 Processing is handled entirely in your browser using local canvas buffers. Your photos never touch our servers.
               </p>
            </div>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default ImageResizer;