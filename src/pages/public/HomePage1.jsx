import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import {
  Search,
  Shield,
  Clock,
  Star,
  MapPin,
  Calendar,
  ChevronRight,
  Award,
  Headphones,
  Key,
  Users,
  ArrowRight,
  Play,
  Zap,
  Sparkles,
  HardHat,
  Truck,
  Factory,
  Drill,
  Gauge,
  Fuel,
  Camera,
  Wifi,
  Battery,
  Coffee,
  Luggage,
  Snowflake,
  TrendingUp,
  CheckCircle,
  ArrowUp,
  Briefcase,
  Building,
  Target,
  ThumbsUp
} from 'lucide-react';

const HomePage = () => {
  const [featuredEquipment, setFeaturedEquipment] = useState([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const heroRef = React.useRef(null);

  // Equipment categories based on client's actual offerings
  const equipmentCategories = [
    { icon: HardHat, name: 'Chen Excavator (Shovel)', count: 24, color: '#F97316' },
    { icon: HardHat, name: 'Chen Excavator (Hammer)', count: 18, color: '#F97316' },
    { icon: Truck, name: 'Wheel Loader', count: 32, color: '#3B82F6' },
    { icon: Truck, name: 'Backhoe Loader', count: 15, color: '#10B981' },
    { icon: Factory, name: 'Bulldozer', count: 12, color: '#F59E0B' },
    { icon: Gauge, name: 'Motor Grader', count: 8, color: '#8B5CF6' },
    { icon: Truck, name: 'Wheeled Excavator', count: 10, color: '#F97316' },
    { icon: Truck, name: 'Mobile Crane', count: 6, color: '#EF4444' },
    { icon: Truck, name: 'Water Truck Auto', count: 14, color: '#3B82F6' },
    { icon: Truck, name: 'Water Truck Manual', count: 11, color: '#3B82F6' },
    { icon: Truck, name: 'Road Roller', count: 9, color: '#F59E0B' },
    { icon: Truck, name: 'Cargo Truck', count: 25, color: '#10B981' },
    { icon: Truck, name: 'Sinotruck', count: 20, color: '#EF4444' },
    { icon: Truck, name: 'Lowbed Trailer', count: 7, color: '#8B5CF6' },
    { icon: Truck, name: 'Dump Truck', count: 13, color: '#F97316' },
    { icon: Truck, name: 'Soil Compactor', count: 5, color: '#F59E0B' },
    { icon: Truck, name: '4x4 Pickup', count: 30, color: '#3B82F6' },
    { icon: Truck, name: 'Tipper 10 wheeler', count: 16, color: '#10B981' },
    { icon: Truck, name: 'Tipper 6 wheeler', count: 14, color: '#10B981' },
    { icon: Truck, name: 'Gypsum Transporter', count: 4, color: '#8B5CF6' },
    { icon: Truck, name: 'Trazon Truck', count: 8, color: '#F97316' },
    { icon: Truck, name: 'Atena 8 wheeler', count: 6, color: '#EF4444' },
    { icon: Truck, name: 'Atena 10 wheeler', count: 5, color: '#EF4444' }
  ];

  // Stats data
  const [counters, setCounters] = useState({
    equipment: 0,
    owners: 0,
    rentals: 0,
    customers: 0
  });

  // Animated counters
  useEffect(() => {
    const targets = {
      equipment: 312,
      owners: 156,
      rentals: 2847,
      customers: 8950
    };
    
    const duration = 2000;
    const stepTime = 20;
    const steps = duration / stepTime;
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setCounters({
        equipment: Math.min(Math.floor(targets.equipment * progress), targets.equipment),
        owners: Math.min(Math.floor(targets.owners * progress), targets.owners),
        rentals: Math.min(Math.floor(targets.rentals * progress), targets.rentals),
        customers: Math.min(Math.floor(targets.customers * progress), targets.customers)
      });
      
      if (currentStep >= steps) clearInterval(interval);
    }, stepTime);
    
    return () => clearInterval(interval);
  }, []);

  // Scroll to top
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Mouse move effect for hero
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        setMouseX((e.clientX - centerX) / 30);
        setMouseY((e.clientY - centerY) / 30);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Featured equipment data
  useEffect(() => {
    const mockEquipment = [
      {
        id: 1,
        name: 'CAT 320D Excavator',
        brand: 'Caterpillar',
        dailyRate: 8500,
        rating: 4.9,
        reviews: 124,
        image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600',
        location: 'Addis Ababa',
        type: 'Excavator',
        owner: 'Habtamu Construction PLC',
        featured: true
      },
      {
        id: 2,
        name: 'Komatsu D65EX-16',
        brand: 'Komatsu',
        dailyRate: 9500,
        rating: 4.8,
        reviews: 89,
        image: 'https://images.unsplash.com/photo-1581092335871-4e2e5b2b5c1f?w=600',
        location: 'Dire Dawa',
        type: 'Bulldozer',
        owner: 'Mesfin Industrial',
        featured: true
      },
      {
        id: 3,
        name: 'XCMG LW500KN',
        brand: 'XCMG',
        dailyRate: 7200,
        rating: 4.7,
        reviews: 67,
        image: 'https://images.unsplash.com/photo-1581092335871-4e2e5b2b5c1f?w=600',
        location: 'Hawassa',
        type: 'Wheel Loader',
        owner: 'Southern Equipment',
        featured: true
      },
      {
        id: 4,
        name: 'Hitachi ZX210',
        brand: 'Hitachi',
        dailyRate: 7800,
        rating: 4.8,
        reviews: 92,
        image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600',
        location: 'Adama',
        type: 'Excavator',
        owner: 'Oromia Construction',
        featured: false
      }
    ];
    setFeaturedEquipment(mockEquipment);
  }, []);

  return (
    <div className="bg-white">
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg transition-all duration-300"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Hero Section - Modern & Attractive */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50"
      >
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full blur-3xl opacity-30 animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-200 rounded-full blur-3xl opacity-30 animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-100 rounded-full blur-3xl opacity-20" />
        </div>

        {/* Floating Icons Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 text-orange-200"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <HardHat size={60} />
          </motion.div>
          <motion.div
            className="absolute bottom-32 right-20 text-amber-200"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 7, repeat: Infinity }}
          >
            <Truck size={70} />
          </motion.div>
          <motion.div
            className="absolute top-1/3 right-40 text-orange-200"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <Factory size={50} />
          </motion.div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white shadow-lg px-4 py-2 rounded-full mb-6 border border-orange-100"
          >
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-semibold text-orange-600">Ethiopia's #1 Equipment Rental Platform</span>
          </motion.div>

          {/* Main Title with 3D Effect */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              transform: `perspective(1000px) rotateX(${mouseY * 0.2}deg) rotateY(${mouseX * 0.2}deg)`
            }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Rent Heavy Equipment
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              For Your Project
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
          >
            Connect with 150+ trusted equipment owners. Get competitive rates on excavators, 
            loaders, bulldozers, and 300+ heavy equipment across Ethiopia.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16"
          >
            <Link to="/search">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                Browse Equipment
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link to="/register-owner">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
              >
                List Your Equipment
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 pt-8 border-t border-gray-100"
          >
            {[
              { icon: Shield, label: 'Verified Owners', value: '100%' },
              { icon: Clock, label: 'Quick Response', value: '< 2hrs' },
              { icon: Star, label: 'Customer Rating', value: '4.9/5' },
              { icon: Users, label: 'Happy Customers', value: '8,950+' }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-orange-500" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-900">{item.value}</p>
                  <p className="text-xs text-gray-500">{item.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-orange-400 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-orange-400 rounded-full mt-2 animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Truck, value: counters.equipment, label: 'Equipment Available', suffix: '+' },
              { icon: Users, value: counters.owners, label: 'Equipment Owners', suffix: '+' },
              { icon: Calendar, value: counters.rentals, label: 'Successful Rentals', suffix: '+' },
              { icon: MapPin, value: 25, label: 'Cities Covered', suffix: '+' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-7 h-7 text-orange-500" />
                </div>
                <p className="text-3xl md:text-4xl font-bold text-gray-900">
                  {stat.value.toLocaleString()}{stat.suffix}
                </p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Browse by Equipment Type
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find the perfect equipment for your construction project from our extensive fleet
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {equipmentCategories.slice(0, 15).map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-4 text-center cursor-pointer group shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-orange-500 transition-colors duration-300">
                  <category.icon className="w-7 h-7 text-orange-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-400">{category.count} available</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/categories">
              <button className="text-orange-500 font-semibold hover:text-orange-600 inline-flex items-center gap-1">
                View All Categories <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Simple 3-step process to get the equipment you need
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: Search, title: 'Search Equipment', desc: 'Browse our catalog of 300+ heavy equipment by type, location, or price', color: '#F97316' },
              { step: '02', icon: Calendar, title: 'Book & Confirm', desc: 'Select your dates, submit request, and get instant confirmation', color: '#F59E0B' },
              { step: '03', icon: Truck, title: 'Get Delivered', desc: 'Equipment delivered to your site with operator if needed', color: '#10B981' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/3 -right-4 w-8 h-0.5 bg-orange-200" />
                )}
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-24 h-24 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                      <item.icon className="w-10 h-10 text-orange-500" />
                    </div>
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Equipment */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-center mb-12 flex-wrap gap-4"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Featured Equipment
              </h2>
              <p className="text-gray-600">Most popular equipment on our platform</p>
            </div>
            <Link to="/search">
              <button className="text-orange-500 font-semibold hover:text-orange-600 inline-flex items-center gap-1 border border-orange-300 px-4 py-2 rounded-lg hover:bg-orange-50 transition">
                View All <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredEquipment.map((equipment, index) => (
              <motion.div
                key={equipment.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={equipment.image}
                    alt={equipment.name}
                    className="w-full h-full object-cover hover:scale-110 transition duration-500"
                  />
                  {equipment.featured && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <div className="flex items-center gap-1 bg-white/95 backdrop-blur px-2 py-1 rounded-full shadow-sm">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-semibold">{equipment.rating}</span>
                      <span className="text-xs text-gray-400">({equipment.reviews})</span>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900">{equipment.name}</h3>
                      <p className="text-xs text-gray-400">{equipment.brand}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-orange-500">ETB {equipment.dailyRate.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">per day</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{equipment.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <HardHat className="w-3 h-3" />
                      <span>{equipment.type}</span>
                    </div>
                  </div>

                  <Link to={`/equipment/${equipment.id}`}>
                    <button className="w-full bg-gray-900 hover:bg-orange-500 text-white py-2.5 rounded-xl font-semibold text-sm transition-all duration-300">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2 inline" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best equipment rental experience in Ethiopia
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Verified Owners', desc: 'All equipment owners are thoroughly verified', color: '#F97316' },
              { icon: Clock, title: '24/7 Support', desc: 'Round-the-clock customer support', color: '#F59E0B' },
              { icon: TrendingUp, title: 'Best Rates', desc: 'Competitive prices from multiple owners', color: '#10B981' },
              { icon: CheckCircle, title: 'Quality Assured', desc: 'Well-maintained equipment guaranteed', color: '#3B82F6' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500 transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600">
              Trusted by contractors and construction companies across Ethiopia
            </p>
          </motion.div>

          <div className="relative">
            <div className="overflow-hidden">
              <motion.div
                className="flex"
                animate={{ x: `-${activeTestimonial * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {[
                  {
                    name: 'Abebe Bekele',
                    role: 'Construction Manager',
                    rating: 5,
                    text: 'Excellent service! Found the excavator I needed within hours. The equipment was in perfect condition and delivered on time.',
                    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
                  },
                  {
                    name: 'Tigist Haile',
                    role: 'Project Director',
                    rating: 5,
                    text: 'The platform is very easy to use. I\'ve rented multiple equipment and always had a great experience. Customer support is fantastic.',
                    avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
                  },
                  {
                    name: 'Dawit Mamo',
                    role: 'General Contractor',
                    rating: 4,
                    text: 'Competitive prices and well-maintained equipment. Will definitely use again for future projects.',
                    avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
                  }
                ].map((testimonial, idx) => (
                  <div key={idx} className="w-full flex-shrink-0 px-4 md:px-8">
                    <div className="bg-white rounded-2xl p-8 shadow-sm">
                      <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-200'}`} />
                        ))}
                      </div>
                      <p className="text-gray-600 text-center mb-6 leading-relaxed">"{testimonial.text}"</p>
                      <div className="flex items-center justify-center gap-4">
                        <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                        <div>
                          <p className="font-bold text-gray-900">{testimonial.name}</p>
                          <p className="text-sm text-gray-500">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    activeTestimonial === idx ? 'w-8 bg-orange-500 h-2' : 'w-2 h-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600" />
        <div className="absolute inset-0 bg-[url(\"data:image/svg+xml,%3Csvg%20width%3D'60'%20height%3D'60'%20viewBox%3D'0%200%2060%2060'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%3E%3Cg%20fill%3D'none'%20fill-rule%3D'evenodd'%3E%3Cg%20fill%3D'%23ffffff'%20fill-opacity%3D'0.05'%3E%3Cpath%20d%3D'M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z'%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2FSvg%3E\")] opacity-10" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join 8,950+ satisfied customers who trust us for their equipment needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/search">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-orange-600 hover:bg-gray-100 px-10 py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300"
                >
                  Find Equipment Now
                  <ArrowRight className="w-5 h-5 ml-2 inline" />
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white hover:bg-white/10 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300"
                >
                  Contact Our Team
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
