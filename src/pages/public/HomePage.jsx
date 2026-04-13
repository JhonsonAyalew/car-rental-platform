import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
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
  Snowflake
} from 'lucide-react';

import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation(['common', 'home']);

  const [featuredEquipment, setFeaturedEquipment] = useState([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  // Animated counter stats
  const [counters, setCounters] = useState({
    customers: 0,
    equipment: 0,
    cities: 0,
    support: 0
  });

  // Parallax effect for hero
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [30, -30]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-30, 30]), { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = document.getElementById('hero-section')?.getBoundingClientRect();
      if (rect) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        setMouseX((e.clientX - centerX) / 20);
        setMouseY((e.clientY - centerY) / 20);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animated counter effect
  useEffect(() => {
    const targetCustomers = 15000;
    const targetEquipment = 850;
    const targetCities = 120;
    const targetSupport = 24;
   
    const duration = 2000;
    const stepTime = 20;
    const steps = duration / stepTime;
   
    let currentStep = 0;
   
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
     
      setCounters({
        customers: Math.min(Math.floor(targetCustomers * progress), targetCustomers),
        equipment: Math.min(Math.floor(targetEquipment * progress), targetEquipment),
        cities: Math.min(Math.floor(targetCities * progress), targetCities),
        support: Math.min(Math.floor(targetSupport * progress), targetSupport)
      });
     
      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, stepTime);
   
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Mock featured construction equipment
    const mockFeaturedEquipment = [
      {
        id: 1,
        name: 'CAT 320 Excavator',
        brand: 'Caterpillar',
        price: 8500,
        hourlyRate: 1200,
        rating: 4.9,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhjQijEXK7zvAaspMZUERi3MJLmK1KmNYLE-iqM0GhRA&s=10',
        location: 'Addis Ababa, Ethiopia',
        type: 'Excavator',
        attachment: 'Shovel',
        weight: '20 tons',
        featured: true,
      },
      {
        id: 2,
        name: 'SANY SY335 Excavator',
        brand: 'SANY',
        price: 7800,
        hourlyRate: 1100,
        rating: 4.8,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhy9e8Ce4B33NOhAnf_ud0B5zuPhrjAM2-KPBjUKse80lSJawCfdlH9JBi&s=10',
        location: 'Dire Dawa, Ethiopia',
        type: 'Excavator',
        attachment: 'Hammer',
        weight: '33 tons',
        featured: true,
      },
      {
        id: 3,
        name: 'CAT 950 Wheel Loader',
        brand: 'Caterpillar',
        price: 7200,
        hourlyRate: 1000,
        rating: 4.9,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-CZdvnsdrhfl0HNQByq1RFe_nZLOoxwAf8BrvtjhBqw&s=10',
        location: 'Hawassa, Ethiopia',
        type: 'Loader',
        attachment: 'Bucket',
        weight: '25 tons',
        featured: true,
      },
      {
        id: 4,
        name: 'CAT 430 Backhoe Loader',
        brand: 'Caterpillar',
        price: 5500,
        hourlyRate: 800,
        rating: 4.7,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLFwNhYDEf8xKGGY6s92m03WMHpeFLneV6V2EbC9m9BQ&s',
        location: 'Mekelle, Ethiopia',
        type: 'Backhoe Loader',
        attachment: 'Bucket + Backhoe',
        weight: '9 tons',
        featured: false,
      },
      {
        id: 5,
        name: 'Komatsu D65 Bulldozer',
        brand: 'Komatsu',
        price: 9000,
        hourlyRate: 1300,
        rating: 4.8,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUq4zeRFFgxFYxHOghAjsGZqz6HB7MARd79lpTU5JDwQ&s=10',
        location: 'Adama, Ethiopia',
        type: 'Bulldozer',
        attachment: 'Blade',
        weight: '22 tons',
        featured: true,
      },
      {
        id: 6,
        name: 'CAT 140M Motor Grader',
        brand: 'Caterpillar',
        price: 8000,
        hourlyRate: 1150,
        rating: 4.8,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6U-WSl2JQr17KXXFcrdCV_WDoiCgiN1tmcJT5BKCDSQ&s=10',
        location: 'Bahir Dar, Ethiopia',
        type: 'Grader',
        attachment: 'Blade',
        weight: '15 tons',
        featured: false,
      }
    ];
    setFeaturedEquipment(mockFeaturedEquipment);

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Stats array with translations
  const stats = [
    { value: counters.customers.toLocaleString() + '+', label: t('stats.customers', { ns: 'home' }), icon: Users },
    { value: counters.equipment + '+', label: t('stats.equipment', { ns: 'home' }), icon: Truck },
    { value: counters.cities + '+', label: t('stats.cities', { ns: 'home' }), icon: MapPin },
    { value: counters.support + '/7', label: t('stats.support', { ns: 'home' }), icon: Headphones }
  ];

  // Equipment categories with translations
  const equipmentCategories = [
    { 
      icon: HardHat, 
      title: t('categories.excavators.title', { ns: 'home' }), 
      desc: t('categories.excavators.desc', { ns: 'home' }), 
      color: '#D97706', 
      count: t('categories.excavators.count', { ns: 'home' }) 
    },
    { 
      icon: Truck, 
      title: t('categories.loaders.title', { ns: 'home' }), 
      desc: t('categories.loaders.desc', { ns: 'home' }), 
      color: '#10B981', 
      count: t('categories.loaders.count', { ns: 'home' }) 
    },
    { 
      icon: Factory, 
      title: t('categories.bulldozers.title', { ns: 'home' }), 
      desc: t('categories.bulldozers.desc', { ns: 'home' }), 
      color: '#3B82F6', 
      count: t('categories.bulldozers.count', { ns: 'home' }) 
    },
    { 
      icon: Drill, 
      title: t('categories.graders.title', { ns: 'home' }), 
      desc: t('categories.graders.desc', { ns: 'home' }), 
      color: '#F59E0B', 
      count: t('categories.graders.count', { ns: 'home' }) 
    },
    { 
      icon: Gauge, 
      title: t('categories.rollers.title', { ns: 'home' }), 
      desc: t('categories.rollers.desc', { ns: 'home' }), 
      color: '#EF4444', 
      count: t('categories.rollers.count', { ns: 'home' }) 
    },
    { 
      icon: Truck, 
      title: t('categories.dumpTrucks.title', { ns: 'home' }), 
      desc: t('categories.dumpTrucks.desc', { ns: 'home' }), 
      color: '#06B6D4', 
      count: t('categories.dumpTrucks.count', { ns: 'home' }) 
    },
    { 
      icon: Fuel, 
      title: t('categories.waterTrucks.title', { ns: 'home' }), 
      desc: t('categories.waterTrucks.desc', { ns: 'home' }), 
      color: '#84CC16', 
      count: t('categories.waterTrucks.count', { ns: 'home' }) 
    }
  ];

  // Features array with translations
  const features = [
    { 
      icon: Shield, 
      title: t('features.secure.title', { ns: 'home' }), 
      desc: t('features.secure.desc', { ns: 'home' }), 
      color: '#D97706' 
    },
    { 
      icon: Clock, 
      title: t('features.support.title', { ns: 'home' }), 
      desc: t('features.support.desc', { ns: 'home' }), 
      color: '#10B981' 
    },
    { 
      icon: Truck, 
      title: t('features.heavyEquipment.title', { ns: 'home' }), 
      desc: t('features.heavyEquipment.desc', { ns: 'home' }), 
      color: '#3B82F6' 
    },
    { 
      icon: Award, 
      title: t('features.bestPrices.title', { ns: 'home' }), 
      desc: t('features.bestPrices.desc', { ns: 'home' }), 
      color: '#8B5CF6' 
    },
    { 
      icon: Zap, 
      title: t('features.instantBooking.title', { ns: 'home' }), 
      desc: t('features.instantBooking.desc', { ns: 'home' }), 
      color: '#F59E0B' 
    },
    { 
      icon: Shield, 
      title: t('features.fullInsurance.title', { ns: 'home' }), 
      desc: t('features.fullInsurance.desc', { ns: 'home' }), 
      color: '#EF4444' 
    }
  ];

  // How it works steps with translations
  const howItWorks = [
    { 
      step: '01', 
      icon: Search, 
      title: t('howItWorks.step1.title', { ns: 'home' }), 
      desc: t('howItWorks.step1.desc', { ns: 'home' }) 
    },
    { 
      step: '02', 
      icon: Calendar, 
      title: t('howItWorks.step2.title', { ns: 'home' }), 
      desc: t('howItWorks.step2.desc', { ns: 'home' }) 
    },
    { 
      step: '03', 
      icon: Key, 
      title: t('howItWorks.step3.title', { ns: 'home' }), 
      desc: t('howItWorks.step3.desc', { ns: 'home' }) 
    }
  ];

  // Perks array with translations
  const perks = [
    { 
      icon: Camera, 
      title: t('perks.freeCancellation.title', { ns: 'home' }), 
      desc: t('perks.freeCancellation.desc', { ns: 'home' }) 
    },
    { 
      icon: Wifi, 
      title: t('perks.operatorAvailable.title', { ns: 'home' }), 
      desc: t('perks.operatorAvailable.desc', { ns: 'home' }) 
    },
    { 
      icon: Battery, 
      title: t('perks.support247.title', { ns: 'home' }), 
      desc: t('perks.support247.desc', { ns: 'home' }) 
    },
    { 
      icon: Coffee, 
      title: t('perks.fuelIncluded.title', { ns: 'home' }), 
      desc: t('perks.fuelIncluded.desc', { ns: 'home' }) 
    },
    { 
      icon: Luggage, 
      title: t('perks.maintenance.title', { ns: 'home' }), 
      desc: t('perks.maintenance.desc', { ns: 'home' }) 
    },
    { 
      icon: Snowflake, 
      title: t('perks.insurance.title', { ns: 'home' }), 
      desc: t('perks.insurance.desc', { ns: 'home' }) 
    }
  ];

  // Testimonials array with translations
  const testimonials = [
    { 
      name: t('testimonials.testimonial1.name', { ns: 'home' }), 
      role: t('testimonials.testimonial1.role', { ns: 'home' }), 
      rating: 5, 
      text: t('testimonials.testimonial1.text', { ns: 'home' }), 
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg' 
    },
    { 
      name: t('testimonials.testimonial2.name', { ns: 'home' }), 
      role: t('testimonials.testimonial2.role', { ns: 'home' }), 
      rating: 5, 
      text: t('testimonials.testimonial2.text', { ns: 'home' }), 
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg' 
    },
    { 
      name: t('testimonials.testimonial3.name', { ns: 'home' }), 
      role: t('testimonials.testimonial3.role', { ns: 'home' }), 
      rating: 4, 
      text: t('testimonials.testimonial3.text', { ns: 'home' }), 
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg' 
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section id="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#D97706]/5 via-[#FEF3C7]/10 to-transparent" />
       
        {/* Animated Blobs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-[#D97706]/20 rounded-full blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#FEF3C7] rounded-full blur-3xl"
          animate={{ x: [0, -80, 0], y: [0, -60, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
       
        {/* Floating Equipment Background */}
        <motion.div
          className="absolute top-1/4 right-10 opacity-10"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <Truck size={120} className="text-[#D97706]" />
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 left-10 opacity-10"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
        >
          <HardHat size={100} className="text-[#D97706]" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-soft mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#D97706]" />
            <span className="text-sm font-medium text-[#1A1A1A]">{t('hero.badge', { ns: 'home' })}</span>
          </motion.div>

          {/* Main Title with 3D Effect */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              transform: `perspective(1000px) rotateX(${mouseY * 0.5}deg) rotateY(${mouseX * 0.5}deg)`,
            }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#1A1A1A] mb-6 leading-tight"
          >
            {t('hero.title', { ns: 'home' })}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#D97706] to-[#B45309]">
              {t('hero.titleHighlight', { ns: 'home' })}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-[#52525B] mb-8 max-w-2xl mx-auto"
          >
            {t('hero.subtitle', { ns: 'home' })}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/search">
              <Button size="lg" className="group relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  {t('hero.browseButton', { ns: 'home' })}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#D97706] to-[#B45309] opacity-0 group-hover:opacity-100 transition" />
              </Button>
            </Link>
            <Button variant="secondary" size="lg" className="group">
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition" />
              {t('hero.watchDemo', { ns: 'home' })}
            </Button>
          </motion.div>

          {/* Stats Section with Animated Counters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-8 border-t border-[#E4E4E7]"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <stat.icon className="w-5 h-5 text-[#D97706]" />
                  <p className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">
                    {stat.value}
                  </p>
                </div>
                <p className="text-sm text-[#52525B]">{stat.label}</p>
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
          <div className="w-6 h-10 border-2 border-[#D97706] rounded-full flex justify-center">
            <div className="w-1 h-2 bg-[#D97706] rounded-full mt-2 animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* Equipment Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
              {t('categories.title', { ns: 'home' })}
            </h2>
            <p className="text-lg text-[#52525B] max-w-2xl mx-auto">
              {t('categories.subtitle', { ns: 'home' })}
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {equipmentCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:shadow-xl transition-all h-full cursor-pointer">
                  <div className="text-center">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all group-hover:scale-110"
                      style={{ backgroundColor: `${category.color}15` }}
                    >
                      <category.icon className="w-8 h-8" style={{ color: category.color }} />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{category.title}</h3>
                    <p className="text-sm text-[#52525B] mb-2">{category.desc}</p>
                    <p className="text-xs text-[#D97706] font-medium">{category.count}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-[#F9F8F6] to-[#FEF3C7]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
              {t('features.title', { ns: 'home' })}
            </h2>
            <p className="text-lg text-[#52525B] max-w-2xl mx-auto">
              {t('features.subtitle', { ns: 'home' })}
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:shadow-xl transition-all h-full">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center transition-all group-hover:scale-110"
                      style={{ backgroundColor: `${feature.color}15` }}
                    >
                      <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                      <p className="text-sm text-[#52525B]">{feature.desc}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
              {t('howItWorks.title', { ns: 'home' })}
            </h2>
            <p className="text-lg text-[#52525B]">
              {t('howItWorks.subtitle', { ns: 'home' })}
            </p>
          </motion.div>
          <div className="relative">
            <div className="hidden lg:block absolute top-1/3 left-0 right-0 h-0.5 bg-gradient-to-r from-[#D97706]/20 via-[#D97706] to-[#D97706]/20" />
           
            <div className="grid md:grid-cols-3 gap-8 relative">
              {howItWorks.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="text-center">
                    <div className="relative inline-block mb-6">
                      <div className="w-24 h-24 rounded-full bg-white shadow-soft flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                        <item.icon className="w-10 h-10 text-[#D97706]" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#D97706] text-white flex items-center justify-center text-sm font-bold">
                        {item.step}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-[#52525B]">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Equipment Section */}
      <section className="py-20 bg-gradient-to-br from-[#F9F8F6] to-[#FEF3C7]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-center mb-12"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">
                {t('featured.title', { ns: 'home' })}
              </h2>
              <p className="text-lg text-[#52525B]">
                {t('featured.subtitle', { ns: 'home' })}
              </p>
            </div>
            <Link to="/search">
              <Button variant="ghost" className="group">
                {t('featured.viewAll', { ns: 'home' })}
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition" />
              </Button>
            </Link>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEquipment.map((equipment, index) => (
              <motion.div
                key={equipment.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-56 overflow-hidden bg-[#F3F2EE]">
                    <img
                      src={equipment.image}
                      alt={equipment.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition" />
                    <div className="absolute top-2 right-2">
                      <div className="flex items-center gap-1 bg-white/90 backdrop-blur px-2 py-1 rounded-full">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs font-medium">{equipment.rating}</span>
                      </div>
                    </div>
                    {equipment.featured && (
                      <div className="absolute top-2 left-2">
                        <div className="bg-[#D97706] text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          {t('featured.featured', { ns: 'home' })}
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2">
                      <div className="bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                        {equipment.type} • {equipment.attachment}
                      </div>
                    </div>
                  </div>
                 
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{equipment.name}</h3>
                        <p className="text-sm text-[#52525B]">{equipment.brand} • {equipment.weight}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-[#D97706]">ETB {equipment.price}</p>
                        <p className="text-xs text-[#A1A1AA]">{t('perDay', { ns: 'common' })}</p>
                        <p className="text-xs text-[#10B981]">
                          {t('or', { ns: 'home' })} ETB {equipment.hourlyRate}/{t('perHour', { ns: 'common' })}
                        </p>
                      </div>
                    </div>
                   
                    <div className="flex items-center gap-3 text-sm text-[#52525B] mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span className="text-xs">{equipment.location.split(',')[0]}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <HardHat className="w-3 h-3" />
                        <span className="text-xs">{equipment.type}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Gauge className="w-3 h-3" />
                        <span className="text-xs">{equipment.weight}</span>
                      </div>
                    </div>
                   
                    <Link to={`/equipment/${equipment.id}`}>
                      <Button className="w-full group-hover:bg-[#B45309] transition">
                        {t('featured.viewDetails', { ns: 'home' })}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks & Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-[#D97706] to-[#B45309] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('perks.title', { ns: 'home' })}
            </h2>
            <p className="text-lg opacity-90">
              {t('perks.subtitle', { ns: 'home' })}
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((perk, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4"
              >
                <perk.icon className="w-5 h-5" />
                <div>
                  <p className="font-semibold">{perk.title}</p>
                  <p className="text-sm opacity-80">{perk.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
              {t('testimonials.title', { ns: 'home' })}
            </h2>
            <p className="text-lg text-[#52525B]">
              {t('testimonials.subtitle', { ns: 'home' })}
            </p>
          </motion.div>
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <motion.div
                className="flex transition-transform duration-500 ease-out"
                animate={{ x: `-${activeTestimonial * 100}%` }}
              >
                {testimonials.map((testimonial, idx) => (
                  <div key={idx} className="w-full flex-shrink-0 px-4">
                    <Card className="text-center p-8">
                      <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-[#E4E4E7]'}`} 
                          />
                        ))}
                      </div>
                      <p className="text-[#52525B] text-lg mb-6">"{testimonial.text}"</p>
                      <div className="flex items-center justify-center gap-4">
                        <img src={testimonial.avatar} alt={testimonial.name} className="w-14 h-14 rounded-full" />
                        <div className="text-left">
                          <p className="font-semibold text-lg">{testimonial.name}</p>
                          <p className="text-sm text-[#A1A1AA]">{testimonial.role}</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </motion.div>
            </div>
            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeTestimonial === idx ? 'w-8 bg-[#D97706]' : 'bg-[#E4E4E7]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1600"
            alt="Construction Site"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#D97706]/90 to-[#B45309]/90" />
        </div>
       
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {t('cta.title', { ns: 'home' })}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {t('cta.subtitle', { ns: 'home' })}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/search">
                <Button size="lg" className="bg-white text-[#D97706] hover:bg-gray-100 group">
                  {t('cta.browseButton', { ns: 'home' })}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition" />
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="secondary" className="bg-transparent border-white text-white hover:bg-white/10">
                  {t('cta.listButton', { ns: 'home' })}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
