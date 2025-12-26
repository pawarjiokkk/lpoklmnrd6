import React from 'react';
import { BookOpen, Calendar, User, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogPage: React.FC = () => {
  const posts = [
    { title: "Mastering Digital Workflows in 2024", excerpt: "How professional-grade online tools can save you hours of manual labor every single week.", date: "Oct 12, 2024", author: "Engineering Team", category: "Efficiency" },
    { title: "Why Browser-Based Privacy is the Future", excerpt: "Learn why processing data locally on your device is the safest way to handle sensitive content.", date: "Oct 10, 2024", author: "Security Lead", category: "Security" },
    { title: "SEO Secrets: The Importance of Word Count", excerpt: "A deep dive into how text metrics influence your search engine rankings and user engagement.", date: "Oct 05, 2024", author: "SEO Expert", category: "SEO" }
  ];

  return (
    <div className="bg-surface min-h-screen pt-32 pb-24 relative overflow-hidden">
      <div className="blob blob-1 !opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20 reveal text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full mb-6 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-black text-primary uppercase tracking-widest">Industry Insights</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-midnight mb-6 tracking-tight">
            The Hub <span className="text-primary">Journal.</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Latest news, efficiency guides, and security updates from the ExploreaToolHub engineering lab.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {posts.map((post, i) => (
            <div key={i} className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-premium flex flex-col justify-between group reveal" style={{ transitionDelay: `${i * 100}ms` }}>
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <span className="px-4 py-1.5 bg-slate-50 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest">{post.category}</span>
                </div>
                <h3 className="text-2xl font-black text-midnight mb-4 tracking-tight group-hover:text-primary transition-colors leading-tight">{post.title}</h3>
                <p className="text-slate-500 font-medium mb-8 leading-relaxed line-clamp-3">{post.excerpt}</p>
              </div>
              
              <div className="pt-8 border-t border-slate-50">
                <div className="flex items-center justify-between mb-6">
                   <div className="flex items-center space-x-2 text-xs font-bold text-slate-400">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                   </div>
                   <div className="flex items-center space-x-2 text-xs font-bold text-slate-400">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                   </div>
                </div>
                <button className="flex items-center space-x-2 text-primary font-black uppercase tracking-widest text-[10px] group-hover:translate-x-2 transition-transform">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 p-12 bg-midnight rounded-[4rem] text-center reveal">
           <h2 className="text-3xl font-black text-white mb-6">Stay ahead of the curve.</h2>
           <p className="text-slate-400 font-medium mb-10 max-w-xl mx-auto text-lg">
             Subscribe to our monthly digest of new tools, optimization tips, and digital security deep-dives.
           </p>
           <div className="max-w-md mx-auto flex gap-4">
              <input type="email" placeholder="Your professional email" className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:ring-2 focus:ring-primary/50" />
              <button className="bg-primary text-midnight font-black px-8 py-4 rounded-2xl hover:scale-105 transition-all">Join</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;