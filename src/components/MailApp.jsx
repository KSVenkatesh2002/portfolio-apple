import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Github, Linkedin, Copy, Globe } from 'lucide-react';
import Window from './Window';

import emailjs from '@emailjs/browser';

const CONFIG = {
  EMAILJS_SERVICE_ID: 'service_jh4r4ld',
  EMAILJS_TEMPLATE_ID: 'template_3u41p66',
  EMAILJS_PUBLIC_KEY: 'IQhUR2LnEqtAqR-Qo',
  TELEGRAM_BOT_TOKEN: '8905608451:AAEwz2BdX1dQXGeGGNnZjvS6JONBPfo70Zo',
  TELEGRAM_CHAT_ID: '1645201119'
};

const MailApp = ({ inMobileMode }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message || !senderEmail) return;
    
    setIsSending(true);

    try {
      // 1. Send to Telegram for instant phone alert
      const telegramMessage = `*New Portfolio Message!*\n\n*From:* ${senderEmail}\n*Subject:* ${subject || 'Portfolio Inquiry'}\n\n*Message:*\n${message}`;
      const telegramPromise = fetch(`https://api.telegram.org/bot${CONFIG.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CONFIG.TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: "Markdown"
        })
      });

      // 2. Send via EmailJS
      const templateParams = {
        name: senderEmail,
        email: senderEmail,
        message: message,
        subject: subject || 'Portfolio Inquiry',
      };

      const emailjsPromise = emailjs.send(
        CONFIG.EMAILJS_SERVICE_ID,
        CONFIG.EMAILJS_TEMPLATE_ID, 
        templateParams,
        CONFIG.EMAILJS_PUBLIC_KEY
      );

      const [telegramRes, emailjsRes] = await Promise.all([telegramPromise, emailjsPromise]);
      
      if (emailjsRes.status === 200 || telegramRes.ok) {
        setIsSent(true);
        setTimeout(() => {
          setIsSent(false);
          setSubject('');
          setMessage('');
          setSenderEmail('');
        }, 4000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('kotavenkatesh2002@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (inMobileMode) {
    return (
      <div className="flex flex-col h-full w-full bg-macOS-bg text-white overflow-y-auto p-4 space-y-5 pb-20">
        {/* Mobile Contact Info Header Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300 font-bold text-sm">
              VKS
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">VENKATESH K S</h2>
              <p className="text-xs text-blue-300 font-medium">MERN Stack / React Developer</p>
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="bg-black/30 border border-white/10 rounded-xl p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider flex items-center gap-1">
                  <Mail size={12} className="text-blue-400" /> Email
                </span>
                <button 
                  onClick={handleCopyEmail}
                  className="text-[10px] text-blue-400 flex items-center gap-1 cursor-pointer"
                >
                  <Copy size={10} /> {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <a href="mailto:kotavenkatesh2002@gmail.com" className="text-xs font-semibold text-white/90 truncate block">
                kotavenkatesh2002@gmail.com
              </a>
            </div>

            <div className="bg-black/30 border border-white/10 rounded-xl p-3">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider flex items-center gap-1 mb-1">
                <Phone size={12} className="text-emerald-400" /> Phone
              </span>
              <a href="tel:+918680824866" className="text-xs font-semibold text-white/90 block">
                +91 86808 24866
              </a>
            </div>

            <div className="bg-black/30 border border-white/10 rounded-xl p-3">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider flex items-center gap-1 mb-1">
                <MapPin size={12} className="text-purple-400" /> Location
              </span>
              <p className="text-xs font-semibold text-white/90">
                Tiruppur, Tamil Nadu
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href="https://github.com/KSVenkatesh2002"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 bg-white/10 text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              <Github size={14} />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/venkatesh-k-s"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              <Linkedin size={14} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Mobile Message Composition Form */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
          <h3 className="text-sm font-bold text-white mb-3.5 flex items-center gap-2">
            <Mail size={16} className="text-blue-400" /> Direct Message
          </h3>

          {isSent ? (
            <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-xl p-4 text-center space-y-1">
              <CheckCircle2 size={32} className="text-emerald-400 mx-auto" />
              <h4 className="text-sm font-bold text-white">Message Sent!</h4>
              <p className="text-xs text-white/70">I will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-white/70 mb-1">Your Email</label>
                <input
                  type="email"
                  placeholder="hr@company.com"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-white/70 mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="Job Opportunity"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-white/70 mb-1">Message</label>
                <textarea
                  rows={4}
                  placeholder="Hi Venkatesh..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white font-semibold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Send size={14} />
                <span>{isSending ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  const content = (
    <div className="flex flex-col md:flex-row h-full w-full bg-macOS-bg/60 backdrop-blur-xl">
      {/* Left Sidebar: Contact Details */}
      <div className="w-full md:w-72 bg-black/30 border-b md:border-b-0 md:border-r border-white/10 p-5 flex flex-col justify-between shrink-0 space-y-6">
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300 font-bold text-sm">
              VKS
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">VENKATESH K S</h2>
              <p className="text-xs text-blue-300">MERN Stack / React Developer</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-md">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider flex items-center gap-1">
                  <Mail size={12} className="text-blue-400" /> Email
                </span>
                <button 
                  onClick={handleCopyEmail}
                  className="text-[10px] text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
                >
                  <Copy size={10} /> {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <a href="mailto:kotavenkatesh2002@gmail.com" className="text-xs font-semibold text-white/90 hover:underline block truncate">
                kotavenkatesh2002@gmail.com
              </a>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-md">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider flex items-center gap-1 mb-1">
                <Phone size={12} className="text-emerald-400" /> Phone
              </span>
              <a href="tel:+918680824866" className="text-xs font-semibold text-white/90 hover:underline block">
                +91 86808 24866
              </a>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-md">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider flex items-center gap-1 mb-1">
                <MapPin size={12} className="text-purple-400" /> Location
              </span>
              <p className="text-xs font-semibold text-white/90">
                Tiruppur, Tamil Nadu
              </p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="pt-4 border-t border-white/10 flex flex-col space-y-2">
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/KSVenkatesh2002"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              <Github size={14} />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/venkatesh-k-s"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              <Linkedin size={14} />
              <span>LinkedIn</span>
            </a>
          </div>

          {/* <a
            href="https://venkatesh-k-s.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2 bg-purple-600/80 hover:bg-purple-600 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            <Globe size={14} />
            <span>Portfolio Website</span>
          </a> */}
        </div>
      </div>

      {/* Right Area: Email Composition Form */}
      <div className="flex-1 p-6 flex flex-col justify-between overflow-y-auto">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Mail className="text-blue-400" size={20} />
              Send Direct Message
            </h2>
            <span className="text-xs text-white/40 font-mono">To: kotavenkatesh2002@gmail.com</span>
          </div>

          {isSent ? (
            <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-2xl p-6 text-center space-y-2">
              <CheckCircle2 size={40} className="text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">Message Sent!</h3>
              <p className="text-xs text-white/70">Thank you for reaching out. I will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1.5">Your Email Address</label>
                <input
                  type="email"
                  placeholder="hr@company.com"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-white/30"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1.5">Subject</label>
                <input
                  type="text"
                  placeholder="Job Opportunity / Interview Invitation"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-white/30"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1.5">Message</label>
                <textarea
                  rows={6}
                  placeholder="Hi Venkatesh, we reviewed your MERN Stack portfolio and would like to connect..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white font-semibold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
              >
                <Send size={14} />
                <span>{isSending ? 'Sending Message...' : 'Send Message to Venkatesh'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <Window id="mail" defaultSize={{ width: 780, height: 520 }}>
      {content}
    </Window>
  );
};

export default MailApp;
