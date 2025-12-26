
import React, { useState } from 'react';
import { Upload, FileImage, Download } from 'lucide-react';

interface Props { mode: 'jpg-to-png' | 'png-to-jpg'; }

const ImageConverter: React.FC<Props> = ({ mode }) => {
  const [image, setImage] = useState<string | null>(null);
  const targetFormat = mode === 'jpg-to-png' ? 'image/png' : 'image/jpeg';
  const targetExt = mode === 'jpg-to-png' ? 'png' : 'jpg';

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleConvert = () => {
    if (!image) return;
    const canvas = document.createElement('canvas');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (mode === 'png-to-jpg') {
        ctx!.fillStyle = '#FFFFFF';
        ctx!.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx?.drawImage(img, 0, 0);
      const link = document.createElement('a');
      link.download = `converted-image.${targetExt}`;
      link.href = canvas.toDataURL(targetFormat, 0.9);
      link.click();
    };
    img.src = image;
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
      <h3 className="text-xl font-bold mb-6">Convert {mode.split('-').shift()?.toUpperCase()} to {targetExt.toUpperCase()}</h3>
      {!image ? (
        <label className="border-2 border-dashed border-gray-200 rounded-3xl p-16 flex flex-col items-center justify-center cursor-pointer">
          <Upload className="w-12 h-12 text-gray-300 mb-4" />
          <p className="font-bold">Select File</p>
          <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
        </label>
      ) : (
        <div className="space-y-6">
          <div className="p-4 bg-gray-50 rounded-2xl inline-block">
            <img src={image} className="max-h-60 rounded-lg" alt="Source" />
          </div>
          <button onClick={handleConvert} className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl flex items-center justify-center space-x-2">
            <FileImage className="w-5 h-5" />
            <span>Convert & Download .{targetExt}</span>
          </button>
          <button onClick={() => setImage(null)} className="text-gray-400 text-sm font-bold">Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ImageConverter;
