
import React from 'react';

const DisclaimerPage: React.FC = () => {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Disclaimer</h1>
        <div className="prose prose-slate max-w-none space-y-6 text-gray-600">
          <p>Last Updated: October 2023</p>
          <p>The information and tools provided by ExploreaToolHub are for general informational purposes only. All tools are provided on an "as-is" and "as-available" basis.</p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8">1. Accuracy of Tools</h2>
          <p>While we strive for 100% accuracy in our calculators, converters, and processing tools, ExploreaToolHub makes no guarantees regarding the completeness, reliability, or accuracy of the results. Any action you take upon the results of these tools is strictly at your own risk.</p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8">2. Professional Advice</h2>
          <p>Our tools (specifically financial calculators or health-related tools like BMI) do not constitute professional advice. Always consult with a qualified professional before making significant financial, medical, or legal decisions based on calculations from our platform.</p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8">3. External Links</h2>
          <p>Our website may contain links to external sites that are not operated by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8">4. Limitation of Liability</h2>
          <p>In no event will ExploreaToolHub be liable for any loss or damage including without limitation, indirect or consequential loss or damage, arising from the use of this website.</p>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPage;
