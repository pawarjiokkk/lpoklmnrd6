import React, { useMemo, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { TOOLS } from '../constants';
import ToolSidebar from '../components/Tools/ToolSidebar';
import Breadcrumbs from '../components/Layout/Breadcrumbs';
import { ToolCategory } from '../types';
import { 
  ChevronRight, HelpCircle, CheckCircle, Info, Zap, 
  Star, Link as LinkIcon, Briefcase, ArrowLeft,
  ShieldCheck, Layout, BookOpen, MessageCircle, Share2,
  // Fix: Added missing Sparkles icon to imports
  Sparkles
} from 'lucide-react';

// TOOL LOGIC IMPORTS
import WordCounter from '../components/Tools/Text/WordCounter';
import CharCounter from '../components/Tools/Text/CharCounter';
import SentenceCounter from '../components/Tools/Text/SentenceCounter';
import ParagraphCounter from '../components/Tools/Text/ParagraphCounter';
import ReadingTimeCalculator from '../components/Tools/Text/ReadingTimeCalculator';
import TextCompare from '../components/Tools/Text/TextCompare';
import GrammarChecker from '../components/Tools/Text/GrammarChecker';
import PlagiarismChecker from '../components/Tools/Text/PlagiarismChecker';
import LoremIpsumGen from '../components/Tools/Text/LoremIpsumGen';
import Notepad from '../components/Tools/Text/Notepad';
import ImageCompressor from '../components/Tools/Image/ImageCompressor';
import ImageResizer from '../components/Tools/Image/ImageResizer';
import ImageConverter from '../components/Tools/Image/ImageConverter';
import ImageRotator from '../components/Tools/Image/ImageRotator';
import ImageMetadata from '../components/Tools/Image/ImageMetadata';
import ImageCropper from '../components/Tools/Image/ImageCropper';
import AgeCalculator from '../components/Tools/Calculators/AgeCalculator';
import BMICalculator from '../components/Tools/Calculators/BMICalculator';
import PercentageCalculator from '../components/Tools/Calculators/PercentageCalculator';
import LoanEMICalculator from '../components/Tools/Calculators/LoanEMICalculator';
import GSTCalculator from '../components/Tools/Calculators/GSTCalculator';
import ProfitLossCalculator from '../components/Tools/Calculators/ProfitLossCalculator';
import DiscountCalculator from '../components/Tools/Calculators/DiscountCalculator';
import PasswordGenerator from '../components/Tools/Utility/PasswordGenerator';
import PasswordStrengthChecker from '../components/Tools/Utility/PasswordStrengthChecker';
import QRCodeGenerator from '../components/Tools/Utility/QRCodeGenerator';
import RandomNumberGenerator from '../components/Tools/Utility/RandomNumberGenerator';
import ColorPicker from '../components/Tools/Utility/ColorPicker';
import UnitConverter from '../components/Tools/Utility/UnitConverter';
import CurrencyConverter from '../components/Tools/Utility/CurrencyConverter';
import StopwatchTimer from '../components/Tools/Utility/StopwatchTimer';

const ToolDetailPage: React.FC = () => {
  const { toolId } = useParams<{ toolId: string }>();
  
  const tool = useMemo(() => 
    TOOLS.find(t => t.id === toolId || t.path.split('/').pop() === toolId), 
    [toolId]
  );

  const relatedTools = useMemo(() => {
    if (!tool) return [];
    return TOOLS.filter(t => t.category === tool.category && t.id !== tool.id).slice(0, 4);
  }, [tool]);

  useEffect(() => {
    if (tool) {
      // Dynamic Title and Meta management for SEO
      document.title = tool.seoContent.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', tool.seoContent.description);

      // JSON-LD Structured Data Injection for Google Rich Results
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": tool.name,
        "description": tool.description,
        "applicationCategory": "Utility",
        "operatingSystem": "Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);

      window.scrollTo(0, 0);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [tool]);

  if (!tool) return <Navigate to="/404" />;

  const getCategorySlug = (cat: ToolCategory) => {
    if (cat === ToolCategory.TEXT) return 'text';
    if (cat === ToolCategory.IMAGE) return 'image';
    if (cat === ToolCategory.CALCULATOR) return 'calculator';
    if (cat === ToolCategory.UTILITY) return 'utility';
    return '';
  };

  const renderToolLogic = () => {
    switch (tool.id) {
      case 'word-counter': return <WordCounter />;
      case 'char-counter': return <CharCounter />;
      case 'sentence-counter': return <SentenceCounter />;
      case 'paragraph-counter': return <ParagraphCounter />;
      case 'reading-time': return <ReadingTimeCalculator />;
      case 'text-compare': return <TextCompare />;
      case 'grammar-checker': return <GrammarChecker />;
      case 'plagiarism-checker': return <PlagiarismChecker />;
      case 'lorem-ipsum': return <LoremIpsumGen />;
      case 'online-notepad': return <Notepad />;
      case 'image-compressor': return <ImageCompressor />;
      case 'image-resizer': return <ImageResizer />;
      case 'jpg-to-png': 
      case 'png-to-jpg': return <ImageConverter mode={tool.id as 'jpg-to-png' | 'png-to-jpg'} />;
      case 'image-rotator': return <ImageRotator />;
      case 'image-metadata': return <ImageMetadata />;
      case 'image-cropper': return <ImageCropper />;
      case 'age-calculator': return <AgeCalculator />;
      case 'bmi-calculator': return <BMICalculator />;
      case 'percentage-calculator': return <PercentageCalculator />;
      case 'loan-emi': return <LoanEMICalculator />;
      case 'gst-calculator': return <GSTCalculator />;
      case 'profit-loss': return <ProfitLossCalculator />;
      case 'discount-calculator': return <DiscountCalculator />;
      case 'password-generator': return <PasswordGenerator />;
      case 'password-strength-checker': return <PasswordStrengthChecker />;
      case 'qr-generator': return <QRCodeGenerator />;
      case 'random-number-generator': return <RandomNumberGenerator />;
      case 'color-picker': return <ColorPicker />;
      case 'unit-converter': return <UnitConverter />;
      case 'currency-converter': return <CurrencyConverter />;
      case 'stopwatch-timer': return <StopwatchTimer />;
      default: return null;
    }
  };

  return (
    <div className="bg-surface min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <Breadcrumbs currentTool={tool} />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8">
          <div className="lg:col-span-8">
            <header className="mb-12 reveal">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Link 
                  to={`/category/${getCategorySlug(tool.category)}`}
                  className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-primary transition-all hover:shadow-premium"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <div className="px-4 py-1.5 bg-primary/10 rounded-full text-[10px] font-black text-primary uppercase tracking-widest border border-primary/20">
                  {tool.category}
                </div>
                {tool.popular && (
                  <div className="px-4 py-1.5 bg-yellow-500/10 rounded-full text-[10px] font-black text-yellow-600 uppercase tracking-widest border border-yellow-500/20 flex items-center">
                    <Star className="w-3 h-3 mr-2 fill-yellow-600" />
                    Popular Module
                  </div>
                )}
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-midnight mb-6 tracking-tight leading-[1.1]">{tool.seoContent.h1}</h1>
              <p className="text-xl text-slate-500 leading-relaxed font-medium max-w-3xl">
                {tool.seoContent.shortIntro}
              </p>
            </header>

            {/* MAIN TOOL WORKSPACE */}
            <div className="mb-20 reveal delay-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Layout className="w-5 h-5 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Professional Studio</span>
                </div>
                <button className="flex items-center space-x-2 text-[10px] font-black text-slate-400 hover:text-primary uppercase tracking-widest transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span>Share Utility</span>
                </button>
              </div>
              
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-indigo-500/10 rounded-[3rem] blur opacity-50"></div>
                <div className="relative">
                   {renderToolLogic()}
                </div>
              </div>
              
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-premium">
                 <div className="flex items-center space-x-5">
                    <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center">
                       <ShieldCheck className="w-8 h-8 text-emerald-500" />
                    </div>
                    <div>
                       <p className="text-base font-black text-midnight leading-none">Transmission Security Active</p>
                       <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-[0.2em]">End-to-End Browser Isolation • No Persistence</p>
                    </div>
                 </div>
                 <Link to="/privacy" className="text-[10px] font-black text-slate-400 hover:text-midnight uppercase tracking-widest underline decoration-primary decoration-2 underline-offset-8">Data Manifesto</Link>
              </div>
            </div>

            {/* SEO CONTENT SECTION */}
            <section className="bg-white rounded-[4rem] shadow-premium border border-slate-100 overflow-hidden reveal">
              <div className="p-10 md:p-20 prose prose-slate max-w-none">
                <div className="flex items-center space-x-4 mb-12">
                  <div className="bg-primary p-4 rounded-3xl shadow-glow">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-4xl font-black text-midnight m-0 tracking-tight italic">Operations & Insights</h2>
                </div>

                <div className="space-y-20">
                  <div>
                    <h3 className="text-3xl font-black mb-8 text-midnight border-l-8 border-primary pl-6 tracking-tight">Deployment: {tool.name}</h3>
                    <p className="text-slate-500 mb-12 leading-relaxed text-xl font-medium">{tool.seoContent.whatIs}</p>
                  </div>

                  <div className="bg-slate-50 rounded-[3.5rem] p-12 md:p-16 border border-slate-100">
                    <h3 className="text-3xl font-black mb-12 text-midnight flex items-center tracking-tight">
                      <Zap className="w-8 h-8 mr-4 text-primary" />
                      Protocol & Execution
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {tool.seoContent.howTo.map((step, idx) => (
                        <div key={idx} className="flex items-start space-x-5 p-8 bg-white rounded-[2rem] border border-slate-100 group hover:border-primary/20 transition-all shadow-sm">
                          <div className="w-12 h-12 bg-midnight text-primary rounded-2xl flex items-center justify-center font-black shrink-0 text-xl shadow-lg group-hover:scale-110 transition-transform">
                            {idx + 1}
                          </div>
                          <p className="text-slate-600 text-sm font-bold leading-relaxed pt-1">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                      <h3 className="text-2xl font-black mb-8 text-midnight border-l-8 border-primary pl-6">Core Modules</h3>
                      <ul className="space-y-4 list-none p-0">
                        {tool.seoContent.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center space-x-4 p-5 bg-slate-50 border border-slate-100 rounded-2xl transition-all hover:bg-white hover:shadow-premium">
                            <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0" />
                            <span className="text-slate-600 font-bold text-sm tracking-tight">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-midnight text-white rounded-[3.5rem] p-12 shadow-2xl relative overflow-hidden flex flex-col justify-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
                      <Star className="absolute -top-6 -right-6 w-32 h-32 text-primary opacity-5 rotate-12" />
                      <h3 className="text-2xl font-black mb-10 text-white relative z-10">Why ExploreaHub?</h3>
                      <ul className="space-y-6 list-none p-0 relative z-10">
                        {tool.seoContent.whyUs.map((reason, idx) => (
                          <li key={idx} className="flex items-start space-x-5">
                            <div className="bg-primary/20 p-2 rounded-xl mt-1">
                              <Sparkles className="w-4 h-4 text-primary shrink-0" />
                            </div>
                            <span className="text-slate-300 font-bold text-lg leading-relaxed">{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {tool.seoContent.privacyAndSecurity && (
                    <div className="p-12 bg-surface rounded-[3.5rem] border border-slate-200">
                      <h3 className="text-3xl font-black mb-8 text-midnight flex items-center">
                        <ShieldCheck className="w-9 h-9 mr-4 text-emerald-500" />
                        Infrastructure Security
                      </h3>
                      <p className="text-slate-500 leading-relaxed text-xl font-medium italic">{tool.seoContent.privacyAndSecurity}</p>
                    </div>
                  )}

                  {/* FAQ SECTION */}
                  <div className="pt-10">
                    <h3 className="text-3xl font-black mb-12 text-midnight flex items-center tracking-tight">
                      <MessageCircle className="w-9 h-9 mr-4 text-primary" />
                      Developer FAQ
                    </h3>
                    <div className="grid grid-cols-1 gap-6">
                      {tool.seoContent.faqs.map((faq, idx) => (
                        <div key={idx} className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 group hover:bg-white hover:shadow-premium transition-all duration-500">
                          <h4 className="font-black text-midnight mb-6 flex items-center text-xl leading-tight">
                            <span className="text-primary mr-4 text-3xl leading-none">?</span>
                            {faq.question}
                          </h4>
                          <p className="text-slate-500 text-lg leading-relaxed font-medium pl-10 border-l-2 border-slate-200 group-hover:border-primary transition-colors">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-4">
            <ToolSidebar currentToolId={tool.id} category={tool.category} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolDetailPage;