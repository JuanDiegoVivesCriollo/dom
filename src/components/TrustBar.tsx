'use client';

import { motion } from 'framer-motion';
import { Shield, FileCheck, Truck, Users, Stethoscope, Sparkles, Package } from 'lucide-react';

const trustItems = [
  {
    icon: Package,
    title: 'Multi-Drop Courier Experience',
  },
  {
    icon: Stethoscope,
    title: 'Medical & Laboratory Logistics',
  },
  {
    icon: Sparkles,
    title: 'Cleaning & Property Services',
  },
  {
    icon: Users,
    title: 'Two-Man Crews Available',
  },
  {
    icon: FileCheck,
    title: 'Fully Insured Operations',
  },
  {
    icon: Shield,
    title: 'DBS-Checked Drivers',
  },
  {
    icon: Truck,
    title: 'Licensed Waste Carrier',
  },
];

export default function TrustBar() {
  return (
    <section className="section-secondary py-10 border-y border-theme">
      <div className="container-custom">
        <h3 className="text-center text-theme-secondary text-sm uppercase tracking-wider mb-6 font-medium">
          Trust & Operational Standards
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          {trustItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex items-center gap-3 px-5 py-3 theme-card rounded-lg border border-transparent hover:border-[var(--accent)]/30 transition-all group"
            >
              <item.icon className="w-5 h-5 text-[var(--accent)] group-hover:scale-110 transition-transform" />
              <span className="text-theme-primary text-sm font-medium group-hover:text-[var(--accent)] transition-colors">{item.title}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
