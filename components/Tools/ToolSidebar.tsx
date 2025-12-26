
import React from 'react';
import { Link } from 'react-router-dom';
import { TOOLS } from '../../constants';
import { ToolCategory } from '../../types';
// Fix: Added missing Info to the lucide-react imports
import { Layout, Sparkles, TrendingUp, ShieldCheck, Info } from 'lucide-react';

interface Props {
  currentToolId: string;
  category: ToolCategory;
}

const ToolSidebar: React.FC<Props> = ({ currentToolId, category }) => {
  const relatedTools = TOOLS
    .filter(t => t.category === category && t.id !== currentToolId)
    .slice(0, 8);

  return (
    <aside className="space-y-8 sticky top-24">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden relative">
        <div className="flex items-center justify-between mb-8">
           <h3 className="text-xl font-black text-gray-900 flex items-center">
            <TrendingUp className="w-5 h-5 mr-3 text-primary" />
            Trending Tools
          </h3>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        </div>
        
        <div className="space-y-4">
          {relatedTools.map(tool => (
            <Link 
              key={tool.id} 
              to={tool.path}
              className="flex items-center p-4 rounded-2xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group"
            >
              <div className="p-2.5 bg-gray-50 rounded-xl mr-4 group-hover:bg-primary transition-colors shadow-sm">
                <tool.icon className="w-5 h-5 text-gray-500 group-hover:text-gray-900" />
              </div>
              <div>
                <span className="text-sm font-black text-gray-800 block leading-tight">{tool.name}</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Fast & Reliable</span>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-50">
           <Link to="/" className="w-full py-4 bg-gray-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest text-center block hover:bg-black transition-colors shadow-lg">
             View All 32+ Tools
           </Link>
        </div>
      </div>

      <div className="bg-primary/5 p-8 rounded-[2.5rem] border border-primary/10 relative overflow-hidden group">
        <Sparkles className="absolute -top-4 -right-4 w-16 h-16 text-primary/10 group-hover:rotate-12 transition-transform" />
        <h3 className="font-black text-gray-900 mb-3 flex items-center text-sm uppercase tracking-widest">
          <ShieldCheck className="w-4 h-4 mr-2" />
          Pro Tip
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed font-bold">
          All ExploreaToolHub tools use client-side processing. Your files and data are never sent to a backend server.
        </p>
      </div>

      <div className="bg-white p-2 rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden group">
        <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
           <div className="flex justify-between items-center mb-4">
             <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Sponsored</span>
             <Info className="w-3 h-3 text-gray-200" />
           </div>
           <div className="aspect-square bg-white rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-gray-100 group-hover:border-primary/20 transition-colors">
              <Layout className="w-12 h-12 text-gray-100 mb-4" />
              <p className="text-xs font-black text-gray-300 uppercase tracking-widest">Ad Placement</p>
           </div>
           <p className="mt-4 text-[10px] text-gray-400 text-center font-bold">ExploreaToolHub is supported by ads. <br/>Thank you for your visit!</p>
        </div>
      </div>
    </aside>
  );
};

export default ToolSidebar;
