import { useState } from 'react';

export default function HeroSection() {
  const [prompt, setPrompt] = useState('');

  const handleGenerate = (e: any) => {
    e.preventDefault();
    // Handle prompt submission
    console.log('Generating site for:', prompt);
  };

  return (
    <section className="relative overflow-hidden bg-[#FFFFFF] pt-16 pb-24 lg:pt-24 lg:pb-32">
      {/* Subtle Background Grid Pattern */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F8FAFC] border border-slate-200 mb-8">
          <span className="flex h-2 w-2 rounded-full bg-[#4F46E5]" />
          <span className="text-xs font-medium text-[#475569]">
            AI Website Builder 2.0 — Now with instant React & Tailwind export
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="max-w-4xl mx-auto text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0F172A] leading-[1.15]">
          Turn a single prompt into a{' '}
          <span className="text-[#4F46E5]">production-ready website</span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl mx-auto mt-6 text-base sm:text-lg text-[#475569] leading-relaxed">
          Describe your idea in plain English. Our AI designs the layout, writes clean responsive code, and publishes your site in seconds—no drag-and-drop tedium required.
        </p>

        {/* Interactive Prompt Input Box */}
        <form
          onSubmit={handleGenerate}
          className="max-w-2xl mx-auto mt-10"
        >
          <div className="flex flex-col sm:flex-row items-center gap-2 p-2 bg-[#FFFFFF] rounded-xl border border-slate-200 shadow-lg shadow-slate-200/50 focus-within:border-[#4F46E5] focus-within:ring-2 focus-within:ring-[#4F46E5]/20 transition-all">
            <div className="flex items-center w-full px-3">
              <svg
                className="w-5 h-5 text-[#94A3B8] mr-3 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                />
              </svg>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., A minimalist portfolio for a product designer..."
                className="w-full py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] bg-transparent focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto flex-shrink-0 px-6 py-3 text-sm font-medium text-white bg-[#4F46E5] hover:bg-indigo-700 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Generate Site
            </button>
          </div>

          {/* Quick Suggestion Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
            <span className="text-[#94A3B8]">Try:</span>
            {[
              'SaaS Landing Page',
              'Coffee Shop & Menu',
              'Developer Blog',
            ].map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setPrompt(`Build a modern ${suggestion.toLowerCase()}`)}
                className="px-2.5 py-1 rounded-md bg-[#F8FAFC] hover:bg-slate-100 text-[#475569] border border-slate-200/80 transition-colors cursor-pointer"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </form>

        {/* Product Preview Mockup */}
        <div className="max-w-5xl mx-auto mt-16">
          <div className="rounded-2xl bg-[#F8FAFC] p-2 sm:p-3 border border-slate-200/80 shadow-2xl shadow-slate-200/60">
            <div className="rounded-xl overflow-hidden bg-[#FFFFFF] border border-slate-200">
              {/* Browser Window Top Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#F8FAFC] border-b border-slate-200">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-slate-300" />
                  <span className="w-3 h-3 rounded-full bg-slate-300" />
                  <span className="w-3 h-3 rounded-full bg-slate-300" />
                </div>
                <div className="px-4 py-1 rounded-md bg-[#FFFFFF] border border-slate-200 text-xs text-[#94A3B8] font-mono">
                  https://your-project.ai-builder.app
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-[#4F46E5] bg-indigo-50 px-2.5 py-0.5 rounded">
                    Live Preview
                  </span>
                </div>
              </div>

              {/* Preview Visual / Workspace Screenshot */}
              <div className="relative aspect-[16/9] w-full bg-[#F8FAFC] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&w=1600&q=80"
                  alt="AI Website Builder Interface Preview"
                  className="w-full h-full object-cover object-top"
                />
                {/* Subtle Floating Status Badge */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-[#FFFFFF]/95 backdrop-blur border border-slate-200 shadow-md">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-medium text-[#0F172A]">
                    Responsive layout & clean Tailwind code ready
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}