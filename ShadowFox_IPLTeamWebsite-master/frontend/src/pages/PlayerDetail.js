import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, Target, Trophy, Star, FileText, Calendar, TrendingUp, Users, Zap, Shield } from 'lucide-react';
import Scorecard from '../components/Scorecard';
import { getPlayer } from '../services/api';

const PlayerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [scorecardOpen, setScorecardOpen] = useState(false);

  const openScorecard = (match) => {
    setSelectedMatch(match);
    setScorecardOpen(true);
  };

  const closeScorecard = () => {
    setScorecardOpen(false);
    setTimeout(() => setSelectedMatch(null), 300);
  };

  // Sample recent matches data - this would come from backend
  const getRecentMatches = () => {
    return [
      {
        _id: '1',
        matchNumber: 1,
        opponent: 'Mumbai Indians',
        venue: 'M. A. Chidambaram Stadium',
        date: '2025-03-22',
        status: 'Completed',
        scores: {
          csk: { runs: 178, wickets: 4, overs: 20 },
          opponent: { runs: 165, wickets: 8, overs: 20 }
        },
        result: { winner: 'CSK', summary: 'CSK won by 13 runs' },
        playerPerformance: {
          runs: 45,
          balls: 32,
          fours: 4,
          sixes: 2,
          wickets: 0,
          economy: 0
        },
        // Add sample batting and bowling data for scorecard
        cskBatting: [
          { name: 'Ruturaj Gaikwad', runs: 45, balls: 32, fours: 4, sixes: 2, strikeRate: 140.6, out: 'c & b Bumrah' },
          { name: 'Devon Conway', runs: 52, balls: 38, fours: 5, sixes: 1, strikeRate: 136.8, out: 'bowled Bumrah' },
          { name: 'MS Dhoni', runs: 28, balls: 20, fours: 2, sixes: 2, strikeRate: 140.0, out: 'run out' },
          { name: 'Shivam Dube', runs: 35, balls: 22, fours: 3, sixes: 2, strikeRate: 159.1, out: 'c & b Chahar' }
        ],
        opponentBatting: [
          { name: 'Rohit Sharma', runs: 42, balls: 35, fours: 4, sixes: 1, strikeRate: 120.0, out: 'c Dhoni b Jadeja' },
          { name: 'Ishan Kishan', runs: 38, balls: 28, fours: 3, sixes: 2, strikeRate: 135.7, out: 'c Gaikwad b Dube' },
          { name: 'Suryakumar Yadav', runs: 25, balls: 18, fours: 2, sixes: 1, strikeRate: 138.9, out: 'c Dhoni b Jadeja' }
        ],
        cskBowling: [
          { name: 'Ravindra Jadeja', overs: 4, maidens: 0, runs: 28, wickets: 2, economy: 7.0 },
          { name: 'Shivam Dube', overs: 4, maidens: 0, runs: 35, wickets: 1, economy: 8.75 },
          { name: 'Matheesha Pathirana', overs: 4, maidens: 0, runs: 42, wickets: 2, economy: 10.5 }
        ],
        opponentBowling: [
          { name: 'Jasprit Bumrah', overs: 4, maidens: 0, runs: 38, wickets: 2, economy: 9.5 },
          { name: 'Rahul Chahar', overs: 4, maidens: 0, runs: 32, wickets: 1, economy: 8.0 }
        ],
        cskExtras: { wides: 8, noBalls: 2, legByes: 3, byes: 1, total: 14 },
        opponentExtras: { wides: 5, noBalls: 1, legByes: 2, byes: 0, total: 8 }
      }
    ];
  };

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await getPlayer(id);
        if (response.success) {
          console.log('Player data received:', response.data);
          setPlayer(response.data);
        }
      } catch (error) {
        console.error('Error fetching player:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Player Not Found</h2>
          <p className="text-gray-400">The player you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  // Safe stat getter with hardcoded fallbacks
  const getSafeStat = (stat, defaultValue = 0) => {
    if (!player || !player.stats) return defaultValue;
    return player.stats[stat] !== undefined && player.stats[stat] !== null ? player.stats[stat] : defaultValue;
  };

  return (
    <div className="min-h-screen pt-28 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/squad')}
          className="flex items-center gap-2 text-csk-yellow hover:text-csk-yellow/80 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-semibold">Back to Squad</span>
        </motion.button>

        {/* Player Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {/* Player Image */}
          <div className="md:col-span-1">
            <div className="relative h-96 bg-gradient-to-br from-black via-csk-yellow/10 to-black border-2 border-csk-yellow/30 rounded-xl overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
                {player.photo ? (
                  <img
                    src={player.photo}
                    alt={player.name}
                    className="w-full h-full object-cover"
                    style={{ backgroundColor: '#000000' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML += '<div class="text-9xl mb-8">👤</div>';
                    }}
                  />
                ) : (
                  <div className="text-9xl mb-8">👤</div>
                )}
              </div>
              
              {/* Jersey Number */}
              <div className="absolute top-4 right-4 bg-black/80 w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl text-csk-yellow border-2 border-csk-yellow">
                {player.jerseyNumber}
              </div>

              {/* Captain/Thala Badge */}
              {player.name === 'Ruturaj Gaikwad' && (
                <div className="absolute top-3 left-3 bg-csk-yellow text-black px-3 py-1 rounded-full text-xs font-black z-20">
                  CAPTAIN
                </div>
              )}

              {player.name === 'MS Dhoni' && (
                <div className="absolute top-3 left-3 bg-csk-yellow text-black px-3 py-1 rounded-full text-xs font-black z-20">
                  THALA
                </div>
              )}
            </div>
          </div>

          {/* Player Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-csk-yellow/30">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Users className="text-csk-yellow" size={24} />
                Player Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Full Name</p>
                  <p className="text-white font-bold text-lg">{player.name}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2">Role</p>
                  <div className="inline-block bg-blue-500 px-3 py-1 rounded-full text-sm font-bold">
                    {player.role}
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2">Nationality</p>
                  <p className="text-white font-bold">{player.nationality}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2">Jersey Number</p>
                  <p className="text-white font-bold text-2xl">#{player.jerseyNumber}</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-400 text-sm mb-2">Biography</p>
                <p className="text-gray-300 leading-relaxed">{player.bio}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Batting Style</p>
                  <p className="text-white font-bold">{player.battingStyle}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2">Bowling Style</p>
                  <p className="text-white font-bold">{player.bowlingStyle}</p>
                </div>
              </div>
            </div>

            {/* Career Statistics */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-csk-yellow/30">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <TrendingUp className="text-csk-yellow" size={24} />
                Career Statistics
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-black text-csk-yellow">{getSafeStat('matches')}</div>
                  <div className="text-xs text-gray-500 font-semibold">MATCHES</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-csk-yellow">{getSafeStat('runs')}</div>
                  <div className="text-xs text-gray-500 font-semibold">RUNS</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-csk-yellow">{getSafeStat('average')}</div>
                  <div className="text-xs text-gray-500 font-semibold">AVERAGE</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-csk-yellow">{getSafeStat('strikeRate')}</div>
                  <div className="text-xs text-gray-500 font-semibold">STRIKE RATE</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-black text-csk-yellow">{getSafeStat('highestScore')}</div>
                  <div className="text-xs text-gray-500 font-semibold">HIGHEST SCORE</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-csk-yellow">{getSafeStat('fifties')}</div>
                  <div className="text-xs text-gray-500 font-semibold">FIFTIES</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-csk-yellow">{getSafeStat('hundreds')}</div>
                  <div className="text-xs text-gray-500 font-semibold">HUNDREDS</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-csk-yellow">{getSafeStat('sixes')}</div>
                  <div className="text-xs text-gray-500 font-semibold">SIXES</div>
                </div>
              </div>

              {player.role === 'Bowler' && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-black text-csk-yellow">{getSafeStat('wickets')}</div>
                    <div className="text-xs text-gray-500 font-semibold">WICKETS</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-csk-yellow">{getSafeStat('economy')}</div>
                    <div className="text-xs text-gray-500 font-semibold">ECONOMY</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-csk-yellow">{getSafeStat('bestBowling', 'N/A')}</div>
                    <div className="text-xs text-gray-500 font-semibold">BEST BOWLING</div>
                  </div>
                </div>
              )}
            </div>

            {/* IPL 2025 Performance */}
            {player.ipl2025Contribution && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-csk-yellow/30">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <Zap className="text-csk-yellow" size={24} />
                  IPL 2025 Performance
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-black text-csk-yellow">{player.ipl2025Contribution.matches || 0}</div>
                    <div className="text-xs text-gray-500 font-semibold">MATCHES</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-csk-yellow">{player.ipl2025Contribution.runs || 0}</div>
                    <div className="text-xs text-gray-500 font-semibold">RUNS</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-csk-yellow">{player.ipl2025Contribution.average || 0}</div>
                    <div className="text-xs text-gray-500 font-semibold">AVERAGE</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-csk-yellow">{player.ipl2025Contribution.impactRating || 0}</div>
                    <div className="text-xs text-gray-500 font-semibold">IMPACT RATING</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Recent Matches with Scorecards */}
          <div className="md:col-span-3 space-y-4">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-csk-yellow/30">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Calendar className="text-csk-yellow" size={24} />
                Recent Matches
              </h2>
              
              <div className="space-y-4">
                {getRecentMatches().map((match, index) => (
                  <motion.div
                    key={match._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="bg-gray-800/50 border border-csk-yellow/20 rounded-lg p-5 hover:border-csk-yellow/40 transition-all duration-300"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-white">
                            CSK vs {match.opponent}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span>Match #{match.matchNumber}</span>
                            <span>•</span>
                            <span>{new Date(match.date).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}</span>
                            <span>•</span>
                            <span>{match.venue}</span>
                          </div>
                        </div>

                        <div className="bg-csk-yellow/10 border border-csk-yellow/30 rounded p-3">
                          <div className="text-xs text-csk-yellow font-semibold mb-2">Player Performance</div>
                          <div className="flex flex-wrap gap-4 text-sm">
                            {match.playerPerformance.runs > 0 && (
                              <div>
                                <span className="text-gray-400">Runs: </span>
                                <span className="text-white font-bold">{match.playerPerformance.runs} ({match.playerPerformance.balls})</span>
                              </div>
                            )}
                            {match.playerPerformance.fours > 0 && (
                              <div>
                                <span className="text-gray-400">Fours: </span>
                                <span className="text-white font-bold">{match.playerPerformance.fours}</span>
                              </div>
                            )}
                            {match.playerPerformance.sixes > 0 && (
                              <div>
                                <span className="text-gray-400">Sixes: </span>
                                <span className="text-white font-bold">{match.playerPerformance.sixes}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => openScorecard(match)}
                        className="btn-primary flex items-center gap-2 whitespace-nowrap self-start lg:self-center"
                      >
                        <FileText size={18} />
                        View Scorecard
                      </button>
                    </div>

                    <div className="mt-4 p-4 bg-csk-yellow/10 border border-csk-yellow/30 rounded">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold text-csk-yellow mb-1">CSK</div>
                          <div className="text-2xl font-black text-csk-yellow">{match.scores.csk.runs}/{match.scores.csk.wickets}</div>
                          <div className="text-sm text-gray-400">({match.scores.csk.overs} overs)</div>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white mb-1">Opposition</div>
                          <div className="text-2xl font-black">{match.scores.opponent.runs}/{match.scores.opponent.wickets}</div>
                          <div className="text-sm text-gray-400">({match.scores.opponent.overs} overs)</div>
                        </div>
                      </div>
                      <div className="text-center mt-2">
                        <div className="text-lg font-bold text-csk-yellow">{match.result.summary}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scorecard Modal */}
      <Scorecard
        match={selectedMatch}
        isOpen={scorecardOpen}
        onClose={closeScorecard}
      />
    </div>
  );
};

export default PlayerDetail;
