
import React, { useState } from 'react';
import { Mail, MessageSquare, Send } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-gray-500">Have feedback or need a specific tool? We'd love to hear from you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <Mail className="w-6 h-6 text-primary mb-4" />
              <h4 className="font-bold text-gray-900">Email Us</h4>
              <p className="text-sm text-gray-500 mt-1">contact@exploreatoolhub.com</p>
            </div>
            <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <MessageSquare className="w-6 h-6 text-primary mb-4" />
              <h4 className="font-bold text-gray-900">Live Support</h4>
              <p className="text-sm text-gray-500 mt-1">Mon-Fri: 9am - 6pm EST</p>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
              {submitted ? (
                <div className="text-center py-12">
                   <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                     <Send className="w-8 h-8 text-green-600" />
                   </div>
                   <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                   <p className="text-gray-500">We'll get back to you as soon as possible.</p>
                   <button onClick={() => setSubmitted(false)} className="mt-8 text-primary font-bold">Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                      <input required type="text" className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="Your Name" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                      <input required type="email" className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                    <input required type="text" className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="How can we help?" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                    <textarea required rows={5} className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none transition-all resize-none" placeholder="Your message here..."></textarea>
                  </div>
                  <button type="submit" className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-colors shadow-lg flex items-center justify-center space-x-2">
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
