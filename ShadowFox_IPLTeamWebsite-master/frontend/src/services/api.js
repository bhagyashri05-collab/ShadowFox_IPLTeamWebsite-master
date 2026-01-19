// Import local data for standalone frontend
import mergedMatchesData from '../data/mergedMatchesData.json';
import cskPlayersData from '../data/cskPlayersData.json';

// Mock data for standalone functionality
const mockNews = [
  {
    _id: '1',
    title: 'CSK Dominates Season Opener',
    content: 'Chennai Super Kings started their IPL 2025 campaign with a convincing win against Mumbai Indians at Chepauk. Captain Ruturaj Gaikwad led from the front with a magnificent 65* off 42 balls, while the bowling attack led by Matheesha Pathirana restricted MI to 165/8. The crowd was electrifying as CSK showcased their championship pedigree with a comprehensive 13-run victory, setting the tone for what promises to be an exciting season.',
    summary: 'CSK begins IPL 2025 with a spectacular victory, showing strong form and teamwork.',
    image: '/images/news-1.jpg',
    source: 'CSK Official',
    date: new Date('2025-03-22').toISOString(),
    publishedAt: new Date('2025-03-22').toISOString(),
    category: 'match',
    url: 'https://www.iplt20.com/news/285611/csk-dominates-season-opener-ipl-2025',
    videoUrl: 'https://www.iplt20.com/video/221890/csk-vs-mi-match-highlights'
  },
  {
    _id: '2',
    title: 'Dhoni Announces Final Season',
    content: 'MS Dhoni has confirmed that IPL 2025 will be his final season in an emotional press conference at Chepauk Stadium. The legendary captain, who has led CSK to five IPL titles, expressed gratitude to the fans and promised to give his everything in his farewell season. "This will be my last IPL, but the love for CSK will never end," Dhoni said, fighting back tears. Fans across the world have been celebrating his legacy while hoping for one more championship trophy.',
    summary: 'Captain Cool MS Dhoni announces that IPL 2025 will be his farewell season.',
    image: '/images/news-2.jpg',
    source: 'Hindustan Times',
    date: new Date('2025-03-20').toISOString(),
    publishedAt: new Date('2025-03-20').toISOString(),
    category: 'team',
    url: 'https://www.hindustantimes.com/cricket/ms-dhoni-opens-up-on-retirement-drops-bombshell-update-ahead-of-ipl-2025-easier-said-than-done-101740023884279.html'
  },
  {
    _id: '3',
    title: 'CSK Signs Promising Young All-Rounder for IPL 2025',
    content: 'Chennai Super Kings acquire talented 22-year-old all-rounder from domestic circuit, adding depth to squad. The young sensation, who impressed everyone with consistent performances in Ranji Trophy and Syed Mushtaq Ali Trophy, was signed for INR 1.2 Crore at the auction. CSK CEO Kasi Viswanathan stated, "We believe in nurturing young talent and this player has the potential to become a future star for CSK." The player expressed excitement about joining the yellow army.',
    summary: 'Chennai Super Kings acquire talented 22-year-old all-rounder from domestic circuit, adding depth to squad.',
    image: '/images/news-3.jpg',
    source: 'News First Prime',
    date: new Date('2025-02-15').toISOString(),
    publishedAt: new Date('2025-02-15').toISOString(),
    category: 'team',
    url: 'https://newsfirstprime.com/sports/from-daddys-army-to-young-brigade-csk-bets-big-on-youth-ahead-of-next-ipl-season-10921556'
  },
  {
    _id: '4',
    title: 'Jadeja Returns to Prime Form in Domestic Tournament',
    content: 'CSK star all-rounder Ravindra Jadeja delivered a match-winning performance in a recent domestic tournament, taking 3 wickets for 28 runs and scoring a quickfire 45 runs off just 22 balls. His brilliant all-round performance came at a crucial time for Saurashtra, helping them secure a vital victory. CSK fans are excited to see Jadeja back in prime form ahead of IPL 2025, where his contributions will be vital for CSK\'s championship hopes.',
    summary: 'Ravindra Jadeja showcases brilliant all-round performance, signaling great form for IPL 2025.',
    image: '/images/news-4.jpg',
    source: 'Times of India',
    date: new Date('2025-02-28').toISOString(),
    publishedAt: new Date('2025-02-28').toISOString(),
    category: 'player',
    url: 'https://timesofindia.indiatimes.com/sports/cricket/news/ravindra-jadeja-shines-with-the-ball-on-his-ranji-trophy-return/articleshow/117488368.cms'
  },
  {
    _id: '5',
    title: 'CSK Unveils Special Edition Jersey for IPL 2025',
    content: 'CSK revealed their special edition jersey for IPL 2025, featuring subtle design changes and improved fabric technology for better player comfort. The new jersey maintains the iconic yellow color while adding modern elements like moisture-wicking fabric and enhanced ventilation. The launch event was attended by CSK players and management, with fans getting the first glimpse through social media. The jersey will be available for purchase from March 15th, with proceeds supporting local cricket development programs.',
    summary: 'Chennai Super Kings launch stunning new jersey design with modern touches while maintaining traditional yellow.',
    image: '/images/news-5.jpg',
    source: 'CSK Official',
    date: new Date('2025-03-01').toISOString(),
    publishedAt: new Date('2025-03-01').toISOString(),
    category: 'announcement',
    url: 'https://www.chennaisuperkings.com/shop/products/PRCSK25-MJHSM-PLAIN'
  },
  {
    _id: '6',
    title: 'Dhoni Intense Training Session Video Goes Viral',
    content: 'A video of MS Dhoni\'s intense training session at Chepauk stadium has gone viral on social media, showing his incredible fitness at age 42. The video captures Dhoni doing batting practice, wicket-keeping drills, and fitness exercises that would challenge players half his age. CSK fans have been sharing the video widely, with many calling it "inspirational." The video has amassed over 10 million views across platforms, proving Dhoni\'s enduring popularity and dedication to the sport.',
    summary: 'MS Dhoni\'s behind-the-scenes training video showcases incredible fitness ahead of IPL 2025.',
    image: '/images/news-6.jpg',
    source: 'Sports Today',
    date: new Date('2025-03-10').toISOString(),
    publishedAt: new Date('2025-03-10').toISOString(),
    category: 'player',
    videoUrl: 'https://www.youtube.com/watch?v=RZNYL-uGY2Y'
  },
  {
    _id: '7',
    title: 'CSK Releases New Theme Song Remix for IPL 2025',
    content: 'CSK have released an energetic remix of their iconic theme song, featuring modern beats and fan participation from across Tamil Nadu. The new version was created in collaboration with popular music composer Anirudh Ravichander and features vocals from CSK players including Dhoni, Gaikwad, and Jadeja. The song has already become a chartbuster on music streaming platforms and is being played at CSK training sessions. Fans have been creating their own versions and dance routines, making it a social media sensation.',
    summary: 'Chennai Super Kings collaborate with popular music composer for electrifying new theme song.',
    image: '/images/news-7.jpg',
    source: 'CSK Official',
    date: new Date('2025-03-05').toISOString(),
    publishedAt: new Date('2025-03-05').toISOString(),
    category: 'announcement',
    videoUrl: 'https://www.youtube.com/watch?v=NTHc6_NMj_Y'
  },
  {
    _id: '8',
    title: 'Ruturaj Gaikwad Leads CSK in Practice Matches',
    content: 'Young opener Ruturaj Gaikwad has been leading CSK in practice matches, showing maturity beyond his years with tactical field placements and aggressive batting. In the latest practice game against a combined XI, Gaikwad scored 78 off 54 balls and made strategic bowling changes that helped CSK restrict the opposition. Coach Stephen Fleming praised his leadership skills, saying \"Ruturaj has grown tremendously as a leader and is ready for the responsibility.\" Fans are excited about the smooth transition of leadership.',
    summary: 'Young opener Ruturaj Gaikwad showcases leadership skills in CSK practice matches.',
    image: '/images/news-8.jpg',
    source: 'Cricbuzz',
    date: new Date('2025-03-12').toISOString(),
    publishedAt: new Date('2025-03-12').toISOString(),
    category: 'team',
    url: 'https://www.iplt20.com/news/3997/ruturaj-gaikwad-takes-over-chennai-super-kings-captaincy-from-ms-dhoni'
  }
];

const mockIconicMoments = [
  {
    _id: '1',
    title: '2018 Final - Comeback Kings',
    description: 'CSK returns after 2-year ban to win their third IPL title',
    image: '/images/iconic1.jpg',
    category: 'victory',
    season: '2018',
    featured: true
  },
  {
    _id: '2',
    title: 'Dhoni\'s Last Over Heroics',
    description: 'Captain Cool finishes the match in style with a six',
    image: '/images/iconic2.jpg',
    category: 'match',
    season: '2023',
    featured: true
  }
];

const mockPolls = [
  {
    _id: '1',
    question: 'Who will be CSK\'s highest run-scorer in IPL 2025?',
    options: [
      { text: 'Ruturaj Gaikwad', votes: 245 },
      { text: 'Devon Conway', votes: 189 },
      { text: 'Shivam Dube', votes: 156 },
      { text: 'Moeen Ali', votes: 98 }
    ],
    totalVotes: 688,
    category: 'Batting',
    active: true
  },
  {
    _id: '2',
    question: 'Which CSK bowler will take most wickets this season?',
    options: [
      { text: 'Matheesha Pathirana', votes: 312 },
      { text: 'Ravindra Jadeja', votes: 278 },
      { text: 'Tushar Deshpande', votes: 145 },
      { text: 'Deepak Chahar', votes: 89 }
    ],
    totalVotes: 824,
    category: 'Bowling',
    active: true
  },
  {
    _id: '3',
    question: 'What is CSK\'s biggest strength in IPL 2025?',
    options: [
      { text: 'Powerful Batting Lineup', votes: 423 },
      { text: 'Experienced Leadership', votes: 367 },
      { text: 'Death Bowling Specialists', votes: 234 },
      { text: 'Fielding Excellence', votes: 178 }
    ],
    totalVotes: 1202,
    category: 'Team',
    active: true
  },
  {
    _id: '4',
    question: 'Which CSK player will win Man of the Tournament?',
    options: [
      { text: 'MS Dhoni', votes: 567 },
      { text: 'Ruturaj Gaikwad', votes: 445 },
      { text: 'Ravindra Jadeja', votes: 389 },
      { text: 'Shivam Dube', votes: 267 }
    ],
    totalVotes: 1668,
    category: 'Awards',
    active: true
  }
];

// Players API - using local data only
export const getPlayers = async (role = '', season = '2025') => {
  console.log('Using local player data');
  let players = cskPlayersData;
  if (role && role !== 'All') {
    players = players.filter(p => p.role === role);
  }
  return { success: true, data: players };
};

export const getPlayer = async (id) => {
  console.log('Using local player data');
  const player = cskPlayersData.find(p => p._id === id || p.id === id);
  if (!player) {
    throw new Error('Player not found');
  }
  return { success: true, data: player };
};

// Matches API - using local data only
export const getMatches = async (status = '', season = '2025') => {
  console.log('Using local matches data');
  let matches = mergedMatchesData;
  
  if (status === 'upcoming') {
    matches = matches.filter(m => m.status === 'upcoming');
  } else if (status === 'completed') {
    matches = matches.filter(m => m.status === 'completed');
  } else if (status === 'live') {
    matches = matches.filter(m => m.status === 'live');
  }
  
  return { success: true, data: matches };
};

export const getMatchDetails = async (matchId) => {
  console.log('Using local match data');
  const match = mergedMatchesData.find(m =>
    (m._id === matchId || m.matchId === matchId)
  );

  if (!match) {
    throw new Error('Match not found');
  }
  
  return { success: true, data: match };
};

export const getUpcomingMatches = async () => {
  console.log('Using local upcoming matches data');
  const upcoming = mergedMatchesData.filter(m => m.status === 'upcoming');
  return { success: true, data: upcoming };
};

export const getLiveMatches = async () => {
  console.log('Using local live matches data');
  const live = mergedMatchesData.filter(m => m.status === 'live');
  return { success: true, data: live };
};

export const getCompletedMatches = async () => {
  console.log('Using local completed matches data');
  const completed = mergedMatchesData.filter(m => m.status === 'completed');
  return { success: true, data: completed };
};

// Statistics API - using mock data
export const getTeamStats = async (season = '2025') => {
  console.log('Using mock team stats');
  return {
    success: true,
    data: {
      matchesPlayed: 14,
      wins: 9,
      losses: 5,
      netRunRate: 0.45,
      points: 18,
      position: 2
    }
  };
};

export const getTopBatsmen = async (season = '2025', limit = 5) => {
  console.log('Using mock top batsmen data');
  const batsmen = cskPlayersData
    .filter(p => p.role === 'Batsman' || p.role === 'All-rounder')
    .slice(0, limit)
    .map(p => ({
      ...p,
      runs: Math.floor(Math.random() * 500) + 100,
      average: (Math.random() * 30 + 20).toFixed(2),
      strikeRate: (Math.random() * 50 + 120).toFixed(2)
    }));
  
  return { success: true, data: batsmen };
};

export const getTopBowlers = async (season = '2025', limit = 5) => {
  console.log('Using mock top bowlers data');
  const bowlers = cskPlayersData
    .filter(p => p.role === 'Bowler' || p.role === 'All-rounder')
    .slice(0, limit)
    .map(p => ({
      ...p,
      wickets: Math.floor(Math.random() * 20) + 5,
      average: (Math.random() * 10 + 15).toFixed(2),
      economy: (Math.random() * 2 + 6).toFixed(2)
    }));
  
  return { success: true, data: bowlers };
};

export const getComparisonData = async () => {
  console.log('Using mock comparison data');
  return {
    success: true,
    data: [
      { team: 'CSK', wins: 9, losses: 5, nrr: 0.45, matches: 14, points: 18 },
      { team: 'MI', wins: 8, losses: 6, nrr: 0.32, matches: 14, points: 16 },
      { team: 'RCB', wins: 7, losses: 7, nrr: -0.12, matches: 14, points: 14 },
      { team: 'KKR', wins: 7, losses: 7, nrr: -0.05, matches: 14, points: 14 },
      { team: 'DC', wins: 6, losses: 8, nrr: -0.18, matches: 14, points: 12 },
      { team: 'PBKS', wins: 6, losses: 8, nrr: -0.25, matches: 14, points: 12 }
    ]
  };
};

// Polls API - using mock data
export const getPolls = async () => {
  console.log('Using mock polls data');
  return { success: true, data: mockPolls };
};

export const votePoll = async (pollId, optionIndex) => {
  console.log('Mock vote on poll:', pollId, 'option:', optionIndex);
  
  // Find the poll and update the vote counts
  const poll = mockPolls.find(p => p._id === pollId);
  if (poll && optionIndex >= 0 && optionIndex < poll.options.length) {
    // Increment the vote count for the selected option
    poll.options[optionIndex].votes += 1;
    // Increment total votes
    poll.totalVotes += 1;
    
    return { 
      success: true, 
      message: 'Vote recorded successfully',
      data: poll // Return updated poll data
    };
  }
  
  return { success: false, message: 'Invalid poll or option' };
};

// News API - using mock data
export const getNews = async () => {
  console.log('Using mock news data');
  return { success: true, data: mockNews };
};

// Iconic Moments API - using mock data
export const getIconicMoments = async (category = '', season = '', featured = false) => {
  console.log('Using mock iconic moments data');
  let moments = mockIconicMoments;
  
  if (category) {
    moments = moments.filter(m => m.category === category);
  }
  if (season) {
    moments = moments.filter(m => m.season === season);
  }
  if (featured) {
    moments = moments.filter(m => m.featured);
  }
  
  return { success: true, data: moments };
};

// Feedback API - mock functionality
export const submitFeedback = async (feedbackData) => {
  console.log('Mock feedback submission:', feedbackData);
  return { success: true, message: 'Feedback submitted successfully' };
};

const apiService = null; // No axios instance needed for standalone

export default apiService;
