import React from 'react';

interface DeliveredProject {
  id: string;
  title: string;
  category: string;
  promptUsed: string;
  buildTime: string;
  imageUrl: string;
}

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarUrl: string;
  rating: number;
}

const DELIVERED_PROJECTS: DeliveredProject[] = [
  {
    id: 'proj-1',
    title: 'MetricFlow Analytics',
    category: 'B2B SaaS Landing Page',
    promptUsed: '"Dark-accented SaaS landing page for a real-time revenue analytics tool with pricing cards"',
    buildTime: '24s',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'proj-2',
    title: 'Kanso Studio',
    category: 'Architecture & Design Portfolio',
    promptUsed: '"Minimalist architectural portfolio with full-bleed project gallery and inquiry form"',
    buildTime: '19s',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'proj-3',
    title: 'Roast & Crumb',
    category: 'Local Café & Online Ordering',
    promptUsed: '"Warm, clean bakery website featuring seasonal menu grid, location map, and table booking"',
    buildTime: '28s',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80',
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-1',
    quote:
      'We went from a rough idea on a Monday morning to a live, custom-domain waitlist site before lunch. The exported Tailwind code was cleaner than what our agency quoted $4,000 for.',
    author: 'Elena Rostova',
    role: 'Co-Founder',
    company: 'MetricFlow',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    rating: 5,
  },
  {
    id: 'rev-2',
    quote:
      'As a solo developer, design is usually my bottleneck. AI Website Builder gave me a cohesive layout, responsive breakpoints, and semantic React components on the first prompt.',
    author: 'Marcus Chen',
    role: 'Indie Maker',
    company: 'ShipFast Tools',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
  },
  {
    id: 'rev-3',
    quote:
      'Our studio uses it to prototype client concepts during live discovery calls. Being able to iterate on copy and layout in real time has doubled our close rate.',
    author: 'Sarah Jenkins',
    role: 'Creative Director',
    company: 'Northstar Digital',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
    rating: 5,
  },
];

const CUSTOMER_BRANDS: string[] = [
  'Veloce',
  'Northstar',
  'MetricFlow',
  'Kanso',
  'CloudNine',
  'StackPulse',
];

export default function ShowcaseAndProofSection(): React.JSX.Element {
  return (
    <section id="showcase" className="bg-[#FFFFFF] py-20 lg:py-28 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Trusted Customer Logos Bar */}
        <div className="pb-16 border-b border-slate-200/80 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
            Trusted by 12,000+ startups, agencies, and independent creators
          </p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {CUSTOMER_BRANDS.map((brand) => (
              <div
                key={brand}
                className="flex items-center justify-center gap-2 text-[#94A3B8] hover:text-[#475569] transition-colors select-none"
              >
                <span className="w-2 h-2 rounded-sm bg-current opacity-60" />
                <span className="text-lg font-bold tracking-tight">{brand}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Delivered Services & Live Showcase */}
        <div className="mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#4F46E5]">
                Delivered with AI
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A]">
                Real websites generated from single prompts
              </h2>
              <p className="mt-3 text-base text-[#475569]">
                From SaaS marketing sites to e-commerce storefronts and portfolios—see what our users have designed, deployed, and exported in under a minute.
              </p>
            </div>
            <a
              href="#templates"
              className="text-sm font-medium text-[#4F46E5] hover:text-indigo-700 transition-colors self-start md:self-auto"
            >
              Explore all 100+ templates &rarr;
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {DELIVERED_PROJECTS.map((project) => (
              <article
                key={project.id}
                className="group rounded-2xl bg-[#F8FAFC] border border-slate-200 overflow-hidden hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Site Preview Thumbnail */}
                  <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden border-b border-slate-200">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-medium bg-[#FFFFFF]/95 text-[#0F172A] border border-slate-200 shadow-sm">
                      Built in {project.buildTime}
                    </span>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <span className="text-xs font-medium text-[#4F46E5]">
                      {project.category}
                    </span>
                    <h3 className="mt-1 text-lg font-bold text-[#0F172A]">
                      {project.title}
                    </h3>

                    {/* Prompt Callout */}
                    <div className="mt-4 p-3 rounded-lg bg-[#FFFFFF] border border-slate-200/80">
                      <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8] mb-1">
                        Prompt Used
                      </span>
                      <p className="text-xs text-[#475569] italic leading-relaxed">
                        {project.promptUsed}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-5 pt-2 flex items-center justify-between text-xs font-medium">
                  <span className="text-[#94A3B8]">React + Tailwind CSS</span>
                  <button
                    type="button"
                    className="text-[#0F172A] group-hover:text-[#4F46E5] transition-colors cursor-pointer"
                  >
                    Preview Live &rarr;
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* 3. User Views & Testimonials */}
        <div className="mt-24">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#4F46E5]">
              Customer Reviews
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A]">
              Loved by builders who ship fast
            </h2>
            <p className="mt-3 text-base text-[#475569]">
              Hear how founders, developers, and creative teams use AI Website Builder to launch faster.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((review) => (
              <div
                key={review.id}
                className="rounded-2xl bg-[#F8FAFC] p-6 sm:p-8 border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  {/* 5-Star Rating */}
                  <div className="flex items-center gap-1 text-[#4F46E5]" aria-label={`${review.rating} out of 5 stars`}>
                    {Array.from({ length: review.rating }).map((_, idx) => (
                      <svg key={idx} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Review Copy */}
                  <blockquote className="mt-4 text-sm text-[#0F172A] leading-relaxed">
                    "{review.quote}"
                  </blockquote>
                </div>

                {/* Reviewer Profile */}
                <div className="mt-6 pt-5 border-t border-slate-200/80 flex items-center gap-3">
                  <img
                    src={review.avatarUrl}
                    alt={review.author}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#0F172A]">{review.author}</p>
                    <p className="text-xs text-[#475569]">
                      {review.role}, {review.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}