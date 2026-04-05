import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import {
  Search,
  Car,
  Shield,
  Clock,
  Star,
  MapPin,
  Calendar,
  DollarSign,
  ChevronRight,
  TrendingUp,
  Award,
  Headphones,
  Key,
  Fuel,
  Users,
  Settings,
  ArrowRight,
  Play,
  CheckCircle,
  Zap,
  Sparkles,
  Globe,
  Heart,
  Share2,
  Camera,
  Navigation,
  Battery,
  Wifi,
  Coffee,
  Luggage,
  Snowflake,
  Phone
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const HomePage = () => {
  const { t } = useTranslation();
  const [featuredCars, setFeaturedCars] = useState([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

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

  useEffect(() => {
    // Mock featured cars
    const mockFeaturedCars = [
      {
        id: 1,
        name: 'Tesla Model 3',
        brand: 'Tesla',
        price: 120,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=500',
        location: 'Los Angeles, CA',
        transmission: 'Automatic',
        seats: 5,
        fuelType: 'Electric',
        year: 2023,
        featured: true
      },
      {
        id: 2,
        name: 'BMW X5',
        brand: 'BMW',
        price: 150,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500',
        location: 'New York, NY',
        transmission: 'Automatic',
        seats: 5,
        fuelType: 'Petrol',
        year: 2023,
        featured: true
      },
      {
        id: 3,
        name: 'Mercedes C-Class',
        brand: 'Mercedes',
        price: 110,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=500',
        location: 'Miami, FL',
        transmission: 'Automatic',
        seats: 5,
        fuelType: 'Petrol',
        year: 2022,
        featured: true
      },
      {
        id: 4,
        name: 'Toyota Camry',
        brand: 'Toyota',
        price: 65,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500',
        location: 'Chicago, IL',
        transmission: 'Automatic',
        seats: 5,
        fuelType: 'Hybrid',
        year: 2022,
        featured: true
      }
    ];
    setFeaturedCars(mockFeaturedCars);

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { value: '10K+', label: 'Happy Customers', icon: Users },
    { value: '500+', label: 'Luxury Cars', icon: Car },
    { value: '50+', label: 'Cities', icon: MapPin },
    { value: '24/7', label: 'Support', icon: Headphones }
  ];

  const features = [
    { icon: Shield, title: 'Secure Booking', desc: 'Your payments and data are fully protected', color: '#D97706' },
    { icon: Clock, title: '24/7 Support', desc: 'Round-the-clock customer assistance', color: '#10B981' },
    { icon: Car, title: 'Wide Selection', desc: 'Choose from thousands of verified cars', color: '#3B82F6' },
    { icon: Award, title: 'Best Prices', desc: 'Competitive rates with no hidden fees', color: '#8B5CF6' },
    { icon: Zap, title: 'Instant Booking', desc: 'Get confirmed instantly', color: '#F59E0B' },
    { icon: Shield, title: 'Full Insurance', desc: 'Comprehensive coverage included', color: '#EF4444' }
  ];

  const howItWorks = [
    { step: '01', icon: Search, title: 'Search', desc: 'Find your perfect car by location, date, and preferences' },
    { step: '02', icon: Calendar, title: 'Book', desc: 'Select your dates and complete the secure booking' },
    { step: '03', icon: Key, title: 'Drive', desc: 'Pick up the car and enjoy your journey' }
  ];

  const perks = [
    { icon: Camera, title: 'Free Cancellation', desc: 'Up to 24 hours before pickup' },
    { icon: Wifi, title: 'WiFi Hotspot', desc: 'Stay connected on the go' },
    { icon: Battery, title: '24/7 Roadside', desc: 'Emergency assistance anytime' },
    { icon: Coffee, title: 'Free Coffee', desc: 'At all pickup locations' },
    { icon: Luggage, title: 'Extra Luggage', desc: 'No additional fees' },
    { icon: Snowflake, title: 'Climate Control', desc: 'Heated/Cooled seats' }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section - Redesigned without search card */}
      <section id="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#D97706]/5 via-[#FEF3C7]/10 to-transparent" />
        
        {/* Animated Blobs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-[#D97706]/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#FEF3C7] rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Floating Cars Background */}
        <motion.div
          className="absolute top-1/4 right-10 opacity-10"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <Car size={120} className="text-[#D97706]" />
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 left-10 opacity-10"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
        >
          <Car size={100} className="text-[#D97706]" />
        </motion.div>

        {/* Language Switcher - Top Right */}
        <div className="absolute top-6 right-6 z-50">
          <LanguageSwitcher />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-soft mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#D97706]" />
            <span className="text-sm font-medium text-[#1A1A1A]">Trusted by 10,000+ customers</span>
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
            Find Your Perfect
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#D97706] to-[#B45309]">
              Dream Ride
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-[#52525B] mb-8 max-w-2xl mx-auto"
          >
            Experience luxury and convenience with our premium car rental service. 
            Choose from hundreds of vehicles and drive away with confidence.
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
                  Browse Cars
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#D97706] to-[#B45309] opacity-0 group-hover:opacity-100 transition" />
              </Button>
            </Link>
            <Button variant="secondary" size="lg" className="group">
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats Section */}
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
                  <p className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">{stat.value}</p>
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

      {/* Features Section with Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
              Why Choose Us?
            </h2>
            <p className="text-lg text-[#52525B] max-w-2xl mx-auto">
              Experience the best car rental service with our premium features
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
                <Card className="group hover:shadow-medium transition-all h-full">
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

      {/* How It Works - Interactive Timeline */}
      <section className="py-20 bg-gradient-to-br from-[#F9F8F6] to-[#FEF3C7]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
              How It Works
            </h2>
            <p className="text-lg text-[#52525B]">
              Rent a car in three simple steps
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
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

      {/* Featured Cars Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-center mb-12"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">
                Featured Cars
              </h2>
              <p className="text-lg text-[#52525B]">
                Most popular choices this week
              </p>
            </div>
            <Link to="/search">
              <Button variant="ghost" className="group">
                View All
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={car.image} 
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition" />
                    <div className="absolute top-2 right-2">
                      <div className="flex items-center gap-1 bg-white/90 backdrop-blur px-2 py-1 rounded-full">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs font-medium">{car.rating}</span>
                      </div>
                    </div>
                    {car.featured && (
                      <div className="absolute top-2 left-2">
                        <div className="bg-[#D97706] text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Featured
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{car.name}</h3>
                        <p className="text-sm text-[#52525B]">{car.year} • {car.brand}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-[#D97706]">${car.price}</p>
                        <p className="text-xs text-[#A1A1AA]">per day</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm text-[#52525B] mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span className="text-xs">{car.location.split(',')[0]}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Settings className="w-3 h-3" />
                        <span className="text-xs">{car.transmission}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span className="text-xs">{car.seats} seats</span>
                      </div>
                    </div>
                    
                    <Link to={`/car/${car.id}`}>
                      <Button className="w-full group-hover:bg-[#B45309] transition">
                        View Details
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

      {/* Perks & Benefits */}
      <section className="py-20 bg-gradient-to-r from-[#D97706] to-[#B45309] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-lg opacity-90">
              Premium perks included with every rental
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

      {/* Testimonials with Carousel */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-[#52525B]">
              Trusted by thousands of happy renters
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <motion.div
                className="flex transition-transform duration-500 ease-out"
                animate={{ x: `-${activeTestimonial * 100}%` }}
              >
                {[
                  { name: 'John Smith', role: 'Business Traveler', rating: 5, text: 'Amazing experience! The car was in perfect condition and the booking process was seamless.', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
                  { name: 'Sarah Johnson', role: 'Family Vacation', rating: 5, text: 'Great selection of cars. The customer support was very helpful when I had questions.', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
                  { name: 'Mike Brown', role: 'Weekend Getaway', rating: 4, text: 'Very professional service. Will definitely use again for future trips.', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' }
                ].map((testimonial, idx) => (
                  <div key={idx} className="w-full flex-shrink-0 px-4">
                    <Card className="text-center p-8">
                      <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-[#E4E4E7]'}`} />
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

      {/* CTA Section - Parallax */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1600"
            alt="Road"
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
              Ready to Hit the Road?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers and book your perfect car today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/search">
                <Button size="lg" className="bg-white text-[#D97706] hover:bg-gray-100 group">
                  Browse Available Cars
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition" />
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="secondary" className="bg-transparent border-white text-white hover:bg-white/10">
                  Become a Host
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
