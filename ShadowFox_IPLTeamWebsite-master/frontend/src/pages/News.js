import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Calendar, Tag, Play, Twitter, Instagram, Facebook, Youtube, X } from 'lucide-react';
import { getNews } from '../services/api';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const openNewsModal = (newsItem) => {
    setSelectedNews(newsItem);
  };

  const closeNewsModal = () => {
    setSelectedNews(null);
  };

  const fetchNews = async () => {
    try {
      const response = await getNews();
      if (response.success) {
        setNews(response.data);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  // ... imports ...

  return (
    <div className="min-h-screen pt-28 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
            Latest News
          </h1>
          <p className="text-xl text-gray-400">
            Stay updated with CSK's latest happenings
          </p>
        </motion.div>

        {/* Featured News */}
        {news.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-xl overflow-hidden mb-12 hover-glow"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="h-80 lg:h-auto bg-gradient-to-br from-csk-blue/30 to-csk-yellow/30 overflow-hidden flex items-center justify-center">
                <img
                  src={news[0].image}
                  alt={news[0].title}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="flex items-center justify-center h-full text-8xl">📰</div>';
                  }}
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <Tag size={16} className="text-csk-yellow" />
                  <span className="text-sm text-csk-yellow font-semibold">FEATURED</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {news[0].title}
                </h2>
                <p className="text-gray-400 mb-6 text-lg">
                  {news[0].summary}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      {new Date(news[0].publishedAt).toLocaleDateString()}
                    </span>
                    <span>{news[0].source}</span>
                  </div>
                  <div className="flex gap-3">
                    {news[0].videoUrl && (
                      <a
                        href={news[0].videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary flex items-center gap-2"
                      >
                        <Play size={16} /> Watch Video
                      </a>
                    )}
                    <button
                      onClick={() => openNewsModal(news[0])}
                      className="btn-secondary flex items-center gap-2"
                    >
                      Read More <ExternalLink size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.slice(1).map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
              className="card hover-glow group cursor-pointer"
            >
              {/* Image */}
              <div className="h-56 bg-gradient-to-br from-csk-blue/20 to-csk-yellow/20 rounded-lg mb-4 overflow-hidden relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="flex items-center justify-center h-full text-6xl">📰</div>';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                {article.category && (
                  <div className="absolute top-3 left-3 bg-csk-yellow text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    {article.category}
                  </div>
                )}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-csk-yellow transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-400 mb-4 line-clamp-3">
                  {article.summary}
                </p>

                {/* Footer */}
                <div className="flex items-end justify-between pt-4 border-t border-csk-blue/20">
                  <div className="text-sm text-gray-500">
                    <div className="flex items-center gap-1 mb-1">
                      <Calendar size={14} />
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </div>
                    <div className="text-csk-yellow">{article.source}</div>
                  </div>
                  <div className="flex gap-2 items-center">
                    {article.videoUrl && (
                      <a
                        href={article.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-csk-blue hover:text-csk-blue/80"
                        title="Watch Video"
                      >
                        <Play size={18} />
                      </a>
                    )}
                    <button
                      onClick={() => openNewsModal(article)}
                      className="text-csk-yellow hover:text-csk-yellow/80 flex items-center gap-1"
                    >
                      Read <ExternalLink size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
            <Play className="text-csk-yellow" />
            Latest Videos & Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.filter(n => n.videoUrl).slice(0, 3).map((video) => (
              <div key={video.id} className="glass-effect rounded-xl overflow-hidden hover-glow group flex flex-col">
                <div className="aspect-video bg-gradient-to-br from-csk-blue/20 to-black overflow-hidden relative flex items-center justify-center">
                  <img
                    src={video.image}
                    alt={video.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                    <div className="w-20 h-20 bg-csk-yellow rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                      <Play size={36} className="text-black ml-1" fill="black" />
                    </div>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-2 flex-grow">
                    {video.summary}
                  </p>
                  <a
                    href={video.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full flex items-center justify-center gap-2 mt-auto"
                  >
                    <Play size={16} /> Watch Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Social Media Feed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-16 glass-effect rounded-xl p-8"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Follow CSK on Social Media</h2>
          <p className="text-gray-400 text-center mb-8">Get real-time updates, exclusive content, and behind-the-scenes access</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Twitter */}
            <a
              href="https://twitter.com/ChennaiIPL"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-lg p-6 text-center hover:bg-csk-blue/20 transition-colors group"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-[#1DA1F2] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Twitter size={32} className="text-white" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Twitter / X</h3>
              <p className="text-gray-400 text-sm mb-3">@ChennaiIPL</p>
              <div className="text-csk-yellow font-semibold">Follow Now →</div>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/chennaiipl"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-lg p-6 text-center hover:bg-csk-blue/20 transition-colors group"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Instagram size={32} className="text-white" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Instagram</h3>
              <p className="text-gray-400 text-sm mb-3">@chennaiipl</p>
              <div className="text-csk-yellow font-semibold">Follow Now →</div>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/TheChennaiSuperKings"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-lg p-6 text-center hover:bg-csk-blue/20 transition-colors group"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-[#1877F2] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Facebook size={32} className="text-white" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Facebook</h3>
              <p className="text-gray-400 text-sm mb-3">Chennai Super Kings</p>
              <div className="text-csk-yellow font-semibold">Like Page →</div>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/c/ChennaiIPL"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-lg p-6 text-center hover:bg-csk-blue/20 transition-colors group"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-[#FF0000] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Youtube size={32} className="text-white" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">YouTube</h3>
              <p className="text-gray-400 text-sm mb-3">CSK Official</p>
              <div className="text-csk-yellow font-semibold">Subscribe →</div>
            </a>
          </div>
        </motion.div>

        {/* News Modal */}
        <AnimatePresence>
          {selectedNews && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={closeNewsModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="relative h-64 bg-gradient-to-br from-csk-blue/30 to-csk-yellow/30 overflow-hidden">
                  <img
                    src={selectedNews.image}
                    alt={selectedNews.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="flex items-center justify-center h-full text-8xl">📰</div>';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  
                  {/* Close Button */}
                  <button
                    onClick={closeNewsModal}
                    className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <X size={20} />
                  </button>

                  {/* Category Badge */}
                  {selectedNews.category && (
                    <div className="absolute top-4 left-4 bg-csk-yellow text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      {selectedNews.category.toUpperCase()}
                    </div>
                  )}

                  {/* Title Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {selectedNews.title}
                    </h2>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-16rem)]">
                  {/* Meta Information */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-csk-blue/20">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={16} />
                        {new Date(selectedNews.publishedAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                      <span className="text-csk-yellow">{selectedNews.source}</span>
                    </div>
                  </div>

                  {/* Full Content */}
                  <div className="prose prose-invert max-w-none">
                    <div className="text-gray-300 leading-relaxed space-y-4">
                      {selectedNews.content.split('\n').map((paragraph, index) => (
                        <p key={index} className="text-base">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 mt-8 pt-6 border-t border-csk-blue/20">
                    {selectedNews.videoUrl && (
                      <a
                        href={selectedNews.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary flex items-center gap-2"
                      >
                        <Play size={16} /> Watch Video
                      </a>
                    )}
                    {selectedNews.url && (
                      <a
                        href={selectedNews.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary flex items-center gap-2"
                      >
                        <ExternalLink size={16} /> Read Original Article
                      </a>
                    )}
                    <button
                      onClick={closeNewsModal}
                      className="btn-outline flex items-center gap-2"
                    >
                      <X size={16} /> Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default News;
