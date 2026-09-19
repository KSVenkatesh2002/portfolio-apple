import React, { useState, useRef, useEffect } from 'react';
import Window from './Window';

const TerminalApp = ({ inMobileMode }) => {
  const [history, setHistory] = useState([
    { type: 'output', content: 'Welcome to VENKATESH K S macOS Terminal v3.0.0 (x86_64-apple-darwin)' },
    { type: 'output', content: 'Type "help" or "cat resume.txt" to view candidate profile.' },
    { type: 'output', content: '------------------------------------------------------------' },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const trimmed = input.trim().toLowerCase();
      const newHistory = [...history, { type: 'input', content: input }];

      switch (trimmed) {
        case 'help':
          newHistory.push({
            type: 'output',
            content: `Available commands:
  cat resume.txt  - Print Venkatesh's full resume summary
  internship       - Print CTSV Solution internship details
  skills           - Display technical stack breakdown
  projects         - List key MERN & Next.js projects
  contact          - Show email, phone & social links
  clear            - Clear terminal screen`,
          });
          break;

        case 'cat resume.txt':
        case 'resume':
          newHistory.push({
            type: 'output',
            content: `===========================================================
VENKATESH K S — MERN Stack / React Developer
Location: Tiruppur, Tamil Nadu
Phone: +91 86808 24866 | Email: kotavenkatesh2002@gmail.com
Education: B.E. in CSE @ EASA College of Engineering and Technology (May 2025 | GPA: 8.12)

SUMMARY:
MERN Stack Developer with hands-on experience building full-stack web applications using React, Next.js, Node.js, Express, and MongoDB.

INTERNSHIP:
• Next.js Frontend Intern @ CTSV Solution (Nov 2024 – Feb 2025 | Coimbatore)
  - Developed frontend components using Next.js & React.
  - Integrated REST APIs, route protection & responsive UI.

PROJECTS:
1. Train Ticket Booking System — React, Node, Express, MongoDB, Redux
2. Dyer Task Management — Next.js, Tailwind, MongoDB, Clerk
3. Realtime Chat Application — React, Vite, Socket.IO, Zustand
===========================================================`,
          });
          break;

        case 'internship':
        case 'experience':
          newHistory.push({
            type: 'output',
            content: `Next.js Frontend Intern @ CTSV Solution (Nov 2024 - Feb 2025)
Location: Coimbatore
- Developed & modified frontend components using Next.js and React.
- Integrated REST APIs to fetch & render dynamic UI data.
- Implemented client-side authentication and route protection.
- Improved UI responsiveness across mobile and desktop devices.`,
          });
          break;

        case 'skills':
          newHistory.push({
            type: 'output',
            content: `Languages : Java, Python, JavaScript, TypeScript, C, C++
Frontend  : React.js, Next.js, Tailwind CSS, Redux
Backend   : Node.js, Express.js
Databases : MongoDB, SQL
Tools     : Git, GitHub, Postman, Docker, JWT`,
          });
          break;

        case 'projects':
          newHistory.push({
            type: 'output',
            content: `1. Train Ticket Booking System (React, Node, Express, MongoDB, Redux)
   Live: https://trainticketbooking-q9j3.onrender.com
2. Dyer Task Management (Next.js, Tailwind, MongoDB, Clerk)
   Live: https://dyer-handloom.vercel.app
3. Realtime Chat Application (React, Socket.IO, Zustand)
   Live: https://venkatesh-realtime-chat-app.onrender.com`,
          });
          break;

        case 'contact':
          newHistory.push({
            type: 'output',
            content: `Email    : kotavenkatesh2002@gmail.com
Phone    : +91 86808 24866
Location : Tiruppur, Tamil Nadu
GitHub   : https://github.com/KSVenkatesh2002
LinkedIn : https://www.linkedin.com/in/venkatesh-k-s
Portfolio: https://venkatesh-k-s.vercel.app/`,
          });
          break;

        case 'clear':
          setHistory([]);
          setInput('');
          return;

        case '':
          break;

        default:
          newHistory.push({
            type: 'output',
            content: `zsh: command not found: ${trimmed}. Type "help" for a list of commands.`,
          });
          break;
      }

      setHistory(newHistory);
      setInput('');
    }
  };

  const content = (
    <div className="flex flex-col h-full bg-black/90 text-green-400 font-mono text-xs md:text-sm p-4 overflow-y-auto selection:bg-green-500/30">
      <div className="space-y-1.5">
        {history.map((item, i) => (
          <div key={i} className="leading-relaxed whitespace-pre-wrap">
            {item.type === 'input' ? (
              <div className="flex items-center space-x-2 text-white/90">
                <span className="text-blue-400 font-bold">venkatesh@macbook-pro ~ %</span>
                <span>{item.content}</span>
              </div>
            ) : (
              <div className="text-green-400/90">{item.content}</div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-2 mt-2">
        <span className="text-blue-400 font-bold shrink-0">venkatesh@macbook-pro ~ %</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="flex-1 bg-transparent text-white outline-none caret-green-400 font-mono"
          autoFocus
          spellCheck="false"
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );

  if (inMobileMode) return content;

  return (
    <Window id="terminal" defaultSize={{ width: 720, height: 460 }}>
      {content}
    </Window>
  );
};

export default TerminalApp;
