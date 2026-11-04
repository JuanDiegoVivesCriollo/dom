'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { ComponentType } from 'react';

interface ServiceCardProps {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
  index: number;
  isHighlighted?: boolean;
  id?: string;
}

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  features,
  index,
  isHighlighted = false,
  id,
}: ServiceCardProps) {
  return (
    <motion.article
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative p-8 rounded-2xl card-hover ${
        isHighlighted
          ? 'bg-gradient-to-br from-[#274060] to-[#1f3044] border-2 border-[var(--accent)]/30'
          : 'bg-[#1f3044] border border-[#274060]/50'
      }`}
    >
      {/* Highlighted Badge */}
      {isHighlighted && (
        <div className="absolute -top-3 left-8 px-4 py-1 bg-[var(--accent)] text-white text-xs font-semibold rounded-full">
          Property Division
        </div>
      )}

      {/* Icon */}
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
        isHighlighted ? 'bg-[var(--accent)]/20' : 'bg-[#274060]'
      }`}>
        <Icon className={`w-7 h-7 ${isHighlighted ? 'text-[var(--accent)]' : 'text-[var(--accent)]'}`} />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[var(--accent)] transition-colors">
        {title}
      </h3>

      {/* Description */}
      <p className="text-[#94a3b8] text-sm leading-relaxed mb-6">
        {description}
      </p>

      {/* Features */}
      <ul className="space-y-2 mb-6">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-[#cbd5e1]">
            <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full" />
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="/contact"
        className="inline-flex items-center gap-2 text-[var(--accent)] text-sm font-medium group/link"
      >
        Get a Quote
        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
      </a>
    </motion.article>
  );
}
