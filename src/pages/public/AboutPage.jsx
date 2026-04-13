import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Car, Shield, Clock, Award, Users, Headphones } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const AboutPage = () => {
  const { t } = useTranslation('about');
  
  const stats = [
    { value: '500+', label: t('stats.equipment'), icon: Car },
    { value: '98%', label: t('stats.satisfaction'), icon: Award },
    { value: '24/7', label: t('stats.support'), icon: Headphones },
    { value: '50+', label: t('stats.partners'), icon: Users },
  ];

  const features = [
    { icon: Shield, title: t('whyChooseUs.secureBooking.title'), desc: t('whyChooseUs.secureBooking.desc') },
    { icon: Clock, title: t('whyChooseUs.quickDelivery.title'), desc: t('whyChooseUs.quickDelivery.desc') },
    { icon: Award, title: t('whyChooseUs.qualityAssured.title'), desc: t('whyChooseUs.qualityAssured.desc') },
  ];

  return (
    <div className="bg-[#F9F8F6] min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#D97706] to-[#B45309] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg opacity-90 max-w-2xl mx-auto"
          >
            {t('hero.subtitle')}
          </motion.p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#FEF3C7] flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-8 h-8 text-[#D97706]" />
              </div>
              <p className="text-2xl font-bold text-[#1A1A1A]">{stat.value}</p>
              <p className="text-sm text-[#52525B]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">{t('mission.title')}</h2>
            <p className="text-[#52525B] mb-4 leading-relaxed">
              {t('mission.description1')}
            </p>
            <p className="text-[#52525B] leading-relaxed">
              {t('mission.description2')}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#FEF3C7] rounded-xl p-8 text-center"
          >
            <Car className="w-16 h-16 text-[#D97706] mx-auto mb-4" />
            <p className="text-lg font-semibold text-[#92400E] italic">
              {t('mission.quote')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">{t('whyChooseUs.title')}</h2>
            <p className="text-[#52525B]">{t('whyChooseUs.subtitle')}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-full bg-[#FEF3C7] flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-10 h-10 text-[#D97706]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-[#52525B]">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">{t('cta.title')}</h2>
      </div>
    </div>
  );
};

export default AboutPage;
