# 🌿 Emerald Plant Tracker - Advanced Cannabis Cultivation Tracker

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Docker Ready](https://img.shields.io/badge/docker-ready-blue.svg)](https://www.docker.com/)
[![GitHub Sponsors](https://img.shields.io/badge/sponsor-GitHub%20Sponsors-fc2967?logo=github)](https://github.com/sponsors/Dmans218)
[![Buy Me a Coffee](https://img.shields.io/badge/donate-Ko--fi-29abe0?logo=ko-fi)](https://ko-fi.com/emeraldplantmanager)

A comprehensive, self-hosted web application for professional cannabis cultivation management. Built with React, Express, and SQLite, featuring an advanced nutrient calculator, environmental monitoring, and complete grow tracking. Fully Dockerized for easy deployment and perfect for privacy-focused growers.

---

## ✨ Key Features

### 🧪 **Advanced Nutrient Calculator**

- **10+ Professional Nutrient Brands**: General Hydroponics, Advanced Nutrients, Fox Farm, Canna, Jack's 321, MegaCrop, and more
- **Smart Growth Stage Management**: Automatic feeding strength adjustments for seedling, vegetative, and flowering stages
- **Multi-Medium Support**: Hydroponic, Coco/Soilless, Soil, and Inert media configurations
- **Precise Mixing Ratios**: Calculate exact amounts for any tank size with watering method adjustments
- **localStorage Persistence**: Remembers your preferred settings between sessions
- **Copy-to-Clipboard Recipes**: Export complete mixing instructions with one click
- **Real-time PPM/EC Targets**: Brand-specific target ranges for optimal plant health
- **pH Guidelinegots**: Medium-specific pH recommendations (5.5-6.5 hydro, 6.0-7.0 soil)

### 🌿 **Plant Management System**
- **Complete Growth Tracking**: Monitor plants from seed to harvest across all growth stages
- **Strain Information**: Store genetics, breeder info, and cultivation notes
- **Visual Progress**: Upload photos to track plant development over time
- **Growth Timeline**: Detailed chronological view of each plant's journey
- **Harvest Management**: Track yield, quality, and curing progress

### 📊 **Environmental Monitoring**
- **Comprehensive Data Logging**: Temperature, humidity, VPD, CO₂, PPFD, pH, and light hours
- **Multi-Tent Support**: Manage multiple grow spaces with independent environmental tracking
- **Statistical Analysis**: Weekly averages and trends for environmental optimization
- **CSV Export**: Download environmental data for external analysis
- **Real-time Dashboard**: At-a-glance view of all critical environmental parameters

### 📈 **Activity & Logging System**
- **Detailed Activity Logs**: Watering, feeding, pruning, training, and general observations
- **Photo Documentation**: Visual progress tracking with timestamp and notes
- **Plant Statistics**: Automated tracking of feeding schedules and growth metrics
- **Historical Timeline**: Complete cultivation history for each plant

### 🎨 **Modern User Interface**
- **Dark Theme Design**: Cannabis-themed aesthetic with smooth animations
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Cards**: Hover effects and smooth transitions throughout the interface
- **Smart Notifications**: Real-time feedback with toast notifications
- **Intuitive Navigation**: Clean, organized layout with easy access to all features

### 🐳 **Self-Hosted & Privacy-Focused**
- **Single Docker Container**: Complete setup with one command
- **SQLite Database**: No external dependencies, simple and reliable
- **Local Data Storage**: All your cultivation data stays on your hardware
- **No Internet Required**: Runs completely offline once deployed
- **Automated Backups**: Built-in data persistence with Docker volumes

### ⚡ **Developer Experience & Code Quality**

- **PNPM Workspace**: Fast, efficient dependency management with shared packages
- **Modern ESLint Configuration**: Enforces consistent code style and catches potential issues
- **React Best Practices**: Follows current React patterns and performance optimizations
- **Clean Codebase**: Zero console statements in production, no unused variables or imports
- **Type Safety**: Proper prop validation and error handling throughout the application
- **Maintainable Architecture**: Well-organized file structure with clear separation of concerns

---

## 📁 Project Structure

This project uses a **pnpm workspace** for efficient dependency management:

```
emerald-plant-tracker/
├── frontend/              # React frontend application
│   ├── src/              # React source code
│   ├── package.json      # Frontend dependencies
│   └── vite.config.js    # Vite configuration
├── backend/              # Express.js backend API
│   ├── routes/           # API routes
│   ├── data/             # SQLite database
│   ├── uploads/          # File uploads
│   └── package.json      # Backend dependencies
├── pnpm-workspace.yaml   # Workspace configuration
├── .npmrc               # PNPM configuration
└── package.json         # Root package.json with workspace scripts
```

### 🚀 Workspace Commands

- `pnpm dev` - Start both frontend and backend in development mode
- `pnpm build` - Build all packages
- `pnpm start` - Start the backend server
- `pnpm audit` - Run security audit on all packages
- `pnpm clean` - Remove node_modules from all packages

---

## 🚀 Quick Start (Docker Hub)

You can run Emerald Plant Tracker directly from Docker Hub—no need to clone the repo!

### **Option 1: Docker Run**

```bash
sudo docker run -d \
  --name emerald-plant-tracker \
  -p 420:420 \
  -v emerald_data:/app/backend/data \
  -v emerald_uploads:/app/backend/uploads \
  dmans218/emerald-plant-tracker:latest
```

- App will be available at [http://localhost:420](http://localhost:420)
- Data is persisted in the `emerald_data` Docker volume

### **Option 2: Docker Compose**

You can use the pre-configured docker-compose.yml file:

```bash
# Download the docker-compose.yml file
curl -O https://raw.githubusercontent.com/Dmans218/emerald-plant-tracker/main/docker-compose.yml

# Start the container
sudo docker-compose up -d
```

### **Option 3: Copy & Paste Docker Compose**

For easy integration into your existing Docker stack, here's the complete `docker-compose.yml`:

```yaml
services:
  emerald-plant-tracker:
    image: dmans218/emerald-plant-tracker:latest
    container_name: emerald-plant-tracker
    ports:
      - 420:420
    volumes:
      - emerald_data:/app/backend/data
      - emerald_uploads:/app/backend/uploads
    environment:
      - NODE_ENV=production
    restart: unless-stopped
volumes:
  emerald_data:
  emerald_uploads:
networks: {}
```

**To use this:**

1. **Save as `docker-compose.yml`** in your desired directory
2. **Start the container**:

   ```bash
   docker-compose up -d
   ```

The image will be automatically pulled from Docker Hub on first run.

---

## 🐳 Docker Deployment Options

### **🎯 Quick Deploy (Recommended)**

**For most users - use the pre-built image:**

```bash
# Create and run with docker-compose
curl -o docker-compose.yml https://raw.githubusercontent.com/Dmans218/emerald-plant-tracker/main/docker-compose.yml
docker-compose up -d
```

### **🔧 Custom Build**

**For developers or custom modifications:**

```bash
# Clone and build from source
git clone https://github.com/Dmans218/emerald-plant-tracker.git
cd emerald-plant-tracker
docker-compose up -d --build
```

### **⚡ One-Line Deploy**

**Fastest setup with Docker run:**

```bash
docker run -d --name emerald-plant-tracker -p 420:420 \
  -v emerald_data:/app/backend/data \
  -v emerald_uploads:/app/backend/uploads \
  dmans218/emerald-plant-tracker:latest
```

**🌐 Access your application at: [http://localhost:420](http://localhost:420)**

---

## 🛠️ Development Setup (from Source)

If you want to contribute or run the app in development mode:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Dmans218/emerald-plant-tracker.git
   cd emerald-plant-tracker
   ```

2. **Install dependencies:**

   ```bash
   # Install pnpm if not already installed
   npm install -g pnpm
   
   # Install all dependencies for the workspace
   pnpm install
   ```

3. **Start development servers:**

   ```bash
   # Start both frontend and backend in development mode
   pnpm dev
   
   # Or start them individually:
   # Frontend only: pnpm --filter emerald-plant-tracker-frontend dev
   # Backend only: pnpm --filter emerald-plant-tracker-backend dev
   
   # Option 2: Use Docker Compose for development
   docker-compose -f docker-compose.dev.yml up
   
   # Option 2: Run manually
   # Terminal 1 - Backend
   cd backend && npm run dev
   
   # Terminal 2 - Frontend  
   cd frontend && npm start
   ```

   This starts both frontend and backend. The app will be available at [http://localhost:420](http://localhost:420).

4. **Code Quality & Linting:**

   ```bash
   # Run ESLint to check code quality
   cd frontend && npm run lint
   
   # Fix automatically fixable issues
   cd frontend && npm run lint:fix
   ```

   The project uses modern ESLint configuration with React-specific rules to maintain high code quality and consistency.

---

## 🧪 Using the Nutrient Calculator

The built-in nutrient calculator is one of Emerald Plant Tracker's most powerful features:

### **Supported Nutrient Brands**

- **General Hydroponics FloraSeries** - The classic 3-part system
- **Advanced Nutrients pH Perfect GMB** - Grow, Micro, Bloom with pH buffering
- **Fox Farm Trio** - Grow Big, Big Bloom, Tiger Bloom
- **Canna Coco A&B** - Specialized for coco growing
- **Jack's Nutrients 321** - Professional 3-part system
- **MegaCrop** - One-part nutrient solution
- **Botanicare Pure Blend Pro** - Organic-based nutrients
- **Dyna-Gro** - Complete nutrition system
- **House & Garden** - Premium Dutch nutrients
- **Nectar for the Gods** - Organic mineral nutrients

### **How to Use**

1. **Select Your Setup**: Choose nutrient brand, growth stage, grow medium, and watering method
2. **Set Tank Size**: Enter your reservoir or mixing container size in liters
3. **Choose Feeding Strength**: Light (50%), Medium (75%), or Aggressive (100%)
4. **Get Your Recipe**: Precise mixing ratios with step-by-step instructions
5. **Save & Reuse**: Your preferences are automatically saved for next time

### **Smart Features**

- **Auto-adjustments**: Feeding strength automatically adjusts based on growth stage
- **Water type optimization**: CalMag recommendations based on soft vs hard water
- **Method-specific ratios**: Concentrations adjust for drip, aero, hand watering, etc.
- **Mixing order**: Proper supplement and nutrient addition sequence
- **Target ranges**: EC/TDS and pH targets for each brand and growth stage

---

## ⚙️ Configuration & Environment Variables

The Emerald Plant Tracker uses minimal configuration for easy deployment:

- **Default Port**: 420 (configured in the Docker container)
- **NODE_ENV**: Only environment variable needed - automatically set to `production` in Docker
- **Data Persistence**: All data automatically persisted via Docker volumes
- **No external dependencies**: Works completely offline once deployed

The simplified docker-compose.yml requires only the essential `NODE_ENV=production` setting. All other configuration is handled automatically by the container.

---

## 📁 Project Structure

```text
Emerald Plant Tracker/
├── backend/                 # Node.js API server
│   ├── data/               # SQLite database files
│   │   ├── emerald-plant-tracker.db  # Main application database
│   │   └── growlogger.db   # Legacy database (if migrated)
│   ├── routes/             # API route handlers
│   │   ├── plants.js       # Plant CRUD operations
│   │   ├── logs.js         # Activity logging
│   │   ├── environment.js  # Environmental data
│   │   └── tents.js        # Grow tent management
│   ├── uploads/            # User-uploaded images
│   ├── database.js         # SQLite database setup
│   ├── server.js           # Express server
│   └── Dockerfile          # Backend container config
├── frontend/               # React web application
│   ├── public/             # Static files
│   ├── src/                # Source code
│   │   ├── components/     # Reusable React components
│   │   │   ├── Header.js   # Navigation header
│   │   │   ├── ImageUpload.js  # Image upload component
│   │   │   └── LogModal.js # Activity logging modal
│   │   ├── pages/          # Main application pages
│   │   │   ├── Dashboard.js    # Overview dashboard
│   │   │   ├── Plants.js       # Plant management
│   │   │   ├── PlantDetail.js  # Individual plant view
│   │   │   ├── Calculator.js   # Nutrient calculator
│   │   │   ├── Environment.js  # Environmental monitoring
│   │   │   ├── Logs.js         # Activity logs
│   │   │   └── ArchivedTents.js # Archived tent data
│   │   ├── utils/          # Utility functions
│   │   │   ├── api.js      # API communication
│   │   │   ├── ocrParser.js # OCR text parsing
│   │   │   └── stageColors.js # Growth stage styling
│   │   ├── App.js          # Main application component
│   │   ├── index.js        # React entry point
│   │   └── index.css       # Global styles
│   ├── package.json        # Frontend dependencies
│   └── Dockerfile          # Frontend container config
├── docs/                   # Documentation files
├── docker-compose.yml      # Docker orchestration
├── docker-compose.dev.yml  # Development Docker config
├── .dockerignore           # Docker build context exclusions
├── .gitignore              # Git exclusions
├── package.json            # Root project configuration
└── README.md               # This file
```

---

## 🔌 API Endpoints

### Plantsgo

- `GET /api/plants` - List all plants
- `POST /api/plants` - Create new plant
- `GET /api/plants/:id` - Get plant details
- `PUT /api/plants/:id` - Update plant
- `DELETE /api/plants/:id` - Delete plant

### Activity Logs

- `GET /api/logs` - List activity logs
- `POST /api/logs` - Create new log entry
- `POST /api/logs/photo` - Upload photo log
- `DELETE /api/logs/:id` - Delete log entry
- `GET /api/logs/stats/:plantId` - Get plant statistics

### Environment

- `GET /api/environment` - List environment logs
- `POST /api/environment` - Create new environment log
- `GET /api/environment/weekly` - Get weekly environment averages
- `GET /api/environment/export` - Export environment data as CSV

### Tents

- `GET /api/tents` - List available grow tents
- `POST /api/tents` - Create new tent
- `PUT /api/tents/:id` - Update tent configuration
- `DELETE /api/tents/:id` - Delete tent

---

## 🔐 Security Notes

- This application is designed for **personal/private use only**
- **Do not expose to the public internet** without proper security measures (VPN, firewall, etc.)
- Data is stored locally in SQLite and Docker volumes
- `.env` files and local SQLite DBs are excluded from Docker images by `.dockerignore`
- Regular backups are recommended
- Understand your local laws regarding cannabis cultivation

---

## 🏗️ Production & Build Context

- The `.dockerignore` file ensures that development files, local node_modules, logs, test images, and other non-production files are **not** included in your Docker images.
- The `.gitignore` file keeps your repository clean by ignoring dependencies, build output, logs, and local environment files.
- Only production-ready code and configuration are shipped in your Docker images.

---

## 🚨 Troubleshooting

**Cannot connect to backend:**

- Ensure the container is running: `docker ps`
- Check logs: `docker logs emerald-plant-tracker`

**Database persistence:**

- The SQLite database is stored in a Docker volume (`emerald_data`) and will persist across container rebuilds.

**Port conflicts:**

- Make sure port 420 is not in use by another application.

**Calculator not saving preferences:**

- Ensure your browser allows localStorage for the application domain
- Check browser developer tools for any JavaScript errors

**Environmental data not appearing:**

- Verify that your grow tent is properly configured in the system
- Check that all required fields are filled when logging environmental data

---

## 🤝 Contributing

Pull requests and suggestions are welcome! Please open an issue or PR on GitHub.

### Continuous Integration / Continuous Deployment

This project uses GitHub Actions for CI/CD:

- **CI Workflow**: Automatically tests and builds the application on every push and pull request.
- **CodeQL Analysis**: Security scanning to detect vulnerabilities in the codebase.
- **Docker Workflow**: Builds and tests Docker images when changes are made to Docker-related files.
- **Dependabot**: Automatically submits PRs for dependency updates with the following schedule:
  - NPM dependencies: Weekly updates
  - Docker dependencies: Monthly updates
  - GitHub Actions: Monthly updates

Minor and patch updates from Dependabot will be automatically merged if all tests pass.

---

## 💖 Support & Donations

Emerald Plant Tracker is built and maintained by a Canadian developer. If you find this project useful, please consider supporting its development—your donations help pay my bills and keep this project alive!

- [![GitHub Sponsors](https://img.shields.io/badge/sponsor-GitHub%20Sponsors-fc2967?logo=github)](https://github.com/sponsors/Dmans218)
- [![Buy Me a Coffee](https://img.shields.io/badge/donate-Ko--fi-29abe0?logo=ko-fi)](https://ko-fi.com/emeraldplantmanager)

*Your support means a lot and helps keep this project free and open source for everyone!*

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute it, including for commercial purposes. Donations are welcome but not required.

---

Happy Growing! 🌱
