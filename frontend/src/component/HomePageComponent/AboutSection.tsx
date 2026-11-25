import React from 'react';

interface HighlightCard {
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  icon: React.ReactNode;
}

interface PricingPreview {
  tier: string;
  price: string;
  period: string;
  summary: string;
  highlighted?: boolean;
}

const HIGHLIGHTS: HighlightCard[] = [
  {
    title: 'Prompt-to-Code Engine',
    description:
      'Skip bloated templates. Our AI generates semantic React, Tailwind CSS, and responsive layouts tailored directly to your brand.',
    metric: '< 30s',
    metricLabel: 'Average build time',
    icon: (
      <svg className="w-5 h-5 text-[#4F46E5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Full-Stack Services',
    description:
      'From custom domain hosting and SSL certificates to SEO optimization and clean code export, everything you need lives in one workspace.',
    metric: '99.9%',
    metricLabel: 'Global edge uptime',
    icon: (
      <svg className="w-5 h-5 text-[#4F46E5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
      </svg>
    ),
  },
  {
    title: 'Transparent, Fair Pricing',
    description:
      'Start free with unlimited AI drafts. Upgrade only when you are ready to connect a custom domain, export code, or scale team seats.',
    metric: '$0',
    metricLabel: 'To start building',
    icon: (
      <svg className="w-5 h-5 text-[#4F46E5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const PRICING_OVERVIEW: PricingPreview[] = [
  {
    tier: 'Starter',
    price: '$0',
    period: '/month',
    summary: '3 AI-generated sites, subdomain hosting, and visual editor access.',
  },
  {
    tier: 'Pro',
    price: '$19',
    period: '/month',
    summary: 'Unlimited sites, custom domains, clean React/Tailwind export, and priority AI.',
    highlighted: true,
  },
  {
    tier: 'Team',
    price: '$49',
    period: '/month',
    summary: 'Shared component libraries, role permissions, and dedicated deployment pipelines.',
  },
];

export default function AboutSection(): React.JSX.Element {
  return (
    <section id="about" className="bg-[#F8FAFC] py-20 lg:py-28 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Two-Column Mission & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#4F46E5]">
              About AI Website Builder
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] leading-tight">
              Built for founders, designers, and teams who value speed without compromise.
            </h2>
            <p className="mt-5 text-base text-[#475569] leading-relaxed">
              Traditional website builders lock you into rigid templates and messy code, while hiring an agency takes weeks. We built AI Website Builder to bridge the gap—combining generative design with production-grade frontend engineering.
            </p>
            <p className="mt-4 text-base text-[#475569] leading-relaxed">
              Whether you are validating a weekend MVP, launching a SaaS landing page, or managing client sites, our platform handles layout structure, copywriting, hosting, and code export in a single streamlined workflow.
            </p>

            {/* Quick Checklist */}
            <ul className="mt-8 space-y-3">
              {[
                'Zero vendor lock-in — export clean React & Tailwind code anytime',
                'Built-in global CDN hosting, SSL, and instant analytics',
                'Predictable flat-rate plans with no hidden bandwidth fees',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#0F172A]">
                  <svg
                    className="w-5 h-5 text-[#4F46E5] flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Visual + Service Highlights */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-[#FFFFFF] shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                alt="Team collaborating on web design"
                className="w-full h-64 object-cover"
              />
              <div className="p-6 bg-[#FFFFFF]">
                <div className="grid grid-cols-3 gap-4 divide-x divide-slate-200 text-center">
                  <div>
                    <p className="text-2xl font-bold text-[#0F172A]">50k+</p>
                    <p className="text-xs text-[#94A3B8] mt-1">Sites Launched</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#4F46E5]">10x</p>
                    <p className="text-xs text-[#94A3B8] mt-1">Faster Delivery</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#0F172A]">4.9/5</p>
                    <p className="text-xs text-[#94A3B8] mt-1">Creator Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Pillars: Services & Value */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {HIGHLIGHTS.map((card) => (
            <div
              key={card.title}
              className="bg-[#FFFFFF] rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center mb-4">
                  {card.icon}
                </div>
                <h3 className="text-lg font-semibold text-[#0F172A]">{card.title}</h3>
                <p className="mt-2 text-sm text-[#475569] leading-relaxed">
                  {card.description}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-baseline justify-between">
                <span className="text-xl font-bold text-[#0F172A]">{card.metric}</span>
                <span className="text-xs text-[#94A3B8]">{card.metricLabel}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Compact Pricing Overview Strip */}
        <div className="mt-16 bg-[#FFFFFF] rounded-2xl p-8 border border-slate-200 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-100">
            <div>
              <h3 className="text-xl font-bold text-[#0F172A]">Simple, Transparent Pricing</h3>
              <p className="text-sm text-[#475569] mt-1">
                Start for free, scale as you grow. Cancel or export your projects anytime.
              </p>
            </div>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-[#4F46E5] bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors self-start md:self-auto"
            >
              Compare Full Plans &rarr;
            </a>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING_OVERVIEW.map((plan) => (
              <div
                key={plan.tier}
                className={`rounded-xl p-5 border transition-all ${
                  plan.highlighted
                    ? 'border-[#4F46E5] bg-indigo-50/30 ring-1 ring-[#4F46E5]/20'
                    : 'border-slate-200 bg-[#F8FAFC]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#0F172A]">{plan.tier}</span>
                  {plan.highlighted && (
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#4F46E5] text-white">
                      Most Popular
                    </span>
                  )}
                </div>
                <div className="mt-3 flex items-baseline">
                  <span className="text-2xl font-bold text-[#0F172A]">{plan.price}</span>
                  <span className="text-xs text-[#94A3B8] ml-1">{plan.period}</span>
                </div>
                <p className="mt-2 text-xs text-[#475569] leading-relaxed">{plan.summary}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}