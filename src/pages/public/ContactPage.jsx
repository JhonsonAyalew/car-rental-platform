import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const ContactPage = () => {
  const { t } = useTranslation('contact');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactInfo = [
    { icon: Phone, title: t('contactInfo.phone.title'), details: t('contactInfo.phone.details'), color: '#D97706' },
    { icon: Mail, title: t('contactInfo.email.title'), details: t('contactInfo.email.details'), color: '#10B981' },
    { icon: MapPin, title: t('contactInfo.address.title'), details: t('contactInfo.address.details'), color: '#3B82F6' },
    { icon: Clock, title: t('contactInfo.hours.title'), details: t('contactInfo.hours.details'), color: '#8B5CF6' },
  ];



  return (
    <div className="bg-[#F9F8F6] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4"
          >
            {t('title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#52525B] text-lg max-w-2xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-4">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="flex items-center gap-4 p-4">
                  <div className="w-12 h-12 rounded-full bg-[#FEF3C7] flex items-center justify-center">
                    <info.icon className="w-6 h-6" style={{ color: info.color }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A1A1A]">{info.title}</h3>
                    <p className="text-sm text-[#52525B]">{info.details}</p>
                  </div>
                </Card>
              </motion.div>
            ))}

            {/* Social Links */}
            <Card className="p-6">
              <h3 className="font-semibold text-center mb-4">{t('social.title')}</h3>
              <div className="flex justify-center gap-4">
                {contactInfo.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                    style={{ backgroundColor: `${social.color}15` }}
                    whileHover={{ y: -3 }}
                  >
                    <social.icon className="w-5 h-5" style={{ color: social.color }} />
                  </motion.a>
                ))}
              </div>
              <div className="flex justify-center gap-6 mt-3">
                
                
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">{t('form.title')}</h2>
                
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{t('form.success.title')}</h3>
                    <p className="text-[#52525B]">{t('form.success.message')}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        label={t('form.name')}
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                      <Input
                        label={t('form.email')}
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    
                    <Input
                      label={t('form.subject')}
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                    
                    <div>
                      <label className="block text-[13px] font-medium text-[#1A1A1A] mb-2">{t('form.message')}</label>
                      <textarea
                        rows="5"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3 py-2.5 bg-[#F3F2EE] border border-[#E4E4E7] rounded-lg focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/10"
                        placeholder={t('form.messagePlaceholder')}
                      />
                    </div>
                    
                    <Button type="submit" size="lg" iconRight={<Send className="w-4 h-4" />}>
                      {t('form.submitButton')}
                    </Button>
                  </form>
                )}
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <Card className="overflow-hidden p-0">
            <div className="h-64 bg-gray-200 flex items-center justify-center">
              <MapPin className="w-12 h-12 text-[#D97706]" />
              <span className="ml-2 text-[#52525B]">{t('map.placeholder')}</span>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
