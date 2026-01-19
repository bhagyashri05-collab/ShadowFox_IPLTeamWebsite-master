import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Users, Calendar, ChevronRight, Twitter, Instagram, Facebook, Youtube } from 'lucide-react';
import { getNews } from '../services/api';

const Home = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const newsRes = await getNews();
      if (newsRes.success) {
        setNews(newsRes.data.slice(0, 3));
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const features = [
    { icon: Users, title: 'Team Squad', desc: 'Meet the CSK warriors', link: '/squad' },
    { icon: Calendar, title: 'Matches', desc: 'Schedule & live scores', link: '/matches' },
    { icon: Trophy, title: 'Fan Zone', desc: 'Polls & community', link: '/fan-zone' }
  ];

  const socialLinks = [
    { icon: Twitter, name: 'Twitter/X', url: 'https://x.com/ChennaiIPL', color: 'hover:text-blue-400' },
    { icon: Instagram, name: 'Instagram', url: 'https://www.instagram.com/chennaiipl/?hl=en', color: 'hover:text-pink-400' },
    { icon: Facebook, name: 'Facebook', url: 'https://www.facebook.com/TheChennaiSuperKings/', color: 'hover:text-blue-500' },
    { icon: Youtube, name: 'YouTube', url: 'https://www.youtube.com/@chennaiipl', color: 'hover:text-red-500' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-csk-blue/20 to-black">
          {/* Radial Gradient Overlays */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-csk-yellow/20 via-transparent to-transparent"></div>
            <div className="absolute top-20 left-20 w-96 h-96 bg-csk-yellow/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-csk-blue/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-csk-yellow/10 rounded-full blur-3xl"></div>
          </div>

          {/* Diagonal Stripes */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-2 bg-csk-blue transform -rotate-12 origin-top-left" style={{ width: '150%' }}></div>
            <div className="absolute top-20 left-0 w-full h-2 bg-csk-yellow transform -rotate-12 origin-top-left" style={{ width: '150%' }}></div>
            <div className="absolute top-40 left-0 w-full h-2 bg-csk-blue transform -rotate-12 origin-top-left" style={{ width: '150%' }}></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            {/* CSK Logo */}
            <div className="flex justify-center">
              <div className="w-48 h-48 md:w-64 md:h-64">
                <img
                  src="/images/csk-logo.png"
                  alt="CSK Logo"
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-4xl md:text-6xl font-black mb-8">
              <span className="text-csk-yellow">WHISTLE</span>{' '}
              <span className="text-csk-blue">PODU!</span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-semibold">
              The Ultimate Fan Hub for Chennai Super Kings
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/squad"
                className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-base"
              >
                <Users size={20} />
                Explore Squad
              </Link>
              <Link
                to="/matches"
                className="btn-secondary inline-flex items-center gap-2 px-8 py-3 text-base"
              >
                <Calendar size={20} />
                View Matches
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
          >
            Explore CSK Universe
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={feature.link} className="block h-full">
                  <div className="card h-full hover:border-csk-yellow/40 transition-all duration-300">
                    <div className="w-16 h-16 bg-csk-yellow/20 rounded-full flex items-center justify-center mb-4">
                      <feature.icon size={32} className="text-csk-yellow" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 mb-4">{feature.desc}</p>
                    <div className="flex items-center text-csk-yellow">
                      <span className="font-semibold">Explore</span>
                      <ChevronRight size={20} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">Latest News</h2>
            <Link to="/news" className="text-csk-yellow hover:text-csk-yellow/80 flex items-center">
              View All <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((article, index) => (
              <motion.div
                key={article._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <div className="card h-full flex flex-col hover:border-csk-blue/40 transition-all duration-300">
                  <div className="h-48 bg-csk-yellow/10 rounded-lg mb-4 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <span className="text-5xl" style={{display: 'none'}}>📰</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{article.title}</h3>
                  <p className="text-gray-400 mb-4 line-clamp-2 flex-grow">{article.summary}</p>
                  <div className="flex justify-between items-center text-sm mt-auto">
                    <span className="text-csk-blue font-semibold">{article.source}</span>
                    <span className="text-gray-500">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-effect rounded-2xl p-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Join the CSK Family
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Connect with fellow fans, participate in polls, and show your support for CSK!
            </p>
            <Link to="/fan-zone" className="btn-primary text-lg">
              Enter Fan Zone
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-12 gradient-text"
          >
            Connect With CSK
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`glass-effect rounded-xl p-6 flex flex-col items-center gap-4 text-white transition-all duration-300 ${social.color} hover:scale-105 hover:border-csk-yellow/40`}
              >
                <social.icon size={40} className="text-csk-yellow" />
                <span className="font-semibold">{social.name}</span>
              </motion.a>
            ))}
          </div>
          
          <p className="text-gray-400">
            Follow us for the latest updates, behind-the-scenes content, and exclusive CSK moments!
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
