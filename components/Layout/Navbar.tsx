import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Terminal, Sparkles, LayoutGrid, BookOpen, Mail, Home } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'All Tools', path: '/all-tools', icon: LayoutGrid },
    { name: 'Categories', path: '/categories', icon: Sparkles },
    { name: 'Blog', path: '/blog', icon: BookOpen },
    { name: 'Contact', path: '/contact', icon: Mail, isCTA: true },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2.5 group">
          <div className="bg-midnight p-2 rounded-xl group-hover:bg-primary transition-colors">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-midnight">
            ExploreaHub
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-1">
          {navItems.map((item, idx) => (
            item.isCTA ? (
              <Link 
                key={idx}
                to={item.path}
                className="ml-4 px-6 py-2.5 bg-primary text-white rounded-full text-sm font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center space-x-2"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ) : (
              <Link
                key={idx}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center space-x-2 ${
                  pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path)) 
                  ? 'text-primary bg-primary/5' 
                  : 'text-slate-500 hover:text-midnight hover:bg-slate-50'
                }`}
              >
                <span>{item.name}</span>
              </Link>
            )
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-midnight bg-white rounded-xl shadow-sm border border-slate-100"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-2">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 p-4 rounded-xl transition-all ${
                  item.isCTA ? 'bg-primary text-white font-bold' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;