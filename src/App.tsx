import React, { useState, useEffect } from 'react';
import { Mic, Music2, AudioWaveform, History, Search, X, Heart, Share2, Syringe as Lyrics, Radio, Music, PlayCircle, Plus, Info, Languages, Star, Settings, HelpCircle, ChevronRight, Bell, Moon, Sun, Volume2, User, ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthModal } from './components/AuthModal';
import { UserMenu } from './components/UserMenu';
import { useAuthStore } from './store/authStore';
import { supabase } from './lib/supabase';

interface RecognizedSong {
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  timestamp: Date;
  lyrics?: string;
  genre?: string;
  year?: number;
  streamingLinks?: {
    spotify?: string;
    apple?: string;
    youtube?: string;
  };
}

interface Screen {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface OnboardingStep {
  title: string;
  description: string;
  icon: React.ReactNode;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('home');
  const [isListening, setIsListening] = useState(false);
  const [searchResults, setSearchResults] = useState<RecognizedSong[]>([]);
  const [favorites, setFavorites] = useState<RecognizedSong[]>([]);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [currentOnboardingStep, setCurrentOnboardingStep] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const screens: Screen[] = [
    { id: 'home', label: 'Home', icon: <Music2 className="w-5 h-5" /> },
    { id: 'history', label: 'History', icon: <History className="w-5 h-5" /> },
    { id: 'library', label: 'Library', icon: <Music className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const onboardingSteps: OnboardingStep[] = [
    {
      title: "Welcome to Cogmu",
      description: "Discover and identify any song by listening, humming, or singing.",
      icon: <Music2 className="w-12 h-12" />
    },
    {
      title: "Multiple Recognition Methods",
      description: "Use your microphone to record audio, hum a tune, or let us listen to what's playing.",
      icon: <Mic className="w-12 h-12" />
    },
    {
      title: "Rich Song Information",
      description: "Get lyrics, artist details, and direct links to your favorite streaming platforms.",
      icon: <Info className="w-12 h-12" />
    }
  ];

  const recentSearches: RecognizedSong[] = [
    {
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      coverUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop",
      timestamp: new Date(),
      genre: "Synth-pop",
      year: 2020,
      lyrics: "I've been tryin' to call\nI've been on my own for long enough...",
      streamingLinks: {
        spotify: "#",
        apple: "#",
        youtube: "#"
      }
    },
    {
      title: "Bad Guy",
      artist: "Billie Eilish",
      album: "When We All Fall Asleep, Where Do We Go?",
      coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      timestamp: new Date(),
      genre: "Electropop",
      year: 2019,
      streamingLinks: {
        spotify: "#",
        youtube: "#"
      }
    },
    {
      title: "As It Was",
      artist: "Harry Styles",
      album: "Harry's House",
      coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
      timestamp: new Date(),
      genre: "Pop",
      year: 2022,
      streamingLinks: {
        spotify: "#",
        apple: "#",
        youtube: "#"
      }
    },
    {
      title: "Anti-Hero",
      artist: "Taylor Swift",
      album: "Midnights",
      coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
      timestamp: new Date(),
      genre: "Pop",
      year: 2022,
      streamingLinks: {
        spotify: "#",
        apple: "#",
        youtube: "#"
      }
    },
    {
      title: "Flowers",
      artist: "Miley Cyrus",
      album: "Endless Summer Vacation",
      coverUrl: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&h=300&fit=crop",
      timestamp: new Date(),
      genre: "Pop",
      year: 2023,
      streamingLinks: {
        spotify: "#",
        apple: "#",
        youtube: "#"
      }
    }
  ];

  const recommendedSongs: RecognizedSong[] = [
    {
      title: "Cruel Summer",
      artist: "Taylor Swift",
      album: "Lover",
      coverUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&h=300&fit=crop",
      timestamp: new Date(),
      genre: "Pop",
      year: 2019
    },
    {
      title: "Vampire",
      artist: "Olivia Rodrigo",
      album: "GUTS",
      coverUrl: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=300&h=300&fit=crop",
      timestamp: new Date(),
      genre: "Pop Rock",
      year: 2023
    },
    {
      title: "Last Night",
      artist: "Morgan Wallen",
      album: "One Thing at a Time",
      coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      timestamp: new Date(),
      genre: "Country",
      year: 2023
    },
    {
      title: "Kill Bill",
      artist: "SZA",
      album: "SOS",
      coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
      timestamp: new Date(),
      genre: "R&B",
      year: 2022
    }
  ];

  const startListening = () => {
    setIsListening(true);
    setErrorMessage(null);
    setTimeout(() => {
      const success = Math.random() > 0.2;
      if (success) {
        const newSong = {
          title: "Shape of You",
          artist: "Ed Sheeran",
          album: "÷ (Divide)",
          coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
          timestamp: new Date(),
          genre: "Pop",
          year: 2017,
          lyrics: "The club isn't the best place to find a lover\nSo the bar is where I go...",
          streamingLinks: {
            spotify: "#",
            apple: "#",
            youtube: "#"
          }
        };
        setSearchResults([newSong]);
        setCurrentScreen('results');
      } else {
        setErrorMessage("We couldn't identify this track. Try recording in a quieter environment or getting closer to the audio source.");
      }
      setIsListening(false);
    }, 3000);
  };

  const toggleFavorite = (song: RecognizedSong) => {
    setFavorites(prev => {
      const exists = prev.some(s => s.title === song.title);
      if (exists) {
        return prev.filter(s => s.title !== song.title);
      }
      return [...prev, song];
    });
  };

  const renderSplashScreen = () => (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-[#352F44] via-[#5C5470] to-[#352F44] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.5, delay: 2, ease: "easeInOut" }}
    >
      {/* Background animated particles */}
      <motion.div
        className="absolute inset-0 opacity-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#FAF0E6] w-2 h-2"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </motion.div>
      
      {/* Main content container */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center relative z-10"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: 1,
          }}
          className="animate-glow rounded-full p-8 glass-morphism mb-6 mx-auto w-40 h-40 flex items-center justify-center"
        >
          <Music2 className="w-24 h-24 text-[#FAF0E6] drop-shadow-lg" />
        </motion.div>
        
        <motion.div className="relative">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
            className="text-5xl font-bold mt-6 bg-gradient-to-r from-[#FAF0E6] to-[#B9B4C7] text-transparent bg-clip-text tracking-wider"
          >
            Cogmu
          </motion.h1>
          
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="h-0.5 bg-gradient-to-r from-transparent via-[#FAF0E6]/70 to-transparent mt-2"
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.125, duration: 0.8 }}
            className="text-[#FAF0E6] mt-3 text-lg"
          >
            Your musical journey awaits
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );

  const renderOnboarding = () => (
    <motion.div 
      className="fixed inset-0 bg-primary-dark/90 backdrop-blur-lg z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-md w-full mx-4">
        <motion.div
          key={currentOnboardingStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="glass-morphism p-8 text-center"
        >
          <div className="text-primary-light">
            {onboardingSteps[currentOnboardingStep].icon}
          </div>
          <h2 className="text-2xl font-bold mt-4 text-primary-beige">
            {onboardingSteps[currentOnboardingStep].title}
          </h2>
          <p className="text-primary-light mt-2">
            {onboardingSteps[currentOnboardingStep].description}
          </p>
          <div className="mt-8 flex justify-between items-center">
            <div className="flex gap-2">
              {onboardingSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentOnboardingStep ? 'bg-primary-light scale-125' : 'bg-primary/50'
                  }`}
                />
              ))}
            </div>
            {currentOnboardingStep < onboardingSteps.length - 1 ? (
              <button
                onClick={() => setCurrentOnboardingStep(prev => prev + 1)}
                className="button-primary"
              >
                Next
              </button>
            ) : (
              <button
                onClick={() => setShowOnboarding(false)}
                className="button-primary"
              >
                Get Started
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  const renderHome = () => (
    <div className="max-w-2xl mx-auto">
      <div className={`card p-8 text-center transition-all duration-300 ${
        isListening ? 'ring-4 ring-primary-light/30 shadow-glow' : ''
      }`}>
        {!isListening ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startListening}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary-dark hover:from-primary-dark hover:to-primary flex items-center justify-center mx-auto shadow-glow transition-all duration-300"
          >
            <Mic className="w-12 h-12 text-primary-beige" />
          </motion.button>
        ) : (
          <div className="flex flex-col items-center">
            <AudioWaveform className="w-16 h-16 animate-pulse text-primary-light" />
            <p className="mt-4 text-lg text-primary-beige">Listening...</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsListening(false)}
              className="mt-4 px-4 py-2 rounded-full bg-primary-dark hover:bg-primary text-primary-beige flex items-center gap-2 transition-colors duration-300"
            >
              <X className="w-4 h-4" /> Stop
            </motion.button>
          </div>
        )}
        
        <div className="mt-6 flex justify-center gap-4">
          <button className="button-secondary flex items-center gap-2">
            <Mic className="w-4 h-4" />
            <span>Voice</span>
          </button>
          <button className="button-secondary flex items-center gap-2">
            <Music className="w-4 h-4" />
            <span>Humming</span>
          </button>
          <button className="button-secondary flex items-center gap-2">
            <Radio className="w-4 h-4" />
            <span>Radio</span>
          </button>
        </div>
      </div>

      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 glass-morphism p-4 flex items-center gap-3 border-l-4 border-primary-dark"
        >
          <AlertCircle className="w-5 h-5 text-primary-light" />
          <p className="text-primary-light">{errorMessage}</p>
        </motion.div>
      )}

      <div className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-primary-beige">
            <History className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Recent Searches</h2>
          </div>
          <button className="text-sm text-primary-light hover:text-primary-beige transition-colors">
            Clear All
          </button>
        </div>
        <div className="space-y-4">
          {recentSearches.map((song, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={index}
              className="card p-4 flex items-center gap-4 hover:shadow-glow transition-all duration-300"
            >
              <img src={song.coverUrl} alt={song.album} className="w-12 h-12 rounded-lg object-cover shadow-lg" />
              <div className="flex-1">
                <h3 className="font-semibold text-primary-beige">{song.title}</h3>
                <p className="text-sm text-primary-light">{song.artist}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleFavorite(song)}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    favorites.some(s => s.title === song.title)
                      ? 'bg-primary-dark text-primary-beige shadow-glow'
                      : 'bg-primary/20 hover:bg-primary/30 text-primary-beige'
                  }`}
                >
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full bg-primary/20 hover:bg-primary/30 text-primary-beige transition-all duration-300">
                  <PlayCircle className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => setCurrentScreen('home')}
        className="mb-4 button-secondary flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Search
      </button>

      {searchResults.map((song, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          key={index}
          className="card p-6 space-y-6"
        >
          <div className="flex items-center gap-6">
            <img src={song.coverUrl} alt={song.album} className="w-32 h-32 rounded-xl object-cover shadow-lg" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-primary-beige">{song.title}</h2>
              <p className="text-xl text-primary-light">{song.artist}</p>
              <p className="text-primary-light/70">{song.album}</p>
              <div className="flex gap-2 mt-2 text-sm text-primary-light/70">
                <span>{song.year}</span>
                <span>•</span>
                <span>{song.genre}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => toggleFavorite(song)}
              className={`flex-1 px-4 py-3 rounded-xl transition-all duration-300 ${
                favorites.some(s => s.title === song.title)
                  ? 'bg-primary-dark text-primary-beige shadow-glow'
                  : 'button-secondary'
              } flex items-center justify-center gap-2`}
            >
              <Heart className="w-5 h-5" />
              {favorites.some(s => s.title === song.title) ? 'Favorited' : 'Add to Favorites'}
            </button>
            <button className="flex-1 button-secondary flex items-center justify-center gap-2">
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>

          {song.lyrics && (
            <div className="glass-morphism rounded-xl p-4">
              <h3 className="font-semibold mb-2 flex items-center gap-2 text-primary-beige">
                <Lyrics className="w-4 h-4" />
                Lyrics Preview
              </h3>
              <p className="text-primary-light whitespace-pre-line">{song.lyrics}</p>
              <button className="mt-4 text-primary-light hover:text-primary-beige text-sm transition-colors">
                View Full Lyrics
              </button>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="font-semibold text-primary-beige">Listen On</h3>
            <div className="grid grid-cols-2 gap-2">
              {song.streamingLinks?.spotify && (
                <button className="button-primary flex items-center justify-center gap-2">
                  <PlayCircle className="w-5 h-5" />
                  Spotify
                </button>
              )}
              {song.streamingLinks?.apple && (
                <button className="button-primary flex items-center justify-center gap-2">
                  <PlayCircle className="w-5 h-5" />
                  Apple Music
                </button>
              )}
            </div>
          </div>
        </motion.div>
      ))}

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-primary-beige">You Might Also Like</h3>
        <div className="grid grid-cols-2 gap-4">
          {recommendedSongs.map((song, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={index}
              className="card p-4 hover:shadow-glow transition-all duration-300"
            >
              <img src={song.coverUrl} alt={song.album} className="w-full aspect-square rounded-lg object-cover shadow-lg mb-3" />
              <h4 className="font-semibold text-primary-beige">{song.title}</h4>
              <p className="text-sm text-primary-light">{song.artist}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="max-w-2xl mx-auto">
      <div className="card p-6 space-y-6">
        <h2 className="text-2xl font-bold text-primary-beige">Settings</h2>
        
        <div className="space-y-4">
          <div className="glass-morphism p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-primary-light" />
                <div>
                  <h3 className="font-semibold text-primary-beige">Notifications</h3>
                  <p className="text-sm text-primary-light">Get alerts for recognized songs</p>
                </div>
              </div>
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`w-12 h-6 rounded-full transition-all duration-300 ${
                  notificationsEnabled ? 'bg-primary shadow-glow' : 'bg-primary-dark'
                } relative`}
              >
                <div className={`w-5 h-5 rounded-full bg-primary-beige absolute top-0.5 transition-transform duration-300 ${
                  notificationsEnabled ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>

          <div className="glass-morphism p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {darkMode ? <Moon className="w-5 h-5 text-primary-light" /> : <Sun className="w-5 h-5 text-primary-light" />}
                <div>
                  <h3 className="font-semibold text-primary-beige">Dark Mode</h3>
                  <p className="text-sm text-primary-light">Toggle dark/light theme</p>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-12 h-6 rounded-full transition-all duration-300 ${
                  darkMode ? 'bg-primary shadow-glow' : 'bg-primary-dark'
                } relative`}
              >
                <div className={`w-5 h-5 rounded-full bg-primary-beige absolute top-0.5 transition-transform duration-300 ${
                  darkMode ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>

          <button className="w-full glass-morphism p-4 rounded-xl group transition-all duration-300 hover:shadow-glow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-primary-light group-hover:text-primary-beige transition-colors" />
                <div>
                  <h3 className="font-semibold text-primary-beige">Audio Quality</h3>
                  <p className="text-sm text-primary-light">Adjust recording settings</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-primary-light group-hover:text-primary-beige transition-colors" />
            </div>
          </button>

          <button className="w-full glass-morphism p-4 rounded-xl group transition-all duration-300 hover:shadow-glow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Languages className="w-5 h-5 text-primary-light group-hover:text-primary-beige transition-colors" />
                <div>
                  <h3 className="font-semibold text-primary-beige">Language</h3>
                  <p className="text-sm text-primary-light">Change app language</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-primary-light group-hover:text-primary-beige transition-colors" />
            </div>
          </button>

          <button className="w-full glass-morphism p-4 rounded-xl group transition-all duration-300 hover:shadow-glow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-primary-light group-hover:text-primary-beige transition-colors" />
                <div>
                  <h3 className="font-semibold text-primary-beige">Help & Support</h3>
                  <p className="text-sm text-primary-light">FAQs and contact info</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-primary-light group-hover:text-primary-beige transition-colors" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <AnimatePresence>
        {isLoading && renderSplashScreen()}
      </AnimatePresence>
      
      <motion.div 
        className="min-h-screen text-primary-beige"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <div className="container mx-auto px-4 py-8">
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Music2 className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Cogmu</h1>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <UserMenu />
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="button-primary"
                >
                  Sign In
                </button>
              )}
            </div>
          </header>

          <nav className="max-w-2xl mx-auto mb-8">
            <div className="glass-morphism rounded-xl p-2 flex justify-between">
              {screens.map(screen => (
                <button
                  key={screen.id}
                  onClick={() => setCurrentScreen(screen.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    currentScreen === screen.id 
                      ? 'bg-gradient-to-r from-primary to-primary-dark text-primary-beige shadow-glow' 
                      : 'text-primary-light hover:bg-primary/20'
                  }`}
                >
                  {screen.icon}
                  <span>{screen.label}</span>
                </button>
              ))}
            </div>
          </nav>

          <AnimatePresence mode="wait">
            {showOnboarding && renderOnboarding()}
            {!showOnboarding && (
              <motion.div
                key={currentScreen}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {currentScreen === 'home' && renderHome()}
                {currentScreen === 'results' && renderResults()}
                {currentScreen === 'settings' && renderSettings()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}

export default App;