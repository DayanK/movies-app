# 🎬 Movies App

A modern, feature-rich movie discovery application built with React Native and Expo. Browse popular movies, search for your favorites, save them to your personal collection, and track trending searches across the community.

## ✨ Features

- **Discover Movies**: Browse popular and trending movies powered by TMDB API
- **Smart Search**: Find any movie with real-time search functionality
- **Personal Collection**: Save your favorite movies for later viewing
- **Trending Insights**: See what movies the community is searching for most
- **Detailed Information**: View comprehensive movie details including ratings, budget, runtime, and more
- **User Statistics**: Track your saved movies and community activity

## 🛠️ Tech Stack

- **Framework**: React Native with Expo SDK 54
- **Navigation**: Expo Router (file-based routing)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Backend**: Appwrite (for saved movies and trending data)
- **API**: The Movie Database (TMDB) API
- **Language**: TypeScript

## 📱 Screens

1. **Home**: Discover popular movies and trending searches
2. **Search**: Find movies by title with instant results
3. **Save**: View and manage your saved movie collection
4. **Profile**: See your stats and app information
5. **Movie Details**: Complete movie information with save functionality

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator
- TMDB API Key
- Appwrite account and project

### Installation

1. Clone the repository:
```bash
git clone https://github.com/DayanK/movies-app.git
cd movies-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
EXPO_PUBLIC_MOVIE_API_KEY=your_tmdb_api_key_here
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_appwrite_project_id
EXPO_PUBLIC_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
EXPO_PUBLIC_APPWRITE_COLLECTION_ID=your_collection_id
```

4. Set up Appwrite:
   - Create a project in Appwrite
   - Create a database
   - Create two collections:
     - **Trending Collection** (for search tracking):
       - `searchTerm` (String, 255)
       - `movie_id` (Integer)
       - `title` (String, 255)
       - `count` (Integer)
       - `poster_url` (String, 500)
     - **Saved Movies Collection** (ID: `saved-movies`):
       - `movie_id` (Integer)
       - `title` (String, 255)
       - `poster_path` (String, 255)
       - `vote_average` (Float)
       - `release_date` (String, 50)
       - `overview` (String, 1000)
       - `saved_at` (String, 100)
   - Set permissions to "Any" for Read, Create, Update, Delete

5. Get your TMDB API key:
   - Sign up at [https://www.themoviedb.org](https://www.themoviedb.org)
   - Go to Settings → API → Request API Key
   - Copy your API Read Access Token

### Running the App

Start the development server:
```bash
npm start
```

Then choose your platform:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Press `w` for web browser

## 📂 Project Structure

```
movies-app/
├── app/                    # App screens (Expo Router)
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.tsx      # Home screen
│   │   ├── search.tsx     # Search screen
│   │   ├── save.tsx       # Saved movies screen
│   │   └── profile.tsx    # Profile screen
│   ├── movie/             # Movie details screen
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
├── constants/            # Icons, images, theme
├── interfaces/           # TypeScript interfaces
├── services/             # API services
│   ├── api.ts           # TMDB API calls
│   ├── appwrite.ts      # Appwrite configuration
│   └── savedMovies.ts   # Saved movies logic
└── assets/              # Images and icons
```

## 🎨 Design Features

- Dark theme with modern UI
- Smooth animations and transitions
- Custom tab bar with highlight effect
- Responsive layouts
- Pull-to-refresh functionality
- Loading states and error handling

## 📊 Key Functionality

### Movie Search
The app tracks community search behavior by storing search queries in Appwrite. Each time a user searches for a movie, the count is incremented, creating a trending movies feature.

### Save Movies
Users can save movies to their personal collection by tapping the save button on the movie details page. Saved movies are stored in Appwrite and can be viewed in the Save tab.

### Statistics
The profile screen displays user statistics including:
- Total saved movies
- Community search count
- App information

## 🔧 Configuration

The app uses environment variables for sensitive configuration. Make sure to create a `.env` file with all required variables before running the app.

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Movie data provided by [The Movie Database (TMDB)](https://www.themoviedb.org)
- Backend powered by [Appwrite](https://appwrite.io)
- Built with [Expo](https://expo.dev) and [React Native](https://reactnative.dev)

## 📧 Contact

For any questions or feedback, feel free to reach out!

---

Made with ❤️ using React Native
