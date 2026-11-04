'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageCircle, User, Building2, Phone, MapPin, FileText, Mail, Calendar, Package } from 'lucide-react';

const serviceOptions = [
  'Transport & Logistics',
  'Medical & Laboratory Logistics',
  'Multi-Drop Courier Operations',
  'Removals (Residential)',
  'Removals (Commercial)',
  'End of Tenancy Cleaning',
  'Airbnb & Short-Let Turnovers',
  'Deep Cleaning',
  'Waste & Clearance',
  'Combined Package',
  'Other',
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    service: '',
    pickup: '',
    delivery: '',
    propertySize: '',
    preferredDate: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your enquiry! We will get back to you shortly.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="theme-card rounded-2xl p-8"
    >
      <h3 className="text-2xl font-bold text-theme-primary mb-2">Request Your Free Quote</h3>
      <p className="text-theme-secondary text-sm mb-8">Fill in the details below and we'll get back to you promptly.</p>

      <div className="space-y-5">
        {/* Name & Company Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-muted" />
            <input
              type="text"
              name="name"
              placeholder="Full Name *"
              required
              value={formData.name}
              onChange={handleChange}
              className="form-input pl-12"
            />
          </div>
          <div className="relative">
            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-muted" />
            <input
              type="text"
              name="company"
              placeholder="Company Name (Optional)"
              value={formData.company}
              onChange={handleChange}
              className="form-input pl-12"
            />
          </div>
        </div>

        {/* Phone & Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-muted" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number *"
              required
              value={formData.phone}
              onChange={handleChange}
              className="form-input pl-12"
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-muted" />
            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              required
              value={formData.email}
              onChange={handleChange}
              className="form-input pl-12"
            />
          </div>
        </div>

        {/* Service Type */}
        <div className="relative">
          <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-muted" />
          <select
            name="service"
            required
            value={formData.service}
            onChange={handleChange}
            className="form-input pl-12 appearance-none cursor-pointer"
          >
            <option value="">Service Required *</option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-theme-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Pickup & Delivery Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-muted" />
            <input
              type="text"
              name="pickup"
              placeholder="Collection Location"
              value={formData.pickup}
              onChange={handleChange}
              className="form-input pl-12"
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-muted" />
            <input
              type="text"
              name="delivery"
              placeholder="Delivery Location"
              value={formData.delivery}
              onChange={handleChange}
              className="form-input pl-12"
            />
          </div>
        </div>

        {/* Property Size & Date Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="relative">
            <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-muted" />
            <input
              type="text"
              name="propertySize"
              placeholder="Property Size or Item Details"
              value={formData.propertySize}
              onChange={handleChange}
              className="form-input pl-12"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-muted" />
            <input
              type="text"
              name="preferredDate"
              placeholder="Preferred Date"
              value={formData.preferredDate}
              onChange={handleChange}
              onFocus={(e) => e.target.type = 'date'}
              onBlur={(e) => !e.target.value && (e.target.type = 'text')}
              className="form-input pl-12"
            />
          </div>
        </div>

        {/* Message */}
        <div className="relative">
          <textarea
            name="message"
            placeholder="Additional details about your requirements..."
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="form-input resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn-primary w-full justify-center text-base"
        >
          Submit Quote Request
          <Send className="w-5 h-5" />
        </button>

        {/* WhatsApp Alternative */}
        <a
          href="https://wa.me/447424399563?text=Hello%2C%20I%27d%20like%20to%20enquire%20about%20your%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 rounded-xl text-[#25D366] font-medium transition-all"
        >
          <MessageCircle className="w-5 h-5" />
          WhatsApp Enquiry
        </a>
      </div>
    </motion.form>
  );
}
