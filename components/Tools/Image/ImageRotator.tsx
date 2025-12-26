
import React, { useState, useRef } from 'react';
import { RotateCw, Download, Upload } from 'lucide-react';

const ImageRotator: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const rotate = () => setRotation((r) => (r + 90) % 360);

  const download = () => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      if (rotation % 180 === 90) {
        canvas.width = img.height;
        canvas.height = img.width;
      } else {
        canvas.width = img.width;
        canvas.height = img.height;
      }
      ctx?.translate(canvas.width / 2, canvas.height / 2);
      ctx?.rotate((rotation * Math.PI) / 180);
      ctx?.drawImage(img, -img.width / 2, -img.height / 2);
      const link = document.createElement('a');
      link.download = 'rotated-image.png';
      link.href = canvas.toDataURL();
      link.click();
    };
    img.src = image;
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
      {!image ? (
        <label className="border-2 border-dashed border-gray-200 rounded-3xl p-12 sm:p-16 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
          <Upload className="w-10 h-10 text-gray-300 mb-4" />
          <p className="font-bold text-gray-900">Upload to Rotate</p>
          <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
        </label>
      ) : (
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-2xl inline-block transition-transform duration-300 max-w-full overflow-hidden" style={{ transform: `rotate(${rotation}deg)` }}>
            <img src={image} className="max-h-60 rounded-lg object-contain" alt="Preview" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={rotate} className="flex-1 py-4 bg-gray-100 text-gray-900 font-bold rounded-2xl flex items-center justify-center space-x-2 hover:bg-gray-200 transition-colors">
              <RotateCw className="w-5 h-5" />
              <span>Rotate 90°</span>
            </button>
            <button onClick={download} className="flex-1 py-4 bg-gray-900 text-white font-bold rounded-2xl flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors">
              <Download className="w-5 h-5" />
              <span>Download</span>
            </button>
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}
    </div>
  );
};

export default ImageRotator;
