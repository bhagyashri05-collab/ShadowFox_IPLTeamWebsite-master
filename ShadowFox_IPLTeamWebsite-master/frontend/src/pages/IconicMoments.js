import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Calendar, MapPin, TrendingUp, Star, Play, X, Award, Users } from 'lucide-react';
import iconicMomentsData from '../data/iconicMomentsData.json';

const IconicMoments = () => {
  const [moments, setMoments] = useState([]);
  const [filteredMoments, setFilteredMoments] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedMoment, setSelectedMoment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ['all', 'batting', 'partnership', 'team', 'championship', 'fans'];

  useEffect(() => {
    fetchMoments();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredMoments(moments);
    } else {
      setFilteredMoments(moments.filter(m => m.category === selectedCategory));
    }
  }, [selectedCategory, moments]);

  const fetchMoments = async () => {
    try {
      // Use local data instead of API call
      const data = iconicMomentsData;
      
      // Sort by impact score and date
      const sorted = data.sort((a, b) => {
        if (b.impactScore !== a.impactScore) {
          return b.impactScore - a.impactScore;
        }
        return new Date(b.date) - new Date(a.date);
      });
      
      setMoments(sorted);
      setFilteredMoments(sorted);
    } catch (error) {
      console.error('Error loading iconic moments:', error);
    } finally {
      setLoading(false);
    }
  };

  // ... imports ...

  const getCategoryColor = (category) => {
    const colors = {
      batting: 'bg-blue-500',
      partnership: 'bg-purple-500',
      team: 'bg-green-500',
      championship: 'bg-csk-yellow',
      fans: 'bg-csk-blue'
    };
    return colors[category] || 'bg-gray-500';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      batting: <TrendingUp size={16} />,
      partnership: <Users size={16} />,
      team: <Trophy size={16} />,
      championship: <Award size={16} />,
      fans: <Star size={16} />
    };
    return icons[category] || <Star size={16} />;
  };

  const openModal = (moment) => {
    setSelectedMoment(moment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedMoment(null), 300);
  };

  // ...

  return (
    <div className="min-h-screen pt-28 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
            Iconic Moments
          </h1>
          <p className="text-xl text-gray-300">
            Relive the greatest moments in CSK history
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${selectedCategory === category
                ? 'bg-csk-yellow text-black scale-105'
                : 'bg-gray-800 text-white hover:bg-csk-blue'
                }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Moments Grid */}
        {filteredMoments.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">No moments found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredMoments.map((moment, index) => (
              <motion.div
                key={moment._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => openModal(moment)}
              >
                <div className={`card hover-glow h-full ${moment.isChampionship ? 'border-2 border-csk-yellow' : ''}`}>
                  {/* Hero Image */}
                  <div className="relative h-64 md:h-80 bg-gradient-to-br from-csk-yellow/20 to-csk-blue/20 rounded-lg mb-6 overflow-hidden">
                    {moment.images && moment.images.length > 0 && moment.images[0].path ? (
                      <img
                        src={moment.images[0].path}
                        alt={moment.title}
                        className="w-full h-full object-contain bg-black group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML += '<div class="flex items-center justify-center h-full"><div class="text-6xl">🏏</div></div>';
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-6xl">🏏</div>
                      </div>
                    )}

                    {/* Category Badge */}
                    <div className={`absolute top-4 left-4 ${getCategoryColor(moment.category)} px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2`}>
                      {getCategoryIcon(moment.category)}
                      {moment.category}
                    </div>

                    {/* Championship Badge */}
                    {moment.isChampionship && (
                      <div className="absolute top-4 right-4 bg-csk-yellow text-black px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 animate-pulse">
                        <Trophy size={16} />
                        CHAMPIONS
                      </div>
                    )}

                    {/* Impact Score */}
                    <div className="absolute bottom-4 right-4 bg-black/80 px-4 py-2 rounded-full">
                      <div className="flex items-center gap-2">
                        <Star className="text-csk-yellow" size={16} />
                        <span className="font-bold text-csk-yellow">{moment.impactScore}/10</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-csk-yellow transition-colors">
                      {moment.title}
                    </h2>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        {new Date(moment.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </div>
                      {moment.venue && moment.venue !== 'Various' && (
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          {moment.venue.split(',')[0]}
                        </div>
                      )}
                      <div className="px-3 py-1 bg-csk-yellow/20 border border-csk-yellow rounded-full text-csk-yellow font-bold">
                        {moment.season}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {moment.description}
                    </p>

                    {/* Stats */}
                    {moment.stats && Object.keys(moment.stats).length > 0 && (
                      <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                        <h3 className="text-sm font-bold text-csk-yellow mb-3">KEY STATS</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {Object.entries(moment.stats).slice(0, 6).map(([key, value]) => (
                            <div key={key} className="text-center">
                              <div className="text-2xl font-bold text-white">{value}</div>
                              <div className="text-xs text-gray-400 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Highlights */}
                    {moment.highlights && moment.highlights.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-sm font-bold text-csk-yellow mb-2">HIGHLIGHTS</h3>
                        <ul className="space-y-1">
                          {moment.highlights.slice(0, 4).map((highlight, idx) => (
                            <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                              <span className="text-csk-yellow">•</span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t border-csk-blue/20">
                      {moment.videoUrl && (
                        <a
                          href={moment.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 bg-csk-blue hover:bg-csk-blue/80 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                        >
                          <Play size={16} />
                          Watch Video
                        </a>
                      )}
                      {moment.sourceUrl && (
                        <a
                          href={moment.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 bg-gray-700 hover:bg-csk-yellow hover:text-black text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                        >
                          View Scorecard
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 glass-effect rounded-xl p-8"
        >
          <h2 className="text-3xl font-bold gradient-text mb-4">
            🏆 Whistle Podu! 🏆
          </h2>
          <p className="text-xl text-gray-300">
            CSK - The Kings of IPL!
          </p>
        </motion.div>

        {/* Detailed Modal */}
        <AnimatePresence>
          {isModalOpen && selectedMoment && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModal}
                className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                className="fixed inset-4 md:inset-8 lg:inset-16 z-50 overflow-hidden"
              >
                <div className="glass-effect rounded-2xl h-full flex flex-col overflow-hidden border-2 border-csk-yellow">
                  {/* Header */}
                  <div className="relative">
                    <div className="h-64 md:h-96 relative overflow-hidden bg-black">
                      <img
                        src={selectedMoment.images[0]?.path}
                        alt={selectedMoment.title}
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Close Button */}
                    <button
                      onClick={closeModal}
                      className="absolute top-4 right-4 p-2 bg-black/80 hover:bg-csk-blue rounded-full transition-colors"
                    >
                      <X size={24} />
                    </button>

                    {/* Category Badge */}
                    <div className={`absolute top-4 left-4 ${getCategoryColor(selectedMoment.category)} px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2`}>
                      {getCategoryIcon(selectedMoment.category)}
                      {selectedMoment.category}
                    </div>

                    {/* Championship Badge */}
                    {selectedMoment.isChampionship && (
                      <div className="absolute top-16 left-4 bg-csk-yellow text-black px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 animate-pulse">
                        <Trophy size={16} />
                        CHAMPIONS
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 overflow-y-auto p-6 md:p-8">
                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
                      {selectedMoment.title}
                    </h1>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 mb-6 text-sm">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Calendar size={16} className="text-csk-yellow" />
                        {new Date(selectedMoment.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </div>
                      {selectedMoment.venue && selectedMoment.venue !== 'Various' && selectedMoment.venue !== 'Everywhere' && (
                        <div className="flex items-center gap-2 text-gray-300">
                          <MapPin size={16} className="text-csk-yellow" />
                          {selectedMoment.venue}
                        </div>
                      )}
                      <div className="px-3 py-1 bg-csk-yellow/20 border border-csk-yellow rounded-full text-csk-yellow font-bold">
                        {selectedMoment.season}
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-csk-blue/20 border border-csk-blue rounded-full">
                        <Star className="text-csk-yellow" size={16} />
                        <span className="font-bold text-csk-yellow">{selectedMoment.impactScore}/10</span>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                      <p className="text-lg text-gray-200 leading-relaxed">
                        {selectedMoment.description}
                      </p>
                    </div>

                    {/* Stats */}
                    {selectedMoment.stats && Object.keys(selectedMoment.stats).length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-csk-yellow mb-4 flex items-center gap-2">
                          <Award size={20} />
                          KEY STATISTICS
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {Object.entries(selectedMoment.stats).map(([key, value]) => (
                            <div key={key} className="bg-gray-800/50 rounded-lg p-4 text-center border border-csk-yellow/20">
                              <div className="text-3xl font-bold text-csk-yellow mb-1">{value}</div>
                              <div className="text-sm text-gray-400 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Highlights */}
                    {selectedMoment.highlights && selectedMoment.highlights.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-csk-yellow mb-4 flex items-center gap-2">
                          <Star size={20} />
                          HIGHLIGHTS
                        </h3>
                        <div className="space-y-3">
                          {selectedMoment.highlights.map((highlight, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-start gap-3 bg-gray-800/30 p-3 rounded-lg"
                            >
                              <span className="text-csk-yellow text-xl font-bold">•</span>
                              <span className="text-gray-200">{highlight}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 pt-6 border-t border-csk-yellow/20">
                      {selectedMoment.videoUrl && (
                        <a
                          href={selectedMoment.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 min-w-[200px] flex items-center justify-center gap-2 bg-csk-blue hover:bg-csk-blue/80 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                        >
                          <Play size={20} />
                          Watch Video
                        </a>
                      )}
                      {selectedMoment.sourceUrl && (
                        <a
                          href={selectedMoment.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 min-w-[200px] flex items-center justify-center gap-2 bg-csk-yellow hover:bg-csk-yellow/80 text-black px-6 py-3 rounded-lg font-semibold transition-colors"
                        >
                          View Details
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default IconicMoments;
