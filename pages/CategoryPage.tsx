import React, { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { TOOLS } from '../constants';
import Breadcrumbs from '../components/Layout/Breadcrumbs';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { ToolCategory } from '../types';

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  
  const categoryDisplayNames: Record<string, ToolCategory> = {
    'text': ToolCategory.TEXT,
    'image': ToolCategory.IMAGE,
    'calculator': ToolCategory.CALCULATOR,
    'utility': ToolCategory.UTILITY
  };

  const selectedCategory = categoryDisplayNames[categoryName || ''];
  if (!selectedCategory) return <Navigate to="/categories" />;

  const filteredTools = useMemo(() => 
    TOOLS.filter(t => t.category === selectedCategory),
    [selectedCategory]
  );

  return (
    <div className="bg-surface min-h-screen pt-32 pb-24 relative overflow-hidden">
      <div className="blob blob-2 !opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-12">
          <Breadcrumbs categoryName={selectedCategory} />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 reveal">
          <div className="max-w-2xl">
            <Link to="/categories" className="inline-flex items-center text-primary font-bold text-sm mb-6 hover:-translate-x-1 transition-transform">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Hub
            </Link>
            <h1 className="text-5xl md:text-7xl font-black text-midnight mb-6 tracking-tight">
              {selectedCategory.split(' ')[0]} <span className="text-primary">Studio.</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium">
              High-precision units designed for {selectedCategory.toLowerCase()} workflows.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 perspective-2000">
          {filteredTools.map((tool, i) => (
            <Link 
              key={tool.id} 
              to={tool.path}
              className="group relative reveal"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className="absolute inset-0 bg-primary/5 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              <div className="relative bg-white border border-slate-100 rounded-[3rem] p-10 h-full tool-card-3d shadow-premium flex flex-col justify-between hover:border-primary transition-colors border-b-4">
                <div>
                  <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <tool.icon className="w-8 h-8" />
                  </div>
                  <div className="flex items-center space-x-2 mb-3">
                     <span className="text-[10px] font-black text-primary uppercase tracking-widest">{selectedCategory.split(' ')[0]}</span>
                     {tool.popular && <Sparkles className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
                  </div>
                  <h3 className="text-2xl font-black text-midnight mb-4 tracking-tight group-hover:text-primary transition-colors">{tool.name}</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2">{tool.description}</p>
                </div>
                
                <div className="mt-10 pt-6 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover:text-midnight transition-colors">Launch Module</span>
                  <ArrowRight className="w-5 h-5 text-slate-200 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;