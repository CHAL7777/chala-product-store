import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const ContactPage = () => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast('Please fill out all required fields.', 'error');
      return;
    }

    addToast(`Thank you ${formData.name}! Your message has been sent.`, 'success');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="section-container py-12 space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-100">
          Get in Touch
        </h1>
        <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
          Have a question about an order, size availability, or custom shoes? We're here to help.
        </p>
      </div>

      {/* Main Grid: Info Cards + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-brand/10 text-brand border border-brand/20">
              <Mail size={20} />
            </div>
            <div>
              <h3 className="font-bold text-zinc-100 text-base">Email Us</h3>
              <p className="text-xs text-zinc-400 mt-1">support@soleflow.store</p>
              <p className="text-xs text-zinc-500 mt-0.5">Response within 24 hours</p>
            </div>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-brand/10 text-brand border border-brand/20">
              <Phone size={20} />
            </div>
            <div>
              <h3 className="font-bold text-zinc-100 text-base">Call Us</h3>
              <p className="text-xs text-zinc-400 mt-1">+1 (800) 555-SOLE</p>
              <p className="text-xs text-zinc-500 mt-0.5">Mon - Fri: 9am - 6pm EST</p>
            </div>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-brand/10 text-brand border border-brand/20">
              <MapPin size={20} />
            </div>
            <div>
              <h3 className="font-bold text-zinc-100 text-base">Headquarters</h3>
              <p className="text-xs text-zinc-400 mt-1">100 Innovation Way, Suite 400</p>
              <p className="text-xs text-zinc-500 mt-0.5">Portland, OR 97201</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-brand"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-brand"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
                Subject
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Order inquiry, sizing help, etc."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-brand"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
                Message *
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="How can we help you today?"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-brand resize-none"
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full sm:w-auto px-8 py-3.5 text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand/20"
            >
              <Send size={16} />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
