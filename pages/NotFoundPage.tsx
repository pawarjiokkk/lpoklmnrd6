import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, ArrowLeft, Home, Search } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-6 pt-20">
      <div className="max-w-2xl w-full text-center reveal">
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full scale-150 -z-10"></div>
          <div className="w-32 h-32 bg-white rounded-[2.5rem] shadow-3d-lift flex items-center justify-center mx-auto border border-slate-100 rotate-12">
            <FileQuestion className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-[12rem] font-black text-slate-900/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-20 leading-none">404</h1>
        </div>

        <h2 className="text-4xl md:text-5xl font-black text-midnight mb-6 tracking-tight">Node Not Found.</h2>
        <p className="text-lg text-slate-500 font-medium mb-12 leading-relaxed">
          The utility module you are looking for has either been relocated or never existed in our directory. Let's get you back to the hub.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/" className="w-full sm:w-auto px-10 py-5 bg-midnight text-white rounded-2xl font-black hover:bg-primary transition-all flex items-center justify-center space-x-3 shadow-xl">
            <Home className="w-5 h-5" />
            <span>Return Home</span>
          </Link>
          <Link to="/all-tools" className="w-full sm:w-auto px-10 py-5 bg-white border border-slate-100 text-midnight rounded-2xl font-black hover:bg-slate-50 transition-all flex items-center justify-center space-x-3 shadow-premium">
            <Search className="w-5 h-5" />
            <span>Search Directory</span>
          </Link>
        </div>

        <div className="mt-20 flex items-center justify-center space-x-8">
           <div className="text-center">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Status Code</p>
              <p className="text-xl font-black text-slate-900">404 Error</p>
           </div>
           <div className="w-px h-10 bg-slate-100"></div>
           <div className="text-center">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">System Node</p>
              <p className="text-xl font-black text-slate-900">Routing Fail</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;