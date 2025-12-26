
import React from 'react';
import { Target, Users, Heart, Star } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">About ExploreaToolHub</h1>
        
        <div className="prose prose-lg prose-slate max-w-none mb-16">
          <p className="text-gray-600 leading-relaxed text-center text-xl">
            ExploreaToolHub is your dedicated source for high-quality, fast, and free online tools. Our mission is to simplify digital tasks for everyone, from students and office workers to professional developers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-gray-900" />
            </div>
            <h3 className="text-xl font-bold mb-4">Our Vision</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              To become the world's most trusted daily utility platform, providing tools that are not only functional but also respect user privacy and accessibility.
            </p>
          </div>
          <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-gray-900" />
            </div>
            <h3 className="text-xl font-bold mb-4">Our Community</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              We serve a global audience of creators, bloggers, and students who need reliable tools for their daily workflow without the clutter of signups.
            </p>
          </div>
        </div>

        <div className="bg-gray-900 rounded-[3rem] p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-6">What Makes Us Different?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
            <div>
              <Heart className="w-8 h-8 text-primary mx-auto mb-4" />
              <h4 className="font-bold mb-2">User First</h4>
              <p className="text-xs text-gray-400">Everything we build is centered around your experience.</p>
            </div>
            <div>
              <Star className="w-8 h-8 text-primary mx-auto mb-4" />
              <h4 className="font-bold mb-2">High Quality</h4>
              <p className="text-xs text-gray-400">Fast, lightweight, and mathematically accurate results.</p>
            </div>
            <div>
              <Target className="w-8 h-8 text-primary mx-auto mb-4" />
              <h4 className="font-bold mb-2">Privacy Focus</h4>
              <p className="text-xs text-gray-400">Browser-only execution ensures your data stays yours.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
