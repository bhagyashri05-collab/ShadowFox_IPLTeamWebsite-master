import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Calendar, Heart, Award, Target, Play, Star, Mail, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import iconicMomentsData from '../data/iconicMomentsData.json';

const About = () => {
  const [iconicMoments, setIconicMoments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchIconicMoments();
  }, []);

  const fetchIconicMoments = async () => {
    try {
      // Use local data instead of API call
      const data = iconicMomentsData;
      
      // Sort by impact score and get top 8 moments
      const topMoments = data
        .sort((a, b) => b.impactScore - a.impactScore)
        .slice(0, 8);
      
      setIconicMoments(topMoments);
    } catch (error) {
      console.error('Error loading iconic moments:', error);
    }
  };

  const achievements = [
    { year: '2010', title: 'Champions', desc: 'First IPL Title' },
    { year: '2011', title: 'Champions', desc: 'Back-to-back Titles' },
    { year: '2018', title: 'Champions', desc: 'The Grand Comeback' },
    { year: '2021', title: 'Champions', desc: 'The Fourth Title' },
    { year: '2023', title: 'Champions', desc: 'Fifth Title - The Equalizer' }
  ];

  const legends = [
    { name: 'MS Dhoni', role: 'Captain & Wicket-Keeper', desc: 'Thala - The heartbeat of CSK and legendary captain' },
    { name: 'Suresh Raina', role: 'Batsman', desc: 'Chinna Thala - Mr. IPL and consistent run-scorer' },
    { name: 'Ravindra Jadeja', role: 'All-Rounder', desc: 'Sir Jadeja - Rock solid all-rounder and fielder' },
    { name: 'Dwayne Bravo', role: 'All-Rounder', desc: 'Champion - Highest wicket-taker in IPL history for a long time' }
  ];

  const funFacts = [
    '🏆 CSK has won the IPL trophy 5 times!',
    '🟡 Team colors: Yellow and Blue representing the sun and the sea',
    '🏟️ Home ground: M. A. Chidambaram Stadium (Chepauk), Chennai',
    '👥 The most loyal fan base: Whistle Podu Army',
    '⚡ Most playoff appearances in IPL history',
    '🦁 The Roar of the Lion is heard everywhere!'
  ];

  return (
    <div className="min-h-screen pt-28 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
            About CSK
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Chennai Super Kings - A legacy of dominance, consistent performance, and the spirit of Yellove
          </p>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-2xl p-8 md:p-12 mb-16 text-center bg-black/40"
        >
          <div className="mb-6 flex justify-center">
            <img
              src="/images/csk-logo.png"
              alt="CSK Logo"
              className="w-32 h-32 md:w-40 md:h-40 object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<div class="text-6xl">🦁</div>';
              }}
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            The Super Kings Story
          </h2>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Founded in 2008, Chennai Super Kings is one of the most successful franchises in the Indian
            Premier League. Led by the legendary MS Dhoni, the "Yellow Army" has created a legacy of
            consistency, making the playoffs in almost every season they've played. With 5 IPL titles
            and 2 CLT20 titles, CSK defines dominance. "Whistle Podu" is not just a slogan, it's an
            emotion that unites millions of fans worldwide.
          </p>
        </motion.div>

        {/* Key Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <div className="card hover-glow text-center">
            <Calendar className="mx-auto mb-4 text-csk-yellow" size={48} />
            <h3 className="text-4xl font-bold text-white mb-2">2008</h3>
            <p className="text-gray-400">Founded</p>
          </div>
          <div className="card hover-glow text-center">
            <Trophy className="mx-auto mb-4 text-csk-yellow" size={48} />
            <h3 className="text-4xl font-bold text-white mb-2">5</h3>
            <p className="text-gray-400">IPL Titles</p>
          </div>
          <div className="card hover-glow text-center">
            <Users className="mx-auto mb-4 text-csk-yellow" size={48} />
            <h3 className="text-4xl font-bold text-white mb-2">Unlimited</h3>
            <p className="text-gray-400">Yellove</p>
          </div>
        </motion.div>

        {/* Achievements Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
            <Award className="text-csk-yellow" />
            Journey & Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="card hover-glow"
              >
                <div className="text-3xl font-bold text-csk-yellow mb-3">{achievement.year}</div>
                <h3 className="text-lg font-bold text-white mb-2">{achievement.title}</h3>
                <p className="text-sm text-gray-400">{achievement.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Legends */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
            <Heart className="text-csk-yellow" />
            CSK Legends
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {legends.map((legend, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="glass-effect rounded-xl p-6 hover-glow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-csk-yellow text-black rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
                    {legend.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">{legend.name}</h3>
                    <p className="text-csk-yellow text-sm mb-2">{legend.role}</p>
                    <p className="text-gray-400">{legend.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Fun Facts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
            <Target className="text-csk-yellow" />
            Did You Know?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {funFacts.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.05 }}
                className="bg-gray-800 rounded-lg p-6 hover:bg-csk-yellow/10 transition-colors"
              >
                <p className="text-white text-lg">{fact}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Anthem */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="glass-effect rounded-2xl p-8 md:p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-6">CSK Anthem</h2>
          <div className="aspect-video bg-gradient-to-br from-csk-yellow/20 to-csk-blue/20 rounded-xl overflow-hidden relative group cursor-pointer mb-6">
            <img
              src="/images/csk-anthem.jpg"
              alt="CSK Anthem"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<div class="flex items-center justify-center h-full"><div class="text-center"><div class="text-6xl mb-4">🎵</div><p class="text-gray-400">CSK Anthem</p></div></div>';
              }}
            />
            {/* Play button overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
              <a
                href="https://www.youtube.com/watch?v=NTHc6_NMj_Y"
                target="_blank"
                rel="noopener noreferrer"
                className="w-20 h-20 bg-csk-yellow rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl"
              >
                <Play size={36} className="text-black ml-1" fill="black" />
              </a>
            </div>
          </div>
          <a
            href="https://www.youtube.com/watch?v=NTHc6_NMj_Y"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 mb-4"
          >
            <Play size={20} />
            Watch CSK Anthem
          </a>
          <p className="text-xl text-csk-yellow font-bold mb-4">
            "Whistle Podu!"
          </p>
          <p className="text-gray-400">
            The roar that unites the #Yellove army!
          </p>
        </motion.div>

        {/* Iconic Moments Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center gap-2">
            <Star className="text-csk-yellow" />
            Iconic Moments
            <Star className="text-csk-yellow" />
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {iconicMoments.length > 0 ? (
              iconicMoments.map((moment, index) => (
                <motion.div
                  key={moment._id || index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.05 }}
                  onClick={() => navigate('/iconic-moments')}
                  className="aspect-square bg-gradient-to-br from-csk-yellow/20 to-csk-blue/20 rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer group relative"
                >
                  {/* Moment Image */}
                  {moment.images && moment.images.length > 0 && moment.images[0].path ? (
                    <img
                      src={moment.images[0].path}
                      alt={moment.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                        const parent = e.target.parentElement;
                        parent.style.background = 'linear-gradient(135deg, #F9CD05 0%, #005FA0 100%)';
                        parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-6xl">🏆</div>';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-csk-yellow/20 to-csk-blue/20">
                      <span className="text-4xl">🏆</span>
                    </div>
                  )}
                  
                  {/* Championship Badge */}
                  {moment.isChampionship && (
                    <div className="absolute top-2 left-2 bg-csk-yellow text-black px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Trophy size={10} />
                      WIN
                    </div>
                  )}
                  
                  {/* Impact Score */}
                  <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded-full">
                    <div className="flex items-center gap-1">
                      <Star className="text-csk-yellow" size={10} />
                      <span className="text-xs font-bold text-csk-yellow">{moment.impactScore}</span>
                    </div>
                  </div>
                  
                  {/* Overlay with title */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <div className="w-full">
                      <p className="text-white text-xs font-semibold line-clamp-2 mb-1">{moment.title}</p>
                      <p className="text-csk-yellow text-xs font-bold">{moment.season}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div
                  key={item}
                  onClick={() => navigate('/iconic-moments')}
                  className="aspect-square bg-gradient-to-br from-csk-yellow/20 to-csk-blue/20 rounded-lg flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
                >
                  <span className="text-4xl">🏆</span>
                </div>
              ))
            )}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/iconic-moments')}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Star size={20} />
              View All Iconic Moments
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
