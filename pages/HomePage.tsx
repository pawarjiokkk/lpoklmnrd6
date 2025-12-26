import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Zap, Shield, ArrowRight, LayoutGrid, Star, 
  Layers, Activity, Monitor, Cpu, Sparkles, MoveUpRight, Settings
} from 'lucide-react';
import { TOOLS } from '../constants';
import { ToolCategory } from '../types';

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const categories = useMemo(() => [
    { name: ToolCategory.TEXT, icon: Layers, count: 12, path: '/category/text', desc: 'Precision engines for professional content editing.' },
    { name: ToolCategory.IMAGE, icon: Monitor, count: 8, path: '/category/image', desc: 'Advanced visuals for modern scaling and design.' },
    { name: ToolCategory.CALCULATOR, icon: Activity, count: 7, path: '/category/calculator', desc: 'High-accuracy math for financial and health metrics.' },
    { name: ToolCategory.UTILITY, icon: Cpu, count: 8, path: '/category/utility', desc: 'Security-first tools for your daily system tasks.' },
  ], []);

  const popularTools = useMemo(() => TOOLS.filter(t => t.popular).slice(0, 6), []);

  const filteredSearch = useMemo(() => {
    if (!searchTerm.trim()) return [];
    return TOOLS.filter(t => 
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      t.description.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5);
  }, [searchTerm]);

  return (
    <div className="relative overflow-x-hidden">
      {/* Hero Section with 3D Animated Background */}
      <section className="relative pt-40 pb-32 lg:pt-56 lg:pb-48 bg-white overflow-hidden">
        {/* Background Blobs */}
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>

        {/* Floating Background Shapes/Icons */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[18%] left-[8%] floating-element hidden xl:block opacity-30">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-xl border border-white/40 rounded-[2rem] shadow-3d-lift flex items-center justify-center -rotate-12">
              <Cpu className="w-10 h-10 text-primary" />
            </div>
          </div>
          <div className="absolute top-[12%] right-[10%] floating-element delay-2000 duration-20 hidden xl:block opacity-20">
            <div className="w-32 h-32 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] shadow-3d-lift flex items-center justify-center rotate-6">
              <Layers className="w-14 h-14 text-indigo-300" />
            </div>
          </div>
          <div className="absolute bottom-[20%] left-[12%] floating-element delay-4000 hidden xl:block opacity-10">
            <div className="w-40 h-40 bg-midnight/5 backdrop-blur-md border border-midnight/10 rounded-[3rem] shadow-premium flex items-center justify-center -rotate-6">
              <Settings className="w-20 h-20 text-midnight" />
            </div>
          </div>
          <div className="absolute bottom-[25%] right-[15%] floating-element delay-6000 duration-20 hidden xl:block opacity-25">
            <div className="w-20 h-20 bg-primary/5 backdrop-blur-lg border border-primary/20 rounded-[1.5rem] shadow-glow flex items-center justify-center rotate-12">
              <Zap className="w-8 h-8 text-primary fill-primary" />
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 reveal">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full mb-8 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Premium Tool Suite 2.0</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-midnight mb-8 tracking-tight leading-[0.9] lg:max-w-5xl mx-auto">
              Master your workflow with <span className="text-primary">Precision.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              Fast, secure, and professional-grade utilities. Designed for those who demand excellence in every digital task.
            </p>

            {/* Massive Search Bar */}
            <div className="max-w-3xl mx-auto relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-indigo-500/20 rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative flex items-center">
                <Search className="absolute left-6 text-slate-400 w-6 h-6" />
                <input 
                  type="text"
                  placeholder="Search for a tool (e.g. Word Counter, Image Resizer)..."
                  className="w-full pl-16 pr-32 py-7 bg-white rounded-[2rem] border border-slate-100 shadow-3d-lift outline-none text-xl font-semibold text-midnight transition-all focus:ring-4 focus:ring-primary/10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="absolute right-4 px-8 py-4 bg-midnight text-white rounded-[1.5rem] font-bold hover:bg-primary transition-all shadow-lg active:scale-95">
                  Explore
                </button>
              </div>

              {/* Search Results Preview */}
              {searchTerm && (
                <div className="absolute top-full left-0 right-0 mt-4 bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                  {filteredSearch.length > 0 ? (
                    <div className="p-2">
                      {filteredSearch.map(tool => (
                        <Link key={tool.id} to={tool.path} className="flex items-center p-5 hover:bg-slate-50 rounded-2xl group/item transition-all">
                          <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mr-4 group-hover/item:bg-primary transition-colors">
                            <tool.icon className="w-6 h-6 text-slate-400 group-hover/item:text-white" />
                          </div>
                          <div className="text-left flex-grow">
                            <p className="font-bold text-midnight">{tool.name}</p>
                            <p className="text-xs text-slate-400">{tool.category}</p>
                          </div>
                          <MoveUpRight className="w-5 h-5 text-slate-200 group-hover/item:text-primary transition-all" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-slate-400 font-medium italic">No tools found matching your search.</div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 reveal delay-200">
            <div className="flex items-center space-x-3 text-slate-400 font-bold text-sm bg-white/50 backdrop-blur-sm px-5 py-3 rounded-2xl border border-slate-100">
              <Shield className="w-4 h-4 text-green-500" />
              <span>100% Client-Side Processing</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-400 font-bold text-sm bg-white/50 backdrop-blur-sm px-5 py-3 rounded-2xl border border-slate-100">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span>Zero-Latency Execution</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section - High Contrast Grid with Enhanced 3D */}
      <section className="bg-white py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl reveal">
              <h2 className="text-4xl md:text-5xl font-black text-midnight mb-6 tracking-tight">Ecosystem of efficiency.</h2>
              <p className="text-lg text-slate-500 font-medium">Categorized modules built for professional digital workflows.</p>
            </div>
            <Link to="/all-tools" className="reveal flex items-center space-x-2 text-primary font-bold hover:translate-x-1 transition-all">
              <span>View full directory</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 perspective-2000">
            {categories.map((cat, i) => (
              <Link 
                key={i} 
                to={cat.path}
                className="group relative h-[480px] reveal"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Dynamic Background Glow */}
                <div className="absolute inset-0 bg-primary/20 rounded-[3.5rem] blur-[60px] opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10 scale-90 group-hover:scale-105"></div>
                
                <div className="relative h-full bg-white border border-slate-100 rounded-[3.5rem] p-10 flex flex-col justify-between tool-card-3d shadow-premium overflow-hidden preserve-3d">
                  {/* Glassmorph Abstract Element */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-[8rem] -translate-y-24 translate-x-24 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-1000 opacity-60"></div>
                  
                  <div className="preserve-3d relative z-10">
                    <div className="w-20 h-20 bg-slate-50 text-slate-400 rounded-2xl border border-white flex items-center justify-center mb-10 group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-sm group-hover:scale-110 group-hover:rotate-12 group-hover:translate-z-10" style={{ transform: 'translateZ(20px)' }}>
                      <cat.icon className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-black text-midnight mb-4 tracking-tight group-hover:translate-z-10" style={{ transform: 'translateZ(10px)' }}>{cat.name}</h3>
                    <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8">{cat.desc}</p>
                    <div className="flex items-center space-x-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-glow"></div>
                      <span className="text-[10px] text-slate-400 font-black tracking-widest uppercase">{cat.count} Active Modules</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-8 border-t border-slate-50 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all group-hover:shadow-lg">
                      <ArrowRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover:text-midnight transition-colors">Launch Module</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tools Dark Stage */}
      <section className="bg-midnight py-40 rounded-t-[5rem] lg:rounded-t-[8rem] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12 reveal">
            <div className="max-w-2xl">
              <div className="flex items-center space-x-2 text-primary mb-6">
                <Star className="w-5 h-5 fill-primary" />
                <span className="text-xs font-black uppercase tracking-[0.4em]">The Standard Index</span>
              </div>
              <h2 className="text-5xl font-black text-white mb-6 tracking-tight">Most impactful units.</h2>
              <p className="text-lg text-slate-400 font-medium">The core utilities utilized daily by our global user base.</p>
            </div>
            <Link to="/all-tools" className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center space-x-4">
              <span>Launch Directory</span>
              <LayoutGrid className="w-5 h-5 text-primary" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {popularTools.map((tool, i) => (
              <Link 
                key={tool.id} 
                to={tool.path}
                className="group reveal"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-10 h-full hover:bg-white/10 transition-all duration-500 border-b-4 hover:border-primary">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all">
                    <tool.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{tool.name}</h3>
                  <p className="text-slate-500 font-medium text-base mb-8 line-clamp-2 leading-relaxed">{tool.description}</p>
                  <div className="flex items-center text-primary font-bold text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                    <span>Boot Engine</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Global Trust Banner */}
      <section className="py-24 bg-surface px-6">
        <div className="max-w-7xl mx-auto reveal">
          <div className="bg-white rounded-[4rem] p-12 md:p-20 shadow-premium border border-slate-100 flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-8">
                <Shield className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-4xl font-black text-midnight mb-8 tracking-tight italic">Zero Transmission Privacy.</h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed">
                We believe your data belongs to you. Every calculation and image process happens <span className="text-midnight font-bold">strictly within your browser RAM</span>. No data ever touches our servers.
              </p>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-6">
              {[
                { label: 'Local Encrypted', icon: Zap },
                { label: 'No Accounts', icon: Star },
                { label: 'Ad-Safe Content', icon: Shield },
                { label: 'Modern UX', icon: Sparkles },
              ].map((item, i) => (
                <div key={i} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 text-center flex flex-col items-center">
                  <item.icon className="w-8 h-8 text-slate-300 mb-4" />
                  <span className="text-sm font-black text-midnight tracking-tight uppercase">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modern Final CTA */}
      <section className="py-24 px-6 reveal">
         <div className="max-w-5xl mx-auto bg-primary rounded-[4rem] p-20 text-center relative overflow-hidden shadow-glow">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,white_0%,transparent_50%)] opacity-20"></div>
            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tight leading-none">Your digital workspace, <br/>powered by ExploreaHub.</h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link to="/all-tools" className="px-12 py-6 bg-white text-midnight font-black rounded-2xl text-lg hover:scale-105 transition-all shadow-xl">
                  Start Exploring
                </Link>
                <Link to="/about" className="px-12 py-6 bg-midnight text-white font-black rounded-2xl text-lg hover:bg-slate-900 transition-all">
                  Read Manifesto
                </Link>
              </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default HomePage;