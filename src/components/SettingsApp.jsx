import React, { useState } from 'react';
import { Search, Briefcase, Code, GraduationCap, User, Download, CheckCircle2, Award, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import Window from './Window';
import { X, ExternalLink as ExternalLinkIcon } from 'lucide-react';

const resumeCategories = [
  { id: 'experience', name: 'Experience', icon: Briefcase, color: 'bg-blue-500' },
  { id: 'skills', name: 'Technical Skills', icon: Code, color: 'bg-purple-500' },
  { id: 'education', name: 'Education & Certs', icon: GraduationCap, color: 'bg-emerald-500' },
  { id: 'summary', name: 'Profile Summary', icon: User, color: 'bg-amber-500' },
];

// Tech skills from new resume with official devicon logos
const skillsWithLogos = {
  Languages: [
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
    { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  ],
  Frontend: [
    { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
    { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'Redux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' },
  ],
  Backend: [
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
  ],
  Databases: [
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  ],
  Tools: [
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
    { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
    { name: 'JWT', icon: 'https://jwt.io/img/pic_logo.svg' },
  ]
};

const experiences = [
  {
    id: 1,
    role: 'Web App Developer',
    company: 'Fueint Technology',
    period: 'Mar 2025 – Present',
    location: 'Coimbatore',
    bullets: [
      'Developed and maintained web applications including Shrivalu (React).',
      'Worked on WordPress projects including Unbounce and Insightly.',
    ],
    tech: ['React', 'WordPress', 'Web Development', 'Responsive UI']
  },
  {
    id: 2,
    role: 'Next.js Frontend Intern',
    company: 'CTSV Solution',
    period: 'Nov 2024 – Feb 2025',
    location: 'Coimbatore',
    bullets: [
      'Developed and modified frontend components using Next.js and React.',
      'Integrated REST APIs to fetch and render dynamic data in UI components.',
      'Implemented client-side authentication and route protection.',
      'Improved UI responsiveness across mobile and desktop devices.'
    ],
    tech: ['Next.js', 'React', 'REST APIs', 'Authentication', 'Route Protection', 'Responsive UI']
  }
];

const SettingsApp = ({ inMobileMode }) => {
  const [activeTab, setActiveTab] = useState('experience');
  const [searchQuery, setSearchQuery] = useState('');
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const RESUME_URL = 'https://1drv.ms/b/c/62249dcca8dcf6f9/IQBeZToGz7iVTZ7tPduUXiYmAZ8zMVF_hCZrxwtV5Exki1A?e=uOnpxh';

  const handleOpenResumeModal = () => {
    setIsResumeModalOpen(true);
  };

  const handleDownloadResume = () => {
    window.open(RESUME_URL, '_blank', 'noopener,noreferrer');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'experience':
        return (
          <div className="p-4 md:p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">Experience</h2>
                <p className="text-xs md:text-sm text-white/60">Professional Experience & Internships</p>
              </div>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold rounded-full">
                {experiences.length} Roles
              </span>
            </div>

            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 backdrop-blur-md shadow-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start md:items-center justify-between pb-4 border-b border-white/10 gap-3">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                        <Briefcase className="text-blue-400 shrink-0" size={20} />
                        {exp.role}
                      </h3>
                      <p className="text-blue-300 font-medium text-xs md:text-sm mt-0.5">{exp.company}</p>
                    </div>
                    <div className="flex flex-col sm:items-end gap-1.5">
                      <span className="inline-block px-2.5 py-1 bg-white/10 text-white/90 text-xs font-mono rounded-md whitespace-nowrap">
                        {exp.period}
                      </span>
                      {exp.location && (
                        <p className="text-xs text-white/50 flex items-center gap-1 justify-start sm:justify-end">
                          <MapPin size={12} /> {exp.location}
                        </p>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-white/80 leading-relaxed">
                        <CheckCircle2 className="text-blue-400 shrink-0 mt-0.5" size={15} />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
                    {exp.tech.map((tech) => (
                      <span key={tech} className="px-2.5 py-1 bg-white/10 text-white/80 text-[11px] font-medium rounded-lg border border-white/5">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="p-4 md:p-6 space-y-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">Technical Skills</h2>
              <p className="text-xs md:text-sm text-white/60">Languages, frameworks, databases, and tools</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(skillsWithLogos).map(([category, list]) => {
                const filtered = list.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
                if (searchQuery && filtered.length === 0) return null;

                return (
                  <div key={category} className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
                    <h3 className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-3 pb-2 border-b border-white/10 flex items-center justify-between">
                      <span>{category}</span>
                      <span className="text-[10px] text-white/40 font-mono">{filtered.length} Skills</span>
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {filtered.map(skill => (
                        <div 
                          key={skill.name} 
                          className="bg-black/30 border border-white/10 rounded-xl p-2 flex items-center gap-2"
                        >
                          <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center p-1 shrink-0">
                            <img 
                              src={skill.icon} 
                              alt={skill.name} 
                              className="w-full h-full object-contain" 
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                          </div>
                          <span className="text-xs font-medium text-white/90 truncate">{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="p-4 md:p-6 space-y-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">Education & Certifications</h2>
              <p className="text-xs md:text-sm text-white/60">Academic qualification and verified Udemy certifications</p>
            </div>

            {/* Education Card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md space-y-3">
              <div className="flex flex-col sm:flex-row justify-between pb-3 border-b border-white/10 gap-2">
                <div>
                  <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                    <GraduationCap className="text-emerald-400 shrink-0" size={20} />
                    B.E. Computer Science and Engineering
                  </h3>
                  <p className="text-emerald-300 font-medium text-xs md:text-sm mt-0.5">EASA College of Engineering and Technology</p>
                </div>
                <div>
                  <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold rounded-md">
                    May 2025
                  </span>
                  <p className="text-xs font-bold text-emerald-400 mt-1">
                    GPA: 8.12
                  </p>
                </div>
              </div>
            </div>

            {/* Certifications List */}
            <div>
              <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider text-white/70 mb-3 flex items-center gap-2">
                <Award size={16} className="text-amber-400" /> Verified Certifications
              </h3>
              <div className="space-y-3">
                {[
                  {
                    title: 'React – Udemy',
                    provider: 'Udemy Certificate',
                    link: 'https://www.udemy.com/certificate/UC-22db97f4-90e3-4b9e-b214-ef50bacd239d/'
                  },
                  {
                    title: 'Java Programming – Udemy',
                    provider: 'Udemy Certificate',
                    link: 'https://www.udemy.com/certificate/UC-7e836fdd-7064-431d-99ea-81a5fb9fd9ae/'
                  },
                  {
                    title: 'Web Development – Udemy',
                    provider: 'Udemy Certificate',
                    link: 'https://www.udemy.com/certificate/UC-f0b9c683-6757-4a8f-9ff6-42cc90ea5751/'
                  }
                ].map((cert, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                        <Award size={18} />
                      </div>
                      <div>
                        <h4 className="text-xs md:text-sm font-bold text-white">{cert.title}</h4>
                        <p className="text-[11px] text-white/50">{cert.provider}</p>
                      </div>
                    </div>
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-amber-300 text-xs font-semibold rounded-lg transition-colors shrink-0"
                    >
                      <span>View Certificate</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'summary':
      default:
        return (
          <div className="p-4 md:p-6 space-y-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">Professional Summary</h2>
              <p className="text-xs md:text-sm text-white/60">Candidate details & contact links</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md space-y-4">
              <p className="text-xs md:text-sm text-white/80 leading-relaxed">
                <strong className="text-blue-300">MERN Stack Developer</strong> with hands-on experience building full-stack web applications using React, Next.js, Node.js, Express, and MongoDB. Skilled in designing REST APIs, authentication, state management, and scalable dashboards. Passionate about clean architecture and real-world problem solving.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/10">
                <div className="flex items-center gap-3 bg-black/30 p-3 rounded-xl border border-white/10">
                  <Mail className="text-blue-400 shrink-0" size={16} />
                  <div className="truncate">
                    <p className="text-[9px] text-white/40 font-bold uppercase">Email</p>
                    <a href="mailto:kotavenkatesh2002@gmail.com" className="text-xs text-white/90 hover:underline truncate block font-medium">
                      kotavenkatesh2002@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-black/30 p-3 rounded-xl border border-white/10">
                  <Phone className="text-emerald-400 shrink-0" size={16} />
                  <div>
                    <p className="text-[9px] text-white/40 font-bold uppercase">Phone</p>
                    <a href="tel:+918680824866" className="text-xs text-white/90 hover:underline block font-medium">
                      +91 86808 24866
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-black/30 p-3 rounded-xl border border-white/10">
                  <MapPin className="text-purple-400 shrink-0" size={16} />
                  <div>
                    <p className="text-[9px] text-white/40 font-bold uppercase">Location</p>
                    <p className="text-xs text-white/90 font-medium">Tiruppur, Tamil Nadu</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  if (inMobileMode) {
    return (
      <div className="flex flex-col h-full w-full bg-macOS-bg text-white overflow-hidden">
        {/* Mobile Nav Horizontal Pills */}
        <div className="flex overflow-x-auto gap-2 p-3 bg-black/40 border-b border-white/10 shrink-0 no-scrollbar">
          {resumeCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer
                ${activeTab === cat.id ? 'bg-blue-600 text-white shadow-md' : 'bg-white/10 text-white/70 hover:bg-white/20'}
              `}
            >
              <cat.icon size={14} />
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Mobile Scrollable Content */}
        <div className="flex-1 overflow-y-auto pb-16">
          {renderContent()}
        </div>
      </div>
    );
  }

  const content = (
    <div className="flex flex-col h-full w-full">
      {/* Top Header Bar */}
      <div className="h-14 border-b border-white/10 flex items-center justify-between px-6 bg-white/5 shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-blue-500/30 border border-blue-400/40 flex items-center justify-center text-blue-300 font-bold text-xs">
            VKS
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-wide">VENKATESH K S</h1>
            <p className="text-[11px] text-white/50 font-mono">MERN Stack / React Developer</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={handleOpenResumeModal}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Download size={14} />
            <span>Open PDF Resume</span>
          </button>
          
          <div className="relative hidden md:block">
            <Search size={14} className="absolute left-2.5 top-2 text-white/40" />
            <input 
              type="text" 
              placeholder="Search skills..." 
              className="bg-black/30 border border-white/10 rounded-lg text-xs py-1.5 pl-8 pr-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 w-44 placeholder-white/40 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-1 font-sans overflow-hidden">
        {/* Sidebar Categories */}
        <div className="w-48 md:w-56 bg-black/25 backdrop-blur-md border-r border-white/10 p-3 flex flex-col space-y-1.5 overflow-y-auto shrink-0">
          <div className="text-[10px] font-bold text-white/40 uppercase tracking-wider px-3 my-1">
            Resume Sections
          </div>
          {resumeCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center space-x-3 w-full px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer
                ${activeTab === cat.id ? 'bg-blue-600 text-white shadow-lg' : 'text-white/70 hover:bg-white/10 hover:text-white'}
              `}
            >
              <div className={`w-6 h-6 rounded-md flex items-center justify-center text-white shadow-sm ${cat.color}`}>
                <cat.icon size={14} />
              </div>
              <span className="truncate">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-macOS-bg/40 overflow-y-auto relative">
          {renderContent()}
        </div>
      </div>

      {/* Resume Modal */}
      {isResumeModalOpen && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-4 md:p-10 animate-in fade-in duration-200">
          <div className="bg-macOS-bg border border-white/20 shadow-2xl rounded-2xl w-full h-full max-w-4xl flex flex-col overflow-hidden relative animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="h-12 bg-black/40 border-b border-white/10 flex items-center justify-between px-4 shrink-0">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                VENKATESH_K_S.pdf
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadResume}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  <ExternalLinkIcon size={14} />
                  <span>Open in New Tab</span>
                </button>
                <button
                  onClick={() => setIsResumeModalOpen(false)}
                  className="p-1.5 hover:bg-white/10 text-white/70 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            
            {/* Modal Body (Iframe) */}
            <div className="flex-1 bg-white relative w-full h-full">
              <iframe 
                src={RESUME_URL} 
                className="w-full h-full border-none"
                title="Resume PDF"
              />
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-black/50 text-sm font-medium -z-10">
                Loading Document...
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Window id="settings" defaultSize={{ width: 850, height: 580 }}>
      {content}
    </Window>
  );
};

export default SettingsApp;
