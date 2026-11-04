'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  MessageCircle, 
  User, 
  Building2, 
  Phone, 
  MapPin, 
  Mail, 
  Calendar, 
  Package,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Clock,
  Shield,
  Truck,
  Star,
  ChevronDown,
  ChevronUp,
  Stethoscope,
  Boxes,
  Home,
  Building,
  Sparkle,
  BedDouble,
  SprayCan,
  Recycle,
  ClipboardList,
  HelpCircle
} from 'lucide-react';

const serviceOptions = [
  { value: 'transport', label: 'Transport & Logistics', Icon: Truck },
  { value: 'medical', label: 'Medical & Laboratory Logistics', Icon: Stethoscope },
  { value: 'courier', label: 'Multi-Drop Courier Operations', Icon: Boxes },
  { value: 'removals-residential', label: 'Removals (Residential)', Icon: Home },
  { value: 'removals-commercial', label: 'Removals (Commercial)', Icon: Building },
  { value: 'end-tenancy', label: 'End of Tenancy Cleaning', Icon: SprayCan },
  { value: 'airbnb', label: 'Airbnb & Short-Let Turnovers', Icon: BedDouble },
  { value: 'deep-cleaning', label: 'Deep Cleaning', Icon: Sparkle },
  { value: 'waste', label: 'Waste & Clearance', Icon: Recycle },
  { value: 'combined', label: 'Combined Package', Icon: ClipboardList },
  { value: 'other', label: 'Other', Icon: HelpCircle },
];

// Typewriter phrases for hero
const typewriterPhrases = [
  "Get Your Project Moving",
  "Professional Transport",
  "Reliable Removals",
  "Expert Cleaning",
  "UK-Wide Coverage",
];

const contactMethods = [
  {
    icon: Phone,
    title: 'Call Us',
    description: 'Speak directly with our team',
    value: '07424 399563',
    secondaryValue: '',
    action: 'tel:+447424399563',
    color: 'from-blue-500 to-blue-600',
    hoverColor: 'group-hover:from-blue-600 group-hover:to-blue-700',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    description: 'Quick chat support',
    value: 'Message us now',
    action: 'https://wa.me/447424399563?text=Hello%2C%20I%27d%20like%20to%20enquire%20about%20your%20services.',
    color: 'from-green-500 to-green-600',
    hoverColor: 'group-hover:from-green-600 group-hover:to-green-700',
    external: true,
  },
  {
    icon: Mail,
    title: 'Email',
    description: 'Get a detailed response',
    value: 'domtranssportuk@gmail.com',
    action: 'mailto:domtranssportuk@gmail.com',
    color: 'from-purple-500 to-purple-600',
    hoverColor: 'group-hover:from-purple-600 group-hover:to-purple-700',
  },
  {
    icon: MapPin,
    title: 'Location',
    description: 'Based in Birmingham',
    value: 'West Midlands, UK',
    secondaryValue: 'UK-Wide Coverage',
    color: 'from-orange-500 to-orange-600',
    hoverColor: 'group-hover:from-orange-600 group-hover:to-orange-700',
  },
];

const features = [
  { icon: Shield, text: 'Fully Insured & DBS Checked' },
  { icon: Clock, text: 'Same-Day Service Available' },
  { icon: Star, text: '5-Star Rated Service' },
  { icon: Truck, text: 'UK-Wide Coverage' },
];

interface FormState {
  name: string;
  company: string;
  phone: string;
  email: string;
  service: string;
  pickup: string;
  delivery: string;
  propertySize: string;
  preferredDate: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormState>({
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
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  
  // Typewriter state
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const formRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });
  
  // Typewriter effect
  useEffect(() => {
    const currentPhrase = typewriterPhrases[currentPhraseIndex];
    
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(pauseTimeout);
    }
    
    if (!isDeleting && currentText === currentPhrase) {
      setIsPaused(true);
      return;
    }
    
    if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentPhraseIndex((prev) => (prev + 1) % typewriterPhrases.length);
      return;
    }
    
    const timeout = setTimeout(() => {
      if (isDeleting) {
        setCurrentText(currentPhrase.substring(0, currentText.length - 1));
      } else {
        setCurrentText(currentPhrase.substring(0, currentText.length + 1));
      }
    }, isDeleting ? 40 : 80);
    
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPaused, currentPhraseIndex]);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServiceDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
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
      setActiveStep(1);
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section 
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
            }}
          />
          {/* Dark Overlay */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(10, 25, 47, 0.92) 0%, rgba(10, 25, 47, 0.85) 50%, rgba(10, 25, 47, 0.75) 100%)',
            }}
          />
          {/* Accent Color Gradient Overlay */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 30% 70%, rgba(201, 162, 39, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(201, 162, 39, 0.1) 0%, transparent 40%)',
            }}
          />
        </div>
        
        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-40 -right-40 w-96 h-96 rounded-full"
            style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
          />
          
          {/* Floating Icons */}
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="absolute top-1/4 left-[15%] opacity-30"
          >
            <Truck className="w-12 h-12 text-white" />
          </motion.div>
          <motion.div
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: '1s' }}
            className="absolute top-1/3 right-[20%] opacity-30"
          >
            <Package className="w-10 h-10 text-white" />
          </motion.div>
          <motion.div
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: '2s' }}
            className="absolute bottom-1/4 left-[25%] opacity-30"
          >
            <MapPin className="w-8 h-8 text-white" />
          </motion.div>
        </div>

        <div className="container-custom relative z-10 py-20 lg:py-32">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isHeroInView ? 'visible' : 'hidden'}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-8">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
                style={{ 
                  background: 'linear-gradient(135deg, var(--accent), var(--accent-hover))',
                  color: 'white',
                  boxShadow: '0 4px 20px rgba(201, 162, 39, 0.3)',
                }}
              >
                <Sparkles className="w-4 h-4" />
                Free Quote • No Obligation
              </span>
            </motion.div>

            {/* Heading with Typewriter Effect */}
            <motion.div variants={itemVariants} className="mb-6">
              <h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              >
                <span 
                  className="block mb-2"
                  style={{
                    color: 'white',
                    textShadow: '0 2px 20px rgba(0,0,0,0.5), 0 4px 40px rgba(0,0,0,0.3)',
                  }}
                >
                  Contact Us
                </span>
                <span 
                  className="block min-h-[1.2em] relative"
                  style={{ 
                    background: 'linear-gradient(135deg, var(--accent), #e6c94d)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {currentText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                    className="inline-block w-[3px] h-[0.9em] ml-1 align-middle"
                    style={{ background: 'var(--accent)' }}
                  />
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p 
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed text-white/80"
            >
              Professional transport, removals & cleaning services. 
              Get a response within <strong style={{ color: 'var(--accent)' }}>2 hours</strong>.
            </motion.p>

            {/* Feature Pills */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <feature.icon className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                  {feature.text}
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                onClick={scrollToForm}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-lg font-semibold text-white transition-all duration-300"
                style={{ 
                  background: 'linear-gradient(135deg, var(--accent), var(--accent-hover))',
                  boxShadow: '0 4px 20px rgba(201, 162, 39, 0.3)',
                }}
              >
                Get Your Free Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.a
                href="https://wa.me/447424399563?text=Hello%2C%20I%27d%20like%20to%20enquire%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300"
                style={{ 
                  background: 'rgba(37, 211, 102, 0.1)',
                  color: '#25D366',
                  border: '2px solid rgba(37, 211, 102, 0.3)',
                }}
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              onClick={scrollToForm}
              className="cursor-pointer p-2 rounded-full"
              style={{ 
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
              }}
            >
              <ChevronDown className="w-6 h-6" style={{ color: 'var(--accent)' }} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods Cards */}
      <section className="py-20" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Choose How to Reach Us
            </h2>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              Multiple ways to get in touch — pick what works best for you
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <motion.a
                key={index}
                href={method.action}
                target={method.external ? '_blank' : undefined}
                rel={method.external ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-500"
                style={{ 
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                }}
              >
                {/* Gradient Overlay on Hover */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${method.color} ${method.hoverColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                
                {/* Icon */}
                <div className="relative z-10 mb-4">
                  <div 
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <method.icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 
                    className="text-lg font-bold mb-1 group-hover:text-white transition-colors"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {method.title}
                  </h3>
                  <p 
                    className="text-sm mb-3 group-hover:text-white/80 transition-colors"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {method.description}
                  </p>
                  <p 
                    className="font-semibold group-hover:text-white transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {method.value}
                  </p>
                  {method.secondaryValue && (
                    <p 
                      className="text-sm mt-1 group-hover:text-white/80 transition-colors"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {method.secondaryValue}
                    </p>
                  )}
                </div>

                {/* Arrow */}
                {method.action && (
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                )}
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section 
        ref={formRef}
        className="py-20 lg:py-32 relative overflow-hidden"
        style={{ background: 'var(--bg-primary)' }}
      >
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-0 right-0 w-1/2 h-full opacity-5"
            style={{
              background: `radial-gradient(circle at 70% 30%, var(--accent) 0%, transparent 50%)`,
            }}
          />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left Side - Info */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="sticky top-32">
                <span 
                  className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6"
                  style={{ 
                    background: 'var(--accent)',
                    color: 'white',
                  }}
                >
                  Quote Request
                </span>
                
                <h2 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Request Your
                  <span 
                    className="block"
                    style={{ color: 'var(--accent)' }}
                  >
                    Free Quote
                  </span>
                </h2>
                
                <p 
                  className="text-lg mb-10 leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Fill out the form and our team will get back to you within 2 hours. 
                  We'll provide a detailed, no-obligation quote tailored to your needs.
                </p>

                {/* Process Steps */}
                <div className="space-y-6">
                  {[
                    { step: '01', title: 'Submit Details', desc: 'Tell us about your requirements' },
                    { step: '02', title: 'We Review', desc: 'Our team assesses your needs' },
                    { step: '03', title: 'Get Quote', desc: 'Receive your customized quote' },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="flex items-start gap-4"
                    >
                      <div 
                        className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg"
                        style={{ 
                          background: index === 0 ? 'var(--accent)' : 'var(--bg-card)',
                          color: index === 0 ? 'white' : 'var(--text-muted)',
                          border: `1px solid ${index === 0 ? 'transparent' : 'var(--border-color)'}`,
                        }}
                      >
                        {item.step}
                      </div>
                      <div>
                        <h4 
                          className="font-semibold text-lg"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {item.title}
                        </h4>
                        <p style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Trust Badges */}
                <div className="mt-12 pt-8" style={{ borderTop: '1px solid var(--border-color)' }}>
                  <p className="text-sm font-medium mb-4" style={{ color: 'var(--text-muted)' }}>
                    TRUSTED BY BUSINESSES ACROSS THE UK
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {['DBS Checked', 'Fully Insured', 'Licensed'].map((badge, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium"
                        style={{ 
                          background: 'var(--bg-card)',
                          color: 'var(--text-secondary)',
                          border: '1px solid var(--border-color)',
                        }}
                      >
                        <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="rounded-3xl p-8 md:p-12 text-center"
                    style={{ 
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                      className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-hover))' }}
                    >
                      <CheckCircle2 className="w-12 h-12 text-white" />
                    </motion.div>
                    <h3 
                      className="text-2xl md:text-3xl font-bold mb-4"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Thank You!
                    </h3>
                    <p 
                      className="text-lg mb-6"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      Your quote request has been submitted successfully. 
                      We'll get back to you within 2 hours.
                    </p>
                    <div 
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                      style={{ 
                        background: 'rgba(37, 211, 102, 0.1)',
                        color: '#25D366',
                      }}
                    >
                      <Clock className="w-4 h-4" />
                      Typical response time: Under 2 hours
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="rounded-3xl p-6 md:p-10"
                    style={{ 
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                    }}
                  >
                    {/* Form Header */}
                    <div className="mb-8">
                      <h3 
                        className="text-xl md:text-2xl font-bold mb-2"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        Tell us about your project
                      </h3>
                      <p style={{ color: 'var(--text-muted)' }}>
                        Fields marked with * are required
                      </p>
                    </div>

                    <div className="space-y-6">
                      {/* Name & Company */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                          icon={User}
                          name="name"
                          placeholder="Full Name *"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          focused={focusedField === 'name'}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                        />
                        <InputField
                          icon={Building2}
                          name="company"
                          placeholder="Company (Optional)"
                          value={formData.company}
                          onChange={handleChange}
                          focused={focusedField === 'company'}
                          onFocus={() => setFocusedField('company')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </div>

                      {/* Phone & Email */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                          icon={Phone}
                          name="phone"
                          type="tel"
                          placeholder="Phone Number *"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          focused={focusedField === 'phone'}
                          onFocus={() => setFocusedField('phone')}
                          onBlur={() => setFocusedField(null)}
                        />
                        <InputField
                          icon={Mail}
                          name="email"
                          type="email"
                          placeholder="Email Address *"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          focused={focusedField === 'email'}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </div>

                      {/* Service Selection - Dropdown */}
                      <div ref={dropdownRef} className="relative">
                        <label 
                          className="block text-sm font-medium mb-3"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          Select Service *
                        </label>
                        
                        {/* Dropdown Trigger */}
                        <motion.button
                          type="button"
                          whileTap={{ scale: 0.99 }}
                          onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                          className="w-full px-5 py-4 rounded-xl flex items-center justify-between transition-all duration-300"
                          style={{
                            background: 'var(--bg-secondary)',
                            border: `2px solid ${isServiceDropdownOpen ? 'var(--accent)' : 'var(--border-color)'}`,
                            color: formData.service ? 'var(--text-primary)' : 'var(--text-muted)',
                          }}
                        >
                          <div className="flex items-center gap-3">
                            {formData.service ? (
                              <>
                                {(() => {
                                  const selected = serviceOptions.find(s => s.value === formData.service);
                                  if (selected) {
                                    const IconComponent = selected.Icon;
                                    return (
                                      <>
                                        <div 
                                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                                          style={{ background: 'var(--accent)' }}
                                        >
                                          <IconComponent className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="font-medium">{selected.label}</span>
                                      </>
                                    );
                                  }
                                  return null;
                                })()}
                              </>
                            ) : (
                              <>
                                <Package className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                                <span>Choose a service...</span>
                              </>
                            )}
                          </div>
                          <motion.div
                            animate={{ rotate: isServiceDropdownOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                          </motion.div>
                        </motion.button>
                        
                        {/* Dropdown Menu */}
                        <AnimatePresence>
                          {isServiceDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -10, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.98 }}
                              transition={{ duration: 0.2 }}
                              className="absolute z-50 w-full mt-2 rounded-xl overflow-hidden shadow-2xl"
                              style={{
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border-color)',
                                maxHeight: '320px',
                                overflowY: 'auto',
                              }}
                            >
                              {serviceOptions.map((service, index) => {
                                const IconComponent = service.Icon;
                                const isSelected = formData.service === service.value;
                                return (
                                  <motion.button
                                    key={service.value}
                                    type="button"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.03 }}
                                    onClick={() => {
                                      setFormData({ ...formData, service: service.value });
                                      setIsServiceDropdownOpen(false);
                                    }}
                                    className="w-full px-4 py-3 flex items-center gap-3 transition-all duration-200 text-left"
                                    style={{
                                      background: isSelected 
                                        ? 'linear-gradient(135deg, var(--accent), var(--accent-hover))'
                                        : 'transparent',
                                      borderBottom: index < serviceOptions.length - 1 ? '1px solid var(--border-color)' : 'none',
                                    }}
                                    onMouseEnter={(e) => {
                                      if (!isSelected) {
                                        e.currentTarget.style.background = 'var(--bg-secondary)';
                                      }
                                    }}
                                    onMouseLeave={(e) => {
                                      if (!isSelected) {
                                        e.currentTarget.style.background = 'transparent';
                                      }
                                    }}
                                  >
                                    <div 
                                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
                                      style={{ 
                                        background: isSelected ? 'rgba(255,255,255,0.2)' : 'var(--bg-secondary)',
                                        border: isSelected ? 'none' : '1px solid var(--border-color)',
                                      }}
                                    >
                                      <IconComponent 
                                        className="w-5 h-5" 
                                        style={{ color: isSelected ? 'white' : 'var(--accent)' }} 
                                      />
                                    </div>
                                    <span 
                                      className="font-medium text-sm"
                                      style={{ color: isSelected ? 'white' : 'var(--text-primary)' }}
                                    >
                                      {service.label}
                                    </span>
                                    {isSelected && (
                                      <CheckCircle2 className="w-5 h-5 ml-auto text-white" />
                                    )}
                                  </motion.button>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Locations */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                          icon={MapPin}
                          name="pickup"
                          placeholder="Collection Location"
                          value={formData.pickup}
                          onChange={handleChange}
                          focused={focusedField === 'pickup'}
                          onFocus={() => setFocusedField('pickup')}
                          onBlur={() => setFocusedField(null)}
                        />
                        <InputField
                          icon={MapPin}
                          name="delivery"
                          placeholder="Delivery Location"
                          value={formData.delivery}
                          onChange={handleChange}
                          focused={focusedField === 'delivery'}
                          onFocus={() => setFocusedField('delivery')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </div>

                      {/* Size & Date */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                          icon={Package}
                          name="propertySize"
                          placeholder="Property Size / Item Details"
                          value={formData.propertySize}
                          onChange={handleChange}
                          focused={focusedField === 'propertySize'}
                          onFocus={() => setFocusedField('propertySize')}
                          onBlur={() => setFocusedField(null)}
                        />
                        <InputField
                          icon={Calendar}
                          name="preferredDate"
                          type="date"
                          placeholder="Preferred Date"
                          value={formData.preferredDate}
                          onChange={handleChange}
                          focused={focusedField === 'preferredDate'}
                          onFocus={() => setFocusedField('preferredDate')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </div>

                      {/* Message */}
                      <div className="relative">
                        <textarea
                          name="message"
                          placeholder="Additional details about your requirements..."
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full px-5 py-4 rounded-xl resize-none transition-all duration-300 text-base"
                          style={{
                            background: 'var(--bg-secondary)',
                            border: `2px solid ${focusedField === 'message' ? 'var(--accent)' : 'var(--border-color)'}`,
                            color: 'var(--text-primary)',
                            outline: 'none',
                          }}
                        />
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                        className="w-full py-4 rounded-xl text-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3"
                        style={{
                          background: isSubmitting 
                            ? 'var(--text-muted)'
                            : 'linear-gradient(135deg, var(--accent), var(--accent-hover))',
                          boxShadow: isSubmitting ? 'none' : '0 4px 20px rgba(201, 162, 39, 0.3)',
                        }}
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            />
                            Processing...
                          </>
                        ) : (
                          <>
                            Submit Quote Request
                            <Send className="w-5 h-5" />
                          </>
                        )}
                      </motion.button>

                      {/* Alternative Contact */}
                      <div className="text-center pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
                        <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                          Prefer to talk? Reach us directly:
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <a
                            href="tel:+447424399563"
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-105"
                            style={{
                              background: 'var(--bg-secondary)',
                              color: 'var(--text-primary)',
                              border: '1px solid var(--border-color)',
                            }}
                          >
                            <Phone className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                            07424 399563
                          </a>
                          <a
                            href="https://wa.me/447424399563"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-105"
                            style={{
                              background: 'rgba(37, 211, 102, 0.1)',
                              color: '#25D366',
                              border: '1px solid rgba(37, 211, 102, 0.3)',
                            }}
                          >
                            <MessageCircle className="w-4 h-4" />
                            WhatsApp
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map / Coverage Section */}
      <section className="py-20" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              UK-Wide Coverage
            </h2>
            <p 
              className="text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--text-secondary)' }}
            >
              Based in Birmingham, serving the entire United Kingdom. 
              From local moves to long-distance logistics.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl overflow-hidden"
            style={{ 
              border: '1px solid var(--border-color)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
            }}
          >
            <div className="relative h-[400px] md:h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d155426.21999089458!2d-2.0262287!3d52.4862263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870942d1b417173%3A0xca81fef0aeee7998!2sBirmingham%2C%20UK!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="DOM Transport Location"
              />
              
              {/* Overlay Card */}
              <div 
                className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80 p-6 rounded-2xl backdrop-blur-lg"
                style={{ 
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--accent)' }}
                  >
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 
                      className="font-bold text-lg mb-1"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      DOM Transport UK
                    </h4>
                    <p style={{ color: 'var(--text-secondary)' }}>
                      Birmingham, West Midlands
                    </p>
                    <p 
                      className="text-sm mt-1"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      Serving all of the UK
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Input Field Component
interface InputFieldProps {
  icon: React.ElementType;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  focused?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

function InputField({ 
  icon: Icon, 
  name, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  required,
  focused,
  onFocus,
  onBlur,
}: InputFieldProps) {
  return (
    <div className="relative">
      <div 
        className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300"
        style={{ color: focused ? 'var(--accent)' : 'var(--text-muted)' }}
      >
        <Icon className="w-5 h-5" />
      </div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        required={required}
        className="w-full pl-12 pr-5 py-4 rounded-xl transition-all duration-300 text-base"
        style={{
          background: 'var(--bg-secondary)',
          border: `2px solid ${focused ? 'var(--accent)' : 'var(--border-color)'}`,
          color: 'var(--text-primary)',
          outline: 'none',
        }}
      />
    </div>
  );
}
