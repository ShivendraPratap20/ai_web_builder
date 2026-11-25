import React, { useState } from 'react';

interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Product',
    links: [
      { label: 'AI Site Generator', href: '#features' },
      { label: 'Templates Gallery', href: '#templates' },
      { label: 'React & Tailwind Export', href: '#export' },
      { label: 'Custom Domains', href: '#hosting' },
      { label: 'Pricing', href: '#pricing' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#docs' },
      { label: 'Prompt Engineering Guide', href: '#prompts' },
      { label: 'Component Library', href: '#components' },
      { label: 'Changelog', href: '#changelog' },
      { label: 'System Status', href: '#status' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#about' },
      { label: 'Customer Stories', href: '#showcase' },
      { label: 'Blog', href: '#blog' },
      { label: 'Careers', href: '#careers' },
      { label: 'Contact Support', href: '#contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms of Service', href: '#terms' },
      { label: 'Cookie Policy', href: '#cookies' },
      { label: 'Security & Compliance', href: '#security' },
    ],
  },
];

export default function Footer(): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#F8FAFC] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        
        {/* Top CTA Banner */}
        <div className="rounded-2xl bg-[#FFFFFF] border border-slate-200 p-8 sm:p-10 mb-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-sm">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
              Ready to ship your next website?
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#475569]">
              Start generating clean, responsive layouts in seconds. No credit card required.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <a
              href="#top"
              className="w-full sm:w-auto text-center px-5 py-3 text-sm font-medium text-white bg-[#4F46E5] hover:bg-indigo-700 rounded-lg shadow-sm transition-colors"
            >
              Start Building Free
            </a>
            <a
              href="#showcase"
              className="w-full sm:w-auto text-center px-5 py-3 text-sm font-medium text-[#0F172A] bg-[#F8FAFC] hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
            >
              View Examples
            </a>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-slate-200">
          
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-4 space-y-5">
            <a href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-[#4F46E5] flex items-center justify-center text-white shadow-sm group-hover:bg-indigo-700 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  />
                </svg>
              </div>
              <span className="font-semibold text-lg tracking-tight text-[#0F172A]">
                AI Website Builder
              </span>
            </a>

            <p className="text-sm text-[#475569] leading-relaxed max-w-sm">
              Turn plain-English prompts into production-ready React and Tailwind CSS websites in seconds.
            </p>

            {/* Newsletter Form */}
            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#0F172A] mb-2.5">
                Product updates & prompt tips
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-sm text-[#4F46E5] font-medium py-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Thanks for subscribing!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    aria-label="Email address"
                    className="w-full px-3.5 py-2 text-sm text-[#0F172A] placeholder-[#94A3B8] bg-[#FFFFFF] border border-slate-200 rounded-lg focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 transition-all"
                  />
                  <button
                    type="submit"
                    className="flex-shrink-0 px-4 py-2 text-sm font-medium text-white bg-[#4F46E5] hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0F172A]">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-[#475569] hover:text-[#0F172A] transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Copyright & Social Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs text-[#94A3B8]">
            <span>&copy; {new Date().getFullYear()} AI Website Builder Inc. All rights reserved.</span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="inline-flex items-center gap-1.5 text-[#475569]">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              All systems operational
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-5 text-[#94A3B8]">
            <a href="#twitter" aria-label="X (Twitter)" className="hover:text-[#0F172A] transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#github" aria-label="GitHub" className="hover:text-[#0F172A] transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            </a>
            <a href="#linkedin" aria-label="LinkedIn" className="hover:text-[#0F172A] transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}