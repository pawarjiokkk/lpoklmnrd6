import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Layers, Activity, Monitor, Cpu, ArrowRight, Sparkles } from 'lucide-react';
import { ToolCategory } from '../types';

const CategoriesPage: React.FC = () => {
  const categoryData = useMemo(() => [
    { name: ToolCategory.TEXT, icon: Layers, path: '/category/text', desc: 'Precision tools for counting, checking, and generating content.', count: 10, color: 'from-blue-500 to-indigo-600' },
    { name: ToolCategory.IMAGE, icon: Monitor, path: '/category/image', desc: 'High-quality scaling, cropping, and compression utilities.', count: 7, color: 'from-purple-500 to-pink-600' },
    { name: ToolCategory.CALCULATOR, icon: Activity, path: '/category/calculator', desc: 'Accurate math for health, finance, and daily life metrics.', count: 7, color: 'from-emerald-500 to-teal-600' },
    { name: ToolCategory.UTILITY, icon: Cpu, path: '/category/utility', desc: 'Secure generators and converters for professional workflows.', count: 8, color: 'from-amber-500 to-orange-600' },
  ], []);

  return (
    <div className="bg-surface min-h-screen pt-32 pb-24 relative overflow-hidden">
      <div className="blob blob-1 !opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20 reveal">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full mb-6 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-black text-primary uppercase tracking-widest">Knowledge Hub</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-midnight mb-6 tracking-tight">
            Tool <span className="text-primary">Ecosystem.</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl leading-relaxed">
            Every module is engineered for a specific digital objective. Explore our clusters of efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 perspective-2000">
          {categoryData.map((cat, i) => (
            <Link 
              key={i} 
              to={cat.path}
              className="group relative reveal"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="absolute inset-0 bg-primary/5 rounded-[4rem] blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              <div className="relative bg-white border border-slate-100 rounded-[4rem] p-12 tool-card-3d shadow-premium flex flex-col justify-between h-[400px] overflow-hidden">
                {/* Background Decor */}
                <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${cat.color} opacity-[0.03] group-hover:opacity-10 rounded-bl-[10rem] transition-all duration-700`}></div>
                
                <div>
                  <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:rotate-6">
                    <cat.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-4xl font-black text-midnight mb-4 tracking-tight">{cat.name}</h3>
                  <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-xs">{cat.desc}</p>
                </div>

                <div className="flex items-center justify-between pt-10 border-t border-slate-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-xs font-black text-midnight uppercase tracking-widest">{cat.count} Active Modules</span>
                  </div>
                  <div className="w-14 h-14 bg-midnight text-white rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;