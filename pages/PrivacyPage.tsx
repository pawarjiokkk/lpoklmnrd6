
import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-slate max-w-none space-y-6 text-gray-600">
          <p>Last Updated: October 2023</p>
          <p>Welcome to ExploreaToolHub. Your privacy is critically important to us. Our website is designed to be as private as possible, with most tools processing data directly in your browser.</p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8">1. Information We Collect</h2>
          <p>ExploreaToolHub does not require users to create an account or provide personal information to use our tools. We may collect non-identifiable information such as browser type, time spent on pages, and usage patterns to improve our services.</p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8">2. How Tools Handle Your Data</h2>
          <p>Unlike many online tool providers, we process your input data (text, images, files) locally on your device whenever possible. Your data is not stored on our servers unless explicitly stated (e.g., when using cloud-based sharing features, which are currently not implemented).</p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8">3. Cookies and Advertising</h2>
          <p>We use cookies to enhance user experience and serve personalized advertisements through Google AdSense. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet.</p>
          <p>You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-primary hover:underline">Ads Settings</a>.</p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8">4. Security</h2>
          <p>The security of your personal information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure.</p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8">5. Changes to This Policy</h2>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
