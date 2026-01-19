# 🦁 CSK Universe - Chennai Super Kings Fan Hub

A modern, interactive web application for Chennai Super Kings fans to stay connected with their favorite IPL team.

## 📋 Table of Contents

- [🌟 Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🛠️ Technologies Used](#️-technologies-used)
- [📱 Pages & Components](#-pages--components)
- [🔧 Configuration](#-configuration)
- [📊 Data Sources](#-data-sources)
- [🎨 Customization](#-customization)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📞 Contact](#-contact)

## 🌟 Features

### Core Functionality
- **📊 Live Match Tracking**: View upcoming, live, and completed matches
- **👥 Player Statistics**: Detailed player profiles with performance metrics
- **📰 News & Updates**: Latest CSK news and announcements
- **🏆 Iconic Moments**: Relive historic CSK victories and memorable matches
- **🗳 Fan Polls**: Interactive voting on team-related topics
- **💬 Fan Zone**: Community wall for fan discussions
- **📈 Team Comparisons**: Compare CSK performance with other IPL teams
- **📧 Contact System**: Direct communication channels

### Interactive Elements
- **🎯 Responsive Design**: Optimized for desktop, tablet, and mobile
- **⚡ Real-time Updates**: Live match scores and polling
- **🎨 Modern UI**: Beautiful CSK-themed interface with animations
- **📱 Mobile-First**: Touch-friendly interactions and navigation

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bhagyashri05-collab/ShadowFox_IPLTeamWebsite-master.git
   cd ShadowFox_IPLTeamWebsite-master/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### Build for Production
```bash
npm run build
```

## 📁 Project Structure

```
ShadowFox_IPLTeamWebsite-master/
├── frontend/                    # Main React application
│   ├── public/                # Static assets
│   │   ├── images/            # CSK images and assets
│   │   └── index.html
│   ├── src/                   # Source code
│   │   ├── components/        # Reusable React components
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   └── Scorecard.js
│   │   ├── pages/             # Main application pages
│   │   │   ├── Home.js
│   │   │   ├── Squad.js
│   │   │   ├── Matches.js
│   │   │   ├── PlayerDetail.js
│   │   │   ├── IconicMoments.js
│   │   │   ├── Comparison.js
│   │   │   ├── News.js
│   │   │   ├── FanZone.js
│   │   │   ├── About.js
│   │   │   └── Contact.js
│   │   ├── data/              # JSON data files
│   │   │   ├── playerData.json
│   │   │   ├── matchesData.json
│   │   │   ├── iconicMomentsData.json
│   │   │   └── cskPlayersData.json
│   │   ├── services/           # API services
│   │   │   └── api.js
│   │   ├── App.js             # Main App component
│   │   ├── index.js           # React DOM render
│   │   └── index.css          # Global styles
│   ├── package.json            # Dependencies and scripts
│   └── tailwind.config.js      # Tailwind CSS config
├── START.bat                 # Windows startup script
└── README.md                # This file
```

## 🛠️ Technologies Used

### Frontend Stack
- **⚛️ React 18.2.0** - Core UI framework
- **🎨 Tailwind CSS 3.3.6** - Utility-first CSS framework
- **📊 Recharts 2.10.3** - Data visualization library
- **🎭 Framer Motion 10.16.16** - Animation library
- **🧭 React Router 6.20.1** - Client-side routing
- **⚡ Lucide React 0.294.0** - Icon library
- **🎯 React Icons 4.12.0** - Additional icon set

### Development Tools
- **⚛️ React Scripts 5.0.1** - Build and development tooling
- **📱 PostCSS 8.4.32** - CSS post-processing
- **🎨 Autoprefixer 10.4.16** - CSS vendor prefixes

## 📱 Pages & Components

### Main Pages
1. **🏠 Home** - Landing page with team overview
2. **👥 Squad** - Player roster and profiles
3. **📊 Matches** - Match schedules and results
4. **📊 Player Detail** - Individual player statistics
5. **🏆 Iconic Moments** - Historic achievements gallery
6. **📈 Comparison** - Team performance analytics
7. **📰 News** - Latest updates and articles
8. **💬 Fan Zone** - Community interaction
9. **📖 About** - Team history and information
10. **📧 Contact** - Support and feedback

### Key Components
- **🧭 Navbar** - Navigation with active state
- **📄 Footer** - Site information and links
- **📊 Scorecard** - Match score display

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the `frontend` directory:
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_TEAM_NAME=CSK
```

### Customization
- **🎨 Theme Colors**: Modify CSS variables in `index.css`
- **📱 Breakpoints**: Update Tailwind config in `tailwind.config.js`
- **📊 Data Sources**: Update JSON files in `src/data/`

## 📊 Data Sources

### Static Data Files
- **`playerData.json`** - Complete player statistics
- **`matchesData.json`** - Match schedules and results
- **`iconicMomentsData.json`** - Historic moments and achievements
- **`cskPlayersData.json`** - Current squad information

### API Integration
The application uses mock data for standalone functionality but includes prepared API endpoints:
- **Player endpoints** - Statistics and profiles
- **Match endpoints** - Live scores and schedules
- **Poll endpoints** - Interactive voting system
- **News endpoints** - Articles and updates

## 🎨 Customization

### Brand Colors
```css
:root {
  --csk-yellow: #F9CD05;
  --csk-blue: #005FA0;
  --csk-green: #22C55E;
}
```

### Adding New Content
1. **Players**: Add to `data/playerData.json`
2. **Matches**: Update `data/matchesData.json`
3. **News**: Create entries in `services/api.js`
4. **Images**: Add to `public/images/` folder

## 🚀 Deployment

### Static Site Hosting
1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy `build` folder** to your hosting provider

### Recommended Platforms
- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop `build` folder
- **GitHub Pages**: Configure in repository settings
- **AWS S3**: Upload `build` folder to S3 bucket

### Environment-Specific Builds
- **Development**: `npm start` (Hot reload enabled)
- **Production**: `npm run build` (Optimized bundle)

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Workflow
1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Make changes**: Follow existing code style
4. **Test thoroughly**: Ensure all features work
5. **Commit changes**: `git commit -m 'Add amazing feature'`
6. **Push to fork**: `git push origin feature/amazing-feature`
7. **Create Pull Request**: Describe your changes

### Code Style Guidelines
- **🎨 Use Tailwind classes** for styling
- **📱 Mobile-first approach** for responsive design
- **⚛️ Functional components** with React hooks
- **📝 Clear naming** for files and variables
- **🎯 Performance optimization** for images and animations

### Areas for Contribution
- **🐛 Bug fixes** and performance improvements
- **✨ New features** and components
- **📊 Data updates** and accuracy improvements
- **🎨 UI/UX enhancements** and animations
- **📱 Mobile responsiveness** improvements

## 📞 Contact

### Project Maintainer
- **👤 Name**: Bhagyashri Wale
- **📧 Email**: bhagyashriwale05@gmail.com
- **📱 Phone**: +91 85304 69036
- **🌐 Repository**: https://github.com/bhagyashri05-collab/ShadowFox_IPLTeamWebsite-master

### Support Channels
- **💬 Support Email**: support@cskuniverse.com
- **🐛 Bug Reports**: Use GitHub Issues
- **💡 Feature Requests**: Use GitHub Discussions
- **📱 Social Media**: Follow CSK official channels

## 🏆 Acknowledgments

### Special Thanks
- **Chennai Super Kings** - Inspiration and team data
- **IPL Official** - Match statistics and schedules
- **React Community** - Amazing frameworks and tools
- **CSK Fan Community** - Feedback and suggestions

  ### Live Demo
  https://csk-fan-by-bhagyashri.netlify.app/

### License
This project is for educational and fan engagement purposes. All team logos, player images, and official data belong to their respective owners.

---

## 🎉 Made with ❤️ for CSK Fans

**Whistle Podu! 🦁💛**

*Built by fans, for fans - celebrating the legacy of Chennai Super Kings*
