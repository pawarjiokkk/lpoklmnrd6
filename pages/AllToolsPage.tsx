import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, LayoutGrid, Sparkles, Filter } from 'lucide-react';
import { TOOLS } from '../constants';
import { ToolCategory } from '../types';

const AllToolsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Object.values(ToolCategory)];

  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           tool.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className="bg-surface min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="mb-16 reveal">
          <div className="flex items-center space-x-3 text-primary mb-4">
            <LayoutGrid className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-[0.4em]">Resource Directory</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-midnight mb-6 tracking-tight">
            Complete Tool <span className="text-primary">Index.</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl">
            Access our full suite of professional utilities. All tools run 100% locally in your browser for maximum security.
          </p>
        </div>

        {/* Filters & Search Bar */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-premium border border-slate-100 mb-12 flex flex-col lg:flex-row items-center gap-6 reveal delay-100">
          <div className="relative flex-grow w-full">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search across 32+ professional tools..." 
              className="w-full pl-14 pr-6 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all font-semibold text-midnight"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide">
            <div className="flex items-center mr-2 text-slate-400">
               <Filter className="w-4 h-4 mr-2" />
               <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Filter:</span>
            </div>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeCategory === cat 
                  ? 'bg-midnight text-white shadow-lg' 
                  : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-midnight'
                }`}
              >
                {cat.replace(' Tools', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool, i) => (
              <Link 
                key={tool.id} 
                to={tool.path}
                className="group reveal"
                style={{ transitionDelay: `${(i % 8) * 50}ms` }}
              >
                <div className="h-full bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-premium transition-all duration-500 flex flex-col group hover:-translate-y-2 border-b-4 hover:border-primary">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <tool.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">{tool.category.split(' ')[0]}</span>
                       {tool.popular && <Sparkles className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
                    </div>
                    <h3 className="text-xl font-black text-midnight mb-3 tracking-tight group-hover:text-primary transition-colors">{tool.name}</h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2">{tool.description}</p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover:text-midnight transition-colors">Launch Module</span>
                    <ArrowRight className="w-5 h-5 text-slate-200 group-hover:text-primary transition-all group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-32 text-center reveal">
               <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-slate-300" />
               </div>
               <h3 className="text-2xl font-black text-midnight mb-2">No matching tools found</h3>
               <p className="text-slate-500 font-medium">Try adjusting your filters or search terms.</p>
               <button 
                onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                className="mt-8 text-primary font-black uppercase tracking-widest text-xs underline decoration-2 underline-offset-8"
               >
                 Reset All Filters
               </button>
            </div>
          )}
        </div>

        {/* SEO Trust Footer for the Page */}
        <div className="mt-32 p-12 bg-midnight rounded-[4rem] text-center reveal">
           <h2 className="text-3xl font-black text-white mb-6">Didn't find what you need?</h2>
           <p className="text-slate-400 font-medium mb-10 max-w-xl mx-auto">
             We are constantly expanding our ecosystem. Request a new utility module and our engineering team will review it for the next sprint.
           </p>
           <Link to="/contact" className="inline-flex items-center space-x-3 px-10 py-5 bg-primary text-white font-black rounded-2xl hover:scale-105 transition-all shadow-xl shadow-primary/20">
              <span>Submit Tool Request</span>
              <ArrowRight className="w-5 h-5" />
           </Link>
        </div>
      </div>
    </div>
  );
};

export default AllToolsPage;