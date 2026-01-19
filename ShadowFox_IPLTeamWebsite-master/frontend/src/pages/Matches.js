import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Trophy, TrendingUp, FileText } from 'lucide-react';
import { getMatches } from '../services/api';
import Scorecard from '../components/Scorecard';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [filter, setFilter] = useState('All');
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

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      // Sample IPL 2025 matches with detailed scorecards
      const sampleMatches = [
        {
          _id: '1',
          matchNumber: 1,
          opponent: 'Mumbai Indians',
          venue: 'M. A. Chidambaram Stadium, Chennai',
          date: '2025-03-22',
          time: '7:30 PM IST',
          status: 'Completed',
          result: { 
            winner: 'CSK', 
            summary: 'CSK won by 13 runs' 
          },
          scores: {
            csk: { runs: 178, wickets: 4, overs: 20 },
            opponent: { runs: 165, wickets: 8, overs: 20 }
          },
          tossWinner: 'CSK',
          tossDecision: 'bat',
          playerOfMatch: 'Ruturaj Gaikwad',
          umpires: ['Nitin Menon', 'K N Ananthapillai'],
          thirdUmpire: 'Ulhas Gandhe',
          matchReferee: 'Javagal Srinath',
          cskBatting: [
            { name: 'Ruturaj Gaikwad', runs: 65, balls: 42, fours: 8, sixes: 2, notOut: true, strikeRate: 154.76 },
            { name: 'Devon Conway', runs: 45, balls: 38, fours: 5, sixes: 1, notOut: false, strikeRate: 118.42, out: 'c Rohit b Bumrah' },
            { name: 'Ajinkya Rahane', runs: 12, balls: 15, fours: 1, sixes: 0, notOut: false, strikeRate: 80.00, out: 'c Suryakumar b Coetzee' },
            { name: 'MS Dhoni (c)', runs: 18, balls: 12, fours: 1, sixes: 1, notOut: false, strikeRate: 150.00, out: 'c Ishan b Piyush' },
            { name: 'Shivam Dube', runs: 25, balls: 18, fours: 2, sixes: 1, notOut: false, strikeRate: 138.89, out: 'c Hardik b Bumrah' },
            { name: 'Ravindra Jadeja', runs: 8, balls: 10, fours: 0, sixes: 0, notOut: false, strikeRate: 80.00, out: 'c Suryakumar b Chahar' },
            { name: 'Moeen Ali', runs: 3, balls: 5, fours: 0, sixes: 0, notOut: false, strikeRate: 60.00, out: 'c Rohit b Piyush' },
            { name: 'Deepak Chahar', runs: 0, balls: 1, fours: 0, sixes: 0, notOut: false, strikeRate: 0.00, out: 'c Ishan b Coetzee' },
            { name: 'Tushar Deshpande', runs: 1, balls: 2, fours: 0, sixes: 0, notOut: false, strikeRate: 50.00, out: 'c Hardik b Bumrah' },
            { name: 'Matheesha Pathirana', runs: 1, balls: 1, fours: 0, sixes: 0, notOut: false, strikeRate: 100.00, out: 'run out' },
            { name: 'Akash Singh', runs: 0, balls: 0, fours: 0, sixes: 0, notOut: true, strikeRate: 0.00 }
          ],
          cskBowling: [
            { name: 'Deepak Chahar', overs: 4, maidens: 0, runs: 32, wickets: 2, economy: 8.00 },
            { name: 'Tushar Deshpande', overs: 4, maidens: 0, runs: 28, wickets: 1, economy: 7.00 },
            { name: 'Matheesha Pathirana', overs: 4, maidens: 0, runs: 35, wickets: 2, economy: 8.75 },
            { name: 'Ravindra Jadeja', overs: 4, maidens: 0, runs: 24, wickets: 1, economy: 6.00 },
            { name: 'Moeen Ali', overs: 4, maidens: 0, runs: 38, wickets: 1, economy: 9.50 },
            { name: 'Akash Singh', overs: 0, maidens: 0, runs: 8, wickets: 1, economy: 0.00 }
          ],
          cskExtras: { wides: 8, noBalls: 2, legByes: 4, byes: 1, total: 15 },
          opponentBatting: [
            { name: 'Rohit Sharma (c)', runs: 28, balls: 25, fours: 3, sixes: 1, notOut: false, strikeRate: 112.00, out: 'c Conway b Pathirana' },
            { name: 'Ishan Kishan', runs: 15, balls: 18, fours: 2, sixes: 0, notOut: false, strikeRate: 83.33, out: 'c Rahane b Chahar' },
            { name: 'Suryakumar Yadav', runs: 42, balls: 28, fours: 4, sixes: 2, notOut: false, strikeRate: 150.00, out: 'c Dhoni b Jadeja' },
            { name: 'Tilak Varma', runs: 35, balls: 30, fours: 3, sixes: 1, notOut: false, strikeRate: 116.67, out: 'c Dube b Deshpande' },
            { name: 'Hardik Pandya', runs: 18, balls: 15, fours: 1, sixes: 1, notOut: false, strikeRate: 120.00, out: 'c Moeen b Pathirana' },
            { name: 'Tim David', runs: 12, balls: 8, fours: 1, sixes: 1, notOut: false, strikeRate: 150.00, out: 'c Gaikwad b Chahar' },
            { name: 'Cameron Green', runs: 8, balls: 10, fours: 0, sixes: 0, notOut: false, strikeRate: 80.00, out: 'c Dhoni b Jadeja' },
            { name: 'Gerald Coetzee', runs: 3, balls: 5, fours: 0, sixes: 0, notOut: false, strikeRate: 60.00, out: 'c Conway b Moeen' },
            { name: 'Piyush Chawla', runs: 2, balls: 3, fours: 0, sixes: 0, notOut: false, strikeRate: 66.67, out: 'c Gaikwad b Akash' },
            { name: 'Jasprit Bumrah', runs: 0, balls: 1, fours: 0, sixes: 0, notOut: true, strikeRate: 0.00 }
          ],
          opponentBowling: [
            { name: 'Jasprit Bumrah', overs: 4, maidens: 0, runs: 28, wickets: 2, economy: 7.00 },
            { name: 'Gerald Coetzee', overs: 4, maidens: 0, runs: 35, wickets: 2, economy: 8.75 },
            { name: 'Piyush Chawla', overs: 4, maidens: 0, runs: 32, wickets: 1, economy: 8.00 },
            { name: 'Cameron Green', overs: 4, maidens: 0, runs: 38, wickets: 0, economy: 9.50 },
            { name: 'Tim David', overs: 2, maidens: 0, runs: 22, wickets: 0, economy: 11.00 },
            { name: 'Hardik Pandya', overs: 2, maidens: 0, runs: 10, wickets: 0, economy: 5.00 }
          ],
          opponentExtras: { wides: 6, noBalls: 1, legByes: 3, byes: 2, total: 12 }
        },
        {
          _id: '2',
          matchNumber: 2,
          opponent: 'Royal Challengers Bengaluru',
          venue: 'M. Chinnaswamy Stadium, Bengaluru',
          date: '2025-03-25',
          time: '7:30 PM IST',
          status: 'Completed',
          result: { 
            winner: 'CSK', 
            summary: 'CSK won by 7 runs' 
          },
          scores: {
            csk: { runs: 195, wickets: 5, overs: 20 },
            opponent: { runs: 188, wickets: 7, overs: 20 }
          },
          tossWinner: 'RCB',
          tossDecision: 'bat',
          playerOfMatch: 'Shivam Dube',
          umpires: ['Anil Chaudhary', 'Virender Sharma'],
          thirdUmpire: 'Paul Reiffel',
          matchReferee: 'Manu Nayak',
          cskBatting: [
            { name: 'Ruturaj Gaikwad', runs: 42, balls: 35, fours: 5, sixes: 1, notOut: false, strikeRate: 120.00, out: 'c Faf b Siraj' },
            { name: 'Devon Conway', runs: 38, balls: 32, fours: 4, sixes: 1, notOut: false, strikeRate: 118.75, out: 'c Maxi b Hazlewood' },
            { name: 'Ajinkya Rahane', runs: 15, balls: 18, fours: 2, sixes: 0, notOut: false, strikeRate: 83.33, out: 'c Dinesh b Green' },
            { name: 'MS Dhoni (c)', runs: 12, balls: 10, fours: 1, sixes: 0, notOut: false, strikeRate: 120.00, out: 'c Faf b Siraj' },
            { name: 'Shivam Dube', runs: 68, balls: 38, fours: 7, sixes: 3, notOut: false, strikeRate: 178.95, out: 'c Karn b Hazlewood' },
            { name: 'Ravindra Jadeja', runs: 8, balls: 12, fours: 0, sixes: 0, notOut: false, strikeRate: 66.67, out: 'c Dinesh b Maxwell' },
            { name: 'Moeen Ali', runs: 4, balls: 6, fours: 0, sixes: 0, notOut: false, strikeRate: 66.67, out: 'c Faf b Green' },
            { name: 'Deepak Chahar', runs: 2, balls: 3, fours: 0, sixes: 0, notOut: false, strikeRate: 66.67, out: 'c Karthik b Siraj' },
            { name: 'Tushar Deshpande', runs: 4, balls: 4, fours: 0, sixes: 0, notOut: false, strikeRate: 100.00, out: 'c Karthik b Maxwell' },
            { name: 'Matheesha Pathirana', runs: 2, balls: 2, fours: 0, sixes: 0, notOut: true, strikeRate: 100.00 }
          ],
          cskBowling: [
            { name: 'Deepak Chahar', overs: 4, maidens: 0, runs: 42, wickets: 1, economy: 10.50 },
            { name: 'Tushar Deshpande', overs: 4, maidens: 0, runs: 38, wickets: 2, economy: 9.50 },
            { name: 'Matheesha Pathirana', overs: 4, maidens: 0, runs: 35, wickets: 2, economy: 8.75 },
            { name: 'Ravindra Jadeja', overs: 4, maidens: 0, runs: 28, wickets: 1, economy: 7.00 },
            { name: 'Moeen Ali', overs: 4, maidens: 0, runs: 32, wickets: 0, economy: 8.00 },
            { name: 'Shivam Dube', overs: 0, maidens: 0, runs: 13, wickets: 1, economy: 0.00 }
          ],
          cskExtras: { wides: 10, noBalls: 3, legByes: 5, byes: 2, total: 20 },
          opponentBatting: [
            { name: 'Faf du Plessis (c)', runs: 55, balls: 42, fours: 6, sixes: 2, notOut: false, strikeRate: 130.95, out: 'c Conway b Pathirana' },
            { name: 'Virat Kohli', runs: 38, balls: 32, fours: 4, sixes: 1, notOut: false, strikeRate: 118.75, out: 'c Gaikwad b Deshpande' },
            { name: 'Rajat Patidar', runs: 22, balls: 18, fours: 2, sixes: 1, notOut: false, strikeRate: 122.22, out: 'c Dhoni b Chahar' },
            { name: 'Glenn Maxwell', runs: 28, balls: 20, fours: 2, sixes: 2, notOut: false, strikeRate: 140.00, out: 'c Jadeja b Dube' },
            { name: 'Dinesh Karthik', runs: 18, balls: 12, fours: 2, sixes: 1, notOut: false, strikeRate: 150.00, out: 'c Gaikwad b Jadeja' },
            { name: 'Cameron Green', runs: 12, balls: 10, fours: 1, sixes: 0, notOut: false, strikeRate: 120.00, out: 'c Conway b Pathirana' },
            { name: 'Karn Sharma', runs: 6, balls: 8, fours: 0, sixes: 0, notOut: false, strikeRate: 75.00, out: 'c Dhoni b Jadeja' },
            { name: 'Mohammed Siraj', runs: 3, balls: 4, fours: 0, sixes: 0, notOut: false, strikeRate: 75.00, out: 'c Gaikwad b Deshpande' },
            { name: 'Josh Hazlewood', runs: 2, balls: 3, fours: 0, sixes: 0, notOut: false, strikeRate: 66.67, out: 'c Moeen b Dube' },
            { name: 'Lockie Ferguson', runs: 2, balls: 2, fours: 0, sixes: 0, notOut: true, strikeRate: 100.00 }
          ],
          opponentBowling: [
            { name: 'Mohammed Siraj', overs: 4, maidens: 0, runs: 38, wickets: 2, economy: 9.50 },
            { name: 'Josh Hazlewood', overs: 4, maidens: 0, runs: 35, wickets: 2, economy: 8.75 },
            { name: 'Lockie Ferguson', overs: 4, maidens: 0, runs: 42, wickets: 1, economy: 10.50 },
            { name: 'Cameron Green', overs: 4, maidens: 0, runs: 32, wickets: 1, economy: 8.00 },
            { name: 'Karn Sharma', overs: 4, maidens: 0, runs: 28, wickets: 1, economy: 7.00 },
            { name: 'Glenn Maxwell', overs: 0, maidens: 0, runs: 13, wickets: 0, economy: 0.00 }
          ],
          opponentExtras: { wides: 8, noBalls: 2, legByes: 4, byes: 1, total: 15 }
        },
        {
          _id: '3',
          matchNumber: 3,
          opponent: 'Kolkata Knight Riders',
          venue: 'Eden Gardens, Kolkata',
          date: '2025-03-28',
          time: '7:30 PM IST',
          status: 'Completed',
          result: { 
            winner: 'KKR', 
            summary: 'KKR won by 6 wickets' 
          },
          scores: {
            csk: { runs: 172, wickets: 6, overs: 20 },
            opponent: { runs: 175, wickets: 4, overs: 19.2 }
          },
          tossWinner: 'KKR',
          tossDecision: 'field',
          playerOfMatch: 'Sunil Narine',
          umpires: ['Nitin Menon', 'K N Ananthapillai'],
          thirdUmpire: 'Ulhas Gandhe',
          matchReferee: 'Javagal Srinath',
          cskBatting: [
            { name: 'Ruturaj Gaikwad', runs: 52, balls: 40, fours: 6, sixes: 2, notOut: false, strikeRate: 130.00, out: 'c Rinku b Narine' },
            { name: 'Devon Conway', runs: 28, balls: 25, fours: 3, sixes: 0, notOut: false, strikeRate: 112.00, out: 'c Russell b Chakaravarthy' },
            { name: 'Ajinkya Rahane', runs: 18, balls: 22, fours: 2, sixes: 0, notOut: false, strikeRate: 81.82, out: 'c Venkatesh b Starc' },
            { name: 'MS Dhoni (c)', runs: 25, balls: 18, fours: 2, sixes: 1, notOut: false, strikeRate: 138.89, out: 'c Rinku b Narine' },
            { name: 'Shivam Dube', runs: 22, balls: 15, fours: 2, sixes: 1, notOut: false, strikeRate: 146.67, out: 'c Shreyas b Starc' },
            { name: 'Ravindra Jadeja', runs: 12, balls: 14, fours: 1, sixes: 0, notOut: false, strikeRate: 85.71, out: 'c Venkatesh b Chakaravarthy' },
            { name: 'Moeen Ali', runs: 8, balls: 10, fours: 1, sixes: 0, notOut: false, strikeRate: 80.00, out: 'c Russell b Arora' },
            { name: 'Deepak Chahar', runs: 3, balls: 4, fours: 0, sixes: 0, notOut: false, strikeRate: 75.00, out: 'c Rinku b Starc' },
            { name: 'Tushar Deshpande', runs: 2, balls: 3, fours: 0, sixes: 0, notOut: false, strikeRate: 66.67, out: 'c Shreyas b Narine' },
            { name: 'Matheesha Pathirana', runs: 2, balls: 2, fours: 0, sixes: 0, notOut: true, strikeRate: 100.00 }
          ],
          cskBowling: [
            { name: 'Deepak Chahar', overs: 4, maidens: 0, runs: 38, wickets: 1, economy: 9.50 },
            { name: 'Tushar Deshpande', overs: 4, maidens: 0, runs: 42, wickets: 1, economy: 10.50 },
            { name: 'Matheesha Pathirana', overs: 4, maidens: 0, runs: 35, wickets: 1, economy: 8.75 },
            { name: 'Ravindra Jadeja', overs: 4, maidens: 0, runs: 28, wickets: 0, economy: 7.00 },
            { name: 'Moeen Ali', overs: 4, maidens: 0, runs: 25, wickets: 1, economy: 6.25 },
            { name: 'Shivam Dube', overs: 0, maidens: 0, runs: 7, wickets: 0, economy: 0.00 }
          ],
          cskExtras: { wides: 7, noBalls: 2, legByes: 3, byes: 1, total: 13 },
          opponentBatting: [
            { name: 'Sunil Narine', runs: 68, balls: 35, fours: 8, sixes: 3, notOut: false, strikeRate: 194.29, out: 'c Dhoni b Jadeja' },
            { name: 'Phil Salt', runs: 35, balls: 28, fours: 4, sixes: 1, notOut: false, strikeRate: 125.00, out: 'c Conway b Chahar' },
            { name: 'Shreyas Iyer (c)', runs: 22, balls: 18, fours: 2, sixes: 1, notOut: false, strikeRate: 122.22, out: 'c Gaikwad b Deshpande' },
            { name: 'Venkatesh Iyer', runs: 18, balls: 15, fours: 2, sixes: 0, notOut: false, strikeRate: 120.00, out: 'c Dhoni b Pathirana' },
            { name: 'Rinku Singh', runs: 25, balls: 20, fours: 2, sixes: 1, notOut: true, strikeRate: 125.00 },
            { name: 'Andre Russell', runs: 5, balls: 8, fours: 0, sixes: 0, notOut: false, strikeRate: 62.50, out: 'c Gaikwad b Moeen' },
            { name: 'Ramandeep Singh', runs: 2, balls: 4, fours: 0, sixes: 0, notOut: false, strikeRate: 50.00, out: 'c Dhoni b Chahar' }
          ],
          opponentBowling: [
            { name: 'Mitchell Starc', overs: 4, maidens: 0, runs: 42, wickets: 2, economy: 10.50 },
            { name: 'Varun Chakaravarthy', overs: 4, maidens: 0, runs: 28, wickets: 2, economy: 7.00 },
            { name: 'Sunil Narine', overs: 4, maidens: 0, runs: 25, wickets: 2, economy: 6.25 },
            { name: 'Harshit Rana', overs: 3.2, maidens: 0, runs: 35, wickets: 0, economy: 10.50 },
            { name: 'Andre Russell', overs: 4, maidens: 0, runs: 38, wickets: 0, economy: 9.50 },
            { name: 'Venkatesh Iyer', overs: 0, maidens: 0, runs: 7, wickets: 0, economy: 0.00 }
          ],
          opponentExtras: { wides: 6, noBalls: 1, legByes: 2, byes: 1, total: 10 }
        },
        {
          _id: '4',
          matchNumber: 4,
          opponent: 'Rajasthan Royals',
          venue: 'Sawai Mansingh Stadium, Jaipur',
          date: '2025-04-01',
          time: '7:30 PM IST',
          status: 'Upcoming',
          result: null,
          scores: null,
          tossWinner: null,
          tossDecision: null,
          playerOfMatch: null,
          umpires: ['Anil Chaudhary', 'Virender Sharma'],
          thirdUmpire: 'Paul Reiffel',
          matchReferee: 'Manu Nayak'
        },
        {
          _id: '5',
          matchNumber: 5,
          opponent: 'Delhi Capitals',
          venue: 'Arun Jaitley Stadium, Delhi',
          date: '2025-04-05',
          time: '7:30 PM IST',
          status: 'Upcoming',
          result: null,
          scores: null,
          tossWinner: null,
          tossDecision: null,
          playerOfMatch: null,
          umpires: ['Nitin Menon', 'K N Ananthapillai'],
          thirdUmpire: 'Ulhas Gandhe',
          matchReferee: 'Javagal Srinath'
        },
        {
          _id: '6',
          matchNumber: 6,
          opponent: 'Punjab Kings',
          venue: 'M. A. Chidambaram Stadium, Chennai',
          date: '2025-04-08',
          time: '7:30 PM IST',
          status: 'Live',
          result: null,
          scores: {
            csk: { runs: 145, wickets: 3, overs: 18.2 },
            opponent: { runs: 120, wickets: 4, overs: 15.4 }
          },
          tossWinner: 'CSK',
          tossDecision: 'bat',
          playerOfMatch: null,
          umpires: ['Anil Chaudhary', 'Virender Sharma'],
          thirdUmpire: 'Paul Reiffel',
          matchReferee: 'Manu Nayak'
        },
        {
          _id: '7',
          matchNumber: 7,
          opponent: 'Sunrisers Hyderabad',
          venue: 'Rajiv Gandhi International Stadium, Hyderabad',
          date: '2025-04-12',
          time: '7:30 PM IST',
          status: 'Upcoming',
          result: null,
          scores: null,
          tossWinner: null,
          tossDecision: null,
          playerOfMatch: null,
          umpires: ['Nitin Menon', 'K N Ananthapillai'],
          thirdUmpire: 'Ulhas Gandhe',
          matchReferee: 'Javagal Srinath'
        },
        {
          _id: '8',
          matchNumber: 8,
          opponent: 'Gujarat Titans',
          venue: 'Narendra Modi Stadium, Ahmedabad',
          date: '2025-04-15',
          time: '7:30 PM IST',
          status: 'Upcoming',
          result: null,
          scores: null,
          tossWinner: null,
          tossDecision: null,
          playerOfMatch: null,
          umpires: ['Anil Chaudhary', 'Virender Sharma'],
          thirdUmpire: 'Paul Reiffel',
          matchReferee: 'Manu Nayak'
        },
        {
          _id: '9',
          matchNumber: 9,
          opponent: 'Lucknow Super Giants',
          venue: 'M. A. Chidambaram Stadium, Chennai',
          date: '2025-04-18',
          time: '7:30 PM IST',
          status: 'Upcoming',
          result: null,
          scores: null,
          tossWinner: null,
          tossDecision: null,
          playerOfMatch: null,
          umpires: ['Nitin Menon', 'K N Ananthapillai'],
          thirdUmpire: 'Ulhas Gandhe',
          matchReferee: 'Javagal Srinath'
        },
        {
          _id: '10',
          matchNumber: 10,
          opponent: 'Royal Challengers Bengaluru',
          venue: 'M. A. Chidambaram Stadium, Chennai',
          date: '2025-04-22',
          time: '7:30 PM IST',
          status: 'Upcoming',
          result: null,
          scores: null,
          tossWinner: null,
          tossDecision: null,
          playerOfMatch: null,
          umpires: ['Anil Chaudhary', 'Virender Sharma'],
          thirdUmpire: 'Paul Reiffel',
          matchReferee: 'Manu Nayak'
        },
        {
          _id: '11',
          matchNumber: 11,
          opponent: 'Mumbai Indians',
          venue: 'Wankhede Stadium, Mumbai',
          date: '2025-04-25',
          time: '7:30 PM IST',
          status: 'Upcoming',
          result: null,
          scores: null,
          tossWinner: null,
          tossDecision: null,
          playerOfMatch: null,
          umpires: ['Nitin Menon', 'K N Ananthapillai'],
          thirdUmpire: 'Ulhas Gandhe',
          matchReferee: 'Javagal Srinath'
        },
        {
          _id: '12',
          matchNumber: 12,
          opponent: 'Kolkata Knight Riders',
          venue: 'M. A. Chidambaram Stadium, Chennai',
          date: '2025-04-28',
          time: '7:30 PM IST',
          status: 'Upcoming',
          result: null,
          scores: null,
          tossWinner: null,
          tossDecision: null,
          playerOfMatch: null,
          umpires: ['Anil Chaudhary', 'Virender Sharma'],
          thirdUmpire: 'Paul Reiffel',
          matchReferee: 'Manu Nayak'
        },
        {
          _id: '13',
          matchNumber: 13,
          opponent: 'Rajasthan Royals',
          venue: 'M. A. Chidambaram Stadium, Chennai',
          date: '2025-05-02',
          time: '7:30 PM IST',
          status: 'Upcoming',
          result: null,
          scores: null,
          tossWinner: null,
          tossDecision: null,
          playerOfMatch: null,
          umpires: ['Nitin Menon', 'K N Ananthapillai'],
          thirdUmpire: 'Ulhas Gandhe',
          matchReferee: 'Javagal Srinath'
        },
        {
          _id: '14',
          matchNumber: 14,
          opponent: 'Delhi Capitals',
          venue: 'M. A. Chidambaram Stadium, Chennai',
          date: '2025-05-05',
          time: '7:30 PM IST',
          status: 'Upcoming',
          result: null,
          scores: null,
          tossWinner: null,
          tossDecision: null,
          playerOfMatch: null,
          umpires: ['Anil Chaudhary', 'Virender Sharma'],
          thirdUmpire: 'Paul Reiffel',
          matchReferee: 'Manu Nayak'
        },
        {
          _id: '15',
          matchNumber: 15,
          opponent: 'Punjab Kings',
          venue: 'PCA Stadium, Mohali',
          date: '2025-05-08',
          time: '7:30 PM IST',
          status: 'Upcoming',
          result: null,
          scores: null,
          tossWinner: null,
          tossDecision: null,
          playerOfMatch: null,
          umpires: ['Nitin Menon', 'K N Ananthapillai'],
          thirdUmpire: 'Ulhas Gandhe',
          matchReferee: 'Javagal Srinath'
        },
        {
          _id: '16',
          matchNumber: 16,
          opponent: 'Sunrisers Hyderabad',
          venue: 'M. A. Chidambaram Stadium, Chennai',
          date: '2025-05-12',
          time: '7:30 PM IST',
          status: 'Upcoming',
          result: null,
          scores: null,
          tossWinner: null,
          tossDecision: null,
          playerOfMatch: null,
          umpires: ['Anil Chaudhary', 'Virender Sharma'],
          thirdUmpire: 'Paul Reiffel',
          matchReferee: 'Manu Nayak'
        },
        {
          _id: '17',
          matchNumber: 17,
          opponent: 'Gujarat Titans',
          venue: 'M. A. Chidambaram Stadium, Chennai',
          date: '2025-05-15',
          time: '7:30 PM IST',
          status: 'Upcoming',
          result: null,
          scores: null,
          tossWinner: null,
          tossDecision: null,
          playerOfMatch: null,
          umpires: ['Nitin Menon', 'K N Ananthapillai'],
          thirdUmpire: 'Ulhas Gandhe',
          matchReferee: 'Javagal Srinath'
        },
        {
          _id: '18',
          matchNumber: 18,
          opponent: 'Lucknow Super Giants',
          venue: 'Ekana Cricket Stadium, Lucknow',
          date: '2025-05-18',
          time: '7:30 PM IST',
          status: 'Upcoming',
          result: null,
          scores: null,
          tossWinner: null,
          tossDecision: null,
          playerOfMatch: null,
          umpires: ['Anil Chaudhary', 'Virender Sharma'],
          thirdUmpire: 'Paul Reiffel',
          matchReferee: 'Manu Nayak'
        }
      ];
      
      setMatches(sampleMatches);
    } catch (error) {
      console.error('Error setting up matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMatches = matches.filter(match => {
    if (filter === 'All') return true;
    return match.status === filter;
  });

  const getStatusColor = (status) => {
    const colors = {
      'Upcoming': 'bg-blue-500',
      'Live': 'bg-green-500 animate-pulse',
      'Completed': 'bg-gray-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

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
            Match Schedule
          </h1>
          <p className="text-xl text-gray-400">
            IPL 2025 - Chennai Super Kings
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {['All', 'Upcoming', 'Live', 'Completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${filter === status
                ? 'bg-csk-yellow text-black'
                : 'bg-gray-800 text-gray-400 hover:bg-csk-yellow/20'
                }`}
            >
              {status}
            </button>
          ))}
        </motion.div>

        {/* Matches List */}
        {filteredMatches.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">No matches found</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredMatches.map((match, index) => (
              <motion.div
                key={match._id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => (match.status === 'Completed' || match.status === 'completed') && openScorecard(match)}
                className={`glass-effect rounded-xl p-6 hover-glow ${(match.status === 'Completed' || match.status === 'completed') ? 'cursor-pointer' : ''}`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  {/* Match Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(match.status)}`}>
                        {match.status}
                      </span>
                      <span className="text-gray-400">Match #{match.matchNumber}</span>
                    </div>

                    {/* Teams */}
                    <div className="mb-4">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        CSK vs {match.opponent}
                      </h3>

                      {/* Scores for Completed/Live Matches */}
                      {match.status !== 'Upcoming' && match.scores && (
                        <div className="space-y-2 mt-4">
                          <div className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
                            <span className="font-semibold text-white">CSK</span>
                            <span className="text-xl font-bold text-csk-yellow">
                              {match.scores.csk?.runs || match.scores.rcb?.runs}/{match.scores.csk?.wickets || match.scores.rcb?.wickets}
                              <span className="text-sm text-gray-400 ml-2">
                                ({match.scores.csk?.overs || match.scores.rcb?.overs} ov)
                              </span>
                            </span>
                          </div>
                          <div className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
                            <span className="font-semibold text-white">{match.opponent}</span>
                            <span className="text-xl font-bold text-gray-300">
                              {match.scores.opponent?.runs}/{match.scores.opponent?.wickets}
                              <span className="text-sm text-gray-400 ml-2">
                                ({match.scores.opponent?.overs} ov)
                              </span>
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Result */}
                      {match.status === 'completed' && match.result && (
                        <div className={`mt-4 p-3 rounded-lg bg-gray-800 ${match.result.includes('Chennai Super Kings won') || match.result.includes('CSK won') ? 'text-green-500' : 'text-red-500'}`}>
                          <div className="flex items-center gap-2">
                            <Trophy size={20} />
                            <span className="font-semibold">{match.result}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Match Details */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{new Date(match.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{match.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{match.venue}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2">
                    {match.status === 'Completed' || match.status === 'completed' ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openScorecard(match);
                        }}
                        className="btn-primary flex items-center gap-2 whitespace-nowrap"
                      >
                        <FileText size={20} />
                        View Scorecard
                      </button>
                    ) : null}
                    {match.status === 'Live' && (
                      <button className="btn-primary flex items-center gap-2">
                        <TrendingUp size={20} />
                        Live Updates
                      </button>
                    )}
                    {match.status === 'Completed' && match.highlights && (
                      <button className="btn-secondary">
                        View Highlights
                      </button>
                    )}
                    {match.status === 'Upcoming' && (
                      <button className="btn-secondary">
                        Set Reminder
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
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

export default Matches;
