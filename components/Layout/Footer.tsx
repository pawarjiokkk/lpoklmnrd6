import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Terminal, Sparkles } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-24 relative overflow-hidden border-t border-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#c2f71108,transparent_50%)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-20">
          {/* Brand Col */}
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="bg-primary p-2.5 rounded-xl shadow-lg shadow-primary/10">
                <Terminal className="w-6 h-6 text-slate-950" />
              </div>
              <span className="text-2xl font-black text-white tracking-tighter">ExploreaHub</span>
            </div>
            <p className="text-base leading-relaxed font-medium">
              A high-performance local-first utility ecosystem. Simplifying digital workflows through uncompromised privacy and professional-grade engineering.
            </p>
            <div className="flex space-x-5">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-primary hover:text-slate-950 transition-all group">
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Col 1 */}
          <div>
            <h3 className="text-white font-black text-xs uppercase tracking-[0.4em] mb-10 flex items-center">
               <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
               Standard Core
            </h3>
            <ul className="space-y-5 text-sm font-bold uppercase tracking-widest">
              <li><Link to="/tool/word-counter" className="hover:text-primary transition-colors">Word Counter</Link></li>
              <li><Link to="/tool/image-compressor" className="hover:text-primary transition-colors">Image Forge</Link></li>
              <li><Link to="/tool/password-generator" className="hover:text-primary transition-colors">Security Core</Link></li>
              <li><Link to="/tool/age-calculator" className="hover:text-primary transition-colors">Metric Calc</Link></li>
              <li><Link to="/tool/qr-generator" className="hover:text-primary transition-colors">QR Engine</Link></li>
            </ul>
          </div>

          {/* Nav Col 2 */}
          <div>
            <h3 className="text-white font-black text-xs uppercase tracking-[0.4em] mb-10 flex items-center">
               <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
               Environment
            </h3>
            <ul className="space-y-5 text-sm font-bold uppercase tracking-widest">
              <li><Link to="/about" className="hover:text-primary transition-colors">The Manifesto</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Module Request</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Utility Index</Link></li>
              <li><Link to="/category/text" className="hover:text-primary transition-colors">Content Logic</Link></li>
            </ul>
          </div>

          {/* Legal Col */}
          <div className="bg-white/5 p-10 rounded-[3rem] border border-white/5">
            <h3 className="text-white font-black text-xs uppercase tracking-[0.4em] mb-10">Legal Directives</h3>
            <ul className="space-y-5 text-sm font-bold uppercase tracking-widest">
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Terms of Ops</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-[10px] font-black uppercase tracking-[0.3em]">
          <div className="flex items-center space-x-3">
             <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" />
             </div>
             <p>&copy; {new Date().getFullYear()} ExploreaToolHub Index. All rights reserved.</p>
          </div>
          <div className="flex space-x-10 text-slate-500">
            <Link to="/privacy" className="hover:text-white transition-colors">Encrypted Cookies</Link>
            <Link to="/disclaimer" className="hover:text-white transition-colors">Node Status</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;