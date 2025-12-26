
import React, { useState, useRef } from 'react';
import { Crop, Download, Upload, RefreshCw, Smartphone, Monitor, Square, AlertCircle, XCircle, CheckCircle, GripHorizontal, ZoomIn, ZoomOut } from 'lucide-react';

const ImageCropper: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [selectedRatio, setSelectedRatio] = useState<'1:1' | '4:3' | '16:9' | '9:16'>('1:1');
  const [zoom, setZoom] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const ratios = [
    { id: '1:1', name: 'Square', icon: Square, value: 1, desc: 'Instagram Post' },
    { id: '4:3', name: 'Standard', icon: Monitor, value: 4 / 3, desc: 'Classic Photo' },
    { id: '16:9', name: 'Widescreen', icon: Monitor, value: 16 / 9, desc: 'YouTube/HD' },
    { id: '9:16', name: 'Portrait', icon: Smartphone, value: 9 / 16, desc: 'Stories/Reels' },
  ];

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);
    setSuccess(false);
    setZoom(1);

    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setError("Invalid image file. Please upload a JPG, PNG, or WebP.");
      if (e.target) e.target.value = '';
      return;
    }

    setProcessing(true);
    const reader = new FileReader();

    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        setImage(ev.target?.result as string);
        setProcessing(false);
      };
      img.onerror = () => {
        setError("Invalid image file. The image may be corrupted.");
        setProcessing(false);
        setImage(null);
      };
      img.src = ev.target?.result as string;
    };

    reader.onerror = () => {
      setError("Error reading the file. Please try again.");
      setProcessing(false);
    };

    reader.readAsDataURL(file);
  };

  const performCrop = () => {
    if (!image || !canvasRef.current) return;
    setProcessing(true);
    setError(null);
    setSuccess(false);
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      try {
        const targetRatio = ratios.find(r => r.id === selectedRatio)?.value || 1;
        const imgRatio = img.width / img.height;
        
        let sWidth, sHeight, sx, sy;

        // Base crop calculation
        if (imgRatio > targetRatio) {
          sHeight = img.height;
          sWidth = img.height * targetRatio;
        } else {
          sWidth = img.width;
          sHeight = img.width / targetRatio;
        }

        // Apply Zoom simulation (reducing the sampling area)
        const zoomFactor = 1 / zoom;
        const finalSWidth = sWidth * zoomFactor;
        const finalSHeight = sHeight * zoomFactor;
        
        sx = (img.width - finalSWidth) / 2;
        sy = (img.height - finalSHeight) / 2;

        canvas.width = finalSWidth;
        canvas.height = finalSHeight;
        
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, sx, sy, finalSWidth, finalSHeight, 0, 0, finalSWidth, finalSHeight);
        }
        
        const link = document.createElement('a');
        link.download = `exploreatoolhub-crop-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        setProcessing(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } catch (err) {
        setError("Failed to process the crop.");
        setProcessing(false);
      }
    };

    img.src = image;
  };

  const getOverlayStyle = () => {
    const ratio = ratios.find(r => r.id === selectedRatio)?.value || 1;
    if (ratio >= 1) {
      return { width: '100%', aspectRatio: `${ratio} / 1` };
    } else {
      return { height: '100%', aspectRatio: `${ratio} / 1` };
    }
  };

  return (
    <div className="bg-white p-4 sm:p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start space-x-3 text-red-700 animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="flex-grow text-left">
            <p className="text-sm font-black uppercase tracking-wider mb-1">Error</p>
            <p className="text-sm font-medium leading-relaxed">{error}</p>
          </div>
          <button onClick={() => setError(null)} className="p-1 hover:bg-red-100 rounded-lg transition-colors">
            <XCircle className="w-5 h-5" />
          </button>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-2xl flex items-center space-x-3 text-green-700 animate-in fade-in slide-in-from-top-2">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm font-bold">Image cropped and downloaded successfully!</p>
        </div>
      )}

      {!image && !processing && (
        <label className="group relative border-4 border-dashed border-gray-100 rounded-[2.5rem] p-12 sm:p-24 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-gray-50 transition-all overflow-hidden bg-gray-50/30">
          <div className="w-24 h-24 bg-white rounded-3xl border border-gray-100 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm">
            <Upload className="w-10 h-10 text-gray-300 group-hover:text-gray-900 transition-colors" />
          </div>
          <h3 className="font-black text-gray-900 text-2xl mb-2">Upload Image to Crop</h3>
          <p className="text-sm text-gray-400 font-medium max-w-sm mx-auto leading-relaxed">
            Drag and drop or click to select a photo. Supports JPG, PNG, and WEBP.
          </p>
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
        <div className="py-24 bg-gray-50/50 rounded-[2.5rem] border border-dashed border-gray-100">
          <RefreshCw className="w-16 h-16 text-primary animate-spin mx-auto mb-6" />
          <p className="font-black text-gray-900 text-xl tracking-tight">Processing Image...</p>
        </div>
      )}

      {image && !processing && (
        <div className="space-y-8 animate-in zoom-in-95 duration-500">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Interactive Preview */}
            <div className="flex-grow bg-[#0f1115] rounded-[2.5rem] p-6 sm:p-12 border border-gray-800 shadow-2xl flex items-center justify-center min-h-[400px] lg:min-h-[550px] relative overflow-hidden">
              <div className="absolute top-6 left-6 flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span>Interactive Preview</span>
              </div>
              
              <div className="relative max-w-full inline-block group select-none">
                {/* Backdrop Original */}
                <img src={image} className="max-h-[300px] sm:max-h-[400px] rounded-xl opacity-20 grayscale transition-opacity blur-[4px]" alt="Backdrop" />
                
                {/* Crop Frame */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div 
                    className="border-2 border-primary rounded-xl shadow-[0_0_0_9999px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500 flex items-center justify-center relative pointer-events-auto"
                    style={{
                      ...getOverlayStyle(),
                      maxWidth: '100%',
                      maxHeight: '100%',
                    }}
                  >
                    {/* Grid Guides */}
                    <div className="absolute inset-0 pointer-events-none z-10 opacity-30">
                      <div className="absolute left-1/3 top-0 bottom-0 w-[1px] bg-white"></div>
                      <div className="absolute left-2/3 top-0 bottom-0 w-[1px] bg-white"></div>
                      <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-white"></div>
                      <div className="absolute top-2/3 left-0 right-0 h-[1px] bg-white"></div>
                    </div>

                    <img 
                      src={image} 
                      className="max-h-[300px] sm:max-h-[400px] object-cover w-full h-full transition-transform duration-300" 
                      style={{ transform: `scale(${zoom})` }}
                      alt="Crop Result" 
                    />
                  </div>
                </div>
              </div>

              {/* Zoom Controls */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 flex items-center space-x-6">
                <button onClick={() => setZoom(prev => Math.max(1, prev - 0.1))} className="text-white hover:text-primary transition-colors">
                  <ZoomOut className="w-5 h-5" />
                </button>
                <input 
                  type="range" 
                  min="1" max="3" step="0.1" 
                  value={zoom} 
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="w-32 h-1.5 bg-white/20 rounded-full appearance-none accent-primary cursor-pointer"
                />
                <button onClick={() => setZoom(prev => Math.min(3, prev + 0.1))} className="text-white hover:text-primary transition-colors">
                  <ZoomIn className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Controls Sidebar */}
            <div className="w-full lg:w-[350px] flex flex-col gap-6 text-left">
              <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 flex-grow">
                <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6 flex items-center">
                  <GripHorizontal className="w-4 h-4 mr-2" />
                  Aspect Ratio
                </h4>
                
                <div className="grid grid-cols-2 gap-3">
                  {ratios.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setSelectedRatio(r.id as any)}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 ${
                        selectedRatio === r.id 
                        ? 'border-primary bg-white text-gray-900 shadow-md' 
                        : 'border-white bg-white/50 text-gray-400 hover:border-gray-200'
                      }`}
                    >
                      <r.icon className={`w-6 h-6 mb-2 ${selectedRatio === r.id ? 'text-primary' : 'text-gray-300'}`} />
                      <span className="text-[10px] font-black uppercase tracking-tight">{r.name}</span>
                      <span className="text-[9px] font-bold opacity-50">{r.id}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={performCrop} 
                  className="w-full py-5 bg-gray-900 text-white font-black rounded-3xl flex items-center justify-center space-x-3 shadow-xl hover:bg-black transition-all hover:-translate-y-1 active:scale-[0.98]"
                >
                  <Download className="w-5 h-5 text-primary" />
                  <span>Crop & Download</span>
                </button>
                
                <button 
                  onClick={() => {
                    setImage(null);
                    setError(null);
                    setSuccess(false);
                  }} 
                  className="w-full py-4 bg-white border-2 border-gray-100 text-gray-400 font-black rounded-2xl hover:bg-gray-50 hover:text-gray-600 transition-all text-sm uppercase tracking-widest"
                >
                  Clear Image
                </button>
              </div>
            </div>
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}
    </div>
  );
};

export default ImageCropper;
