import  { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Templates', href: '#templates' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Docs', href: '#docs' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FFFFFF]/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Leftmost: Brand Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-[#4F46E5] flex items-center justify-center text-white shadow-sm group-hover:bg-indigo-700 transition-colors">
                {/* Simple Geometric AI Spark/Layout Icon */}
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
          </div>

          {/* Center: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[#475569] hover:text-[#0F172A] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Side: Sign In & CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              type="button"
              className="text-sm font-medium text-[#475569] hover:text-[#0F172A] px-3 py-2 rounded-lg hover:bg-[#F8FAFC] transition-colors"
            >
              Sign in
            </button>
            <button
              type="button"
              className="text-sm font-medium text-white bg-[#4F46E5] hover:bg-indigo-700 px-4 py-2 rounded-lg shadow-sm transition-colors"
            >
              Start Building
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC] focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#FFFFFF] border-b border-slate-200 px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block px-3 py-2 rounded-lg text-base font-medium text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              type="button"
              className="w-full text-center text-sm font-medium text-[#0F172A] bg-[#F8FAFC] hover:bg-slate-100 py-2.5 rounded-lg border border-slate-200 transition-colors"
            >
              Sign in
            </button>
            <button
              type="button"
              className="w-full text-center text-sm font-medium text-white bg-[#4F46E5] hover:bg-indigo-700 py-2.5 rounded-lg shadow-sm transition-colors"
            >
              Start Building
            </button>
          </div>
        </div>
      )}
    </header>
  );
}