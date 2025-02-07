import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './LibraryPage.css';

type Genre = 'all' | 'fiction' | 'non-fiction' | 'mystery' | 'sci-fi' | 'romance';

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  genre: Genre;
  rating: number;
  readers: string;
  pages: number;
  language: string;
  description: string;
  publishedYear: number;
  status?: 'available' | 'borrowed';
  isbn?: string;
  publisher?: string;
  format?: 'Hardcover' | 'Paperback' | 'E-book' | 'Audio';
  fileSize?: string;
  duration?: string; // For audiobooks
  categories?: string[];
  tags?: string[];
  series?: {
    name: string;
    bookNumber: number;
  };
  awards?: string[];
  bookPreview?: string; // URL to preview/sample
  readingStatus?: 'in-progress' | 'finished' | 'frozen';
  lastUpdated?: string;
  finishedDate?: string;
  likes?: number;
}

interface SearchFilters {
  minRating: number;
  maxRating: number;
  minReaders: number;
  yearPublished: string;
  language: string;
}

const LibraryPage = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<Genre>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'readers'>('rating');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    minRating: 0,
    maxRating: 5,
    minReaders: 0,
    yearPublished: '',
    language: 'all'
  });
  const [currentPage, setCurrentPage] = useState(1);
  // Increase books per page to show more books in the grid
  const booksPerPage = 12; // Changed from 6 to 12 for better grid layout

  const books: Book[] = [
    {
      id: 1,
      title: "The Shadow's Edge",
      author: "Emma Blackwood",
      cover: "https://picsum.photos/seed/book1/150/225",
      genre: "mystery",
      rating: 4.8,
      readers: "12.3k",
      pages: 342,
      language: "EN",
      description: "A thrilling mystery novel that keeps you on the edge of your seat.",
      publishedYear: 2021,
      status: 'available',
      isbn: "978-1234567890",
      publisher: "Penguin Books",
      format: "Hardcover",
      categories: ["Thriller", "Crime", "Detective"],
      tags: ["bestseller", "page-turner", "suspense"],
      series: {
        name: "Detective Morgan Series",
        bookNumber: 1
      },
      awards: ["Mystery Writers of America Award 2021"],
      bookPreview: "https://example.com/preview/shadows-edge",
      readingStatus: 'in-progress',
      lastUpdated: '2024-01-15T10:30:00Z',
      likes: 1247,
    },
    {
      id: 2,
      title: "Midnight Chronicles",
      author: "James Spencer",
      cover: "https://picsum.photos/seed/book2/150/225",
      genre: "fiction",
      rating: 4.6,
      readers: "8.7k",
      pages: 298,
      language: "EN",
      description: "An epic tale of adventure and intrigue.",
      publishedYear: 2019,
      status: 'borrowed',
      tags: ["dark-fantasy", "action", "epic"],
      readingStatus: 'finished',
      finishedDate: '2023',
      likes: 856,
    },
    {
      id: 3,
      title: "The Lost Key",
      author: "Sarah Quinn",
      cover: "https://picsum.photos/seed/book3/150/225",
      genre: "mystery",
      rating: 4.7,
      readers: "15.2k",
      pages: 384,
      language: "EN",
      description: "A gripping mystery that unravels secrets of the past.",
      publishedYear: 2020,
      status: 'available',
      tags: ["detective", "thriller", "mystery"],
      likes: 2134,
    },
    {
      id: 4,
      title: "Digital Dreams",
      author: "Mike Chen",
      cover: "https://picsum.photos/seed/book4/150/225",
      genre: "sci-fi",
      rating: 4.9,
      readers: "10.1k",
      pages: 412,
      language: "EN",
      description: "A futuristic sci-fi novel exploring the boundaries of technology.",
      publishedYear: 2022,
      status: 'available',
      tags: ["cyberpunk", "ai", "future"],
      readingStatus: 'finished',
      finishedDate: '2024',
      likes: 3421,
    },
    {
      id: 5,
      title: "Love in Paris",
      author: "Sophie Martin",
      cover: "https://picsum.photos/seed/book5/150/225",
      genre: "romance",
      rating: 4.5,
      readers: "9.8k",
      pages: 276,
      language: "EN",
      description: "A heartwarming romance set in the city of love.",
      publishedYear: 2018,
      status: 'borrowed',
      readingStatus: 'in-progress',
      lastUpdated: '2024-01-14T15:30:00Z',
      likes: 987,
    },
    {
      id: 6,
      title: "The Mind's Eye",
      author: "David Brown",
      cover: "https://picsum.photos/seed/book6/150/225",
      genre: "non-fiction",
      rating: 4.7,
      readers: "11.5k",
      pages: 354,
      language: "EN",
      description: "An insightful non-fiction book on the power of the mind.",
      publishedYear: 2017,
      status: 'available',
      readingStatus: 'finished',
      finishedDate: '2023',
      likes: 1234,
    },
    {
      id: 7,
      title: "Galaxy's Edge",
      author: "Alex Nova",
      cover: "https://picsum.photos/seed/book7/150/225",
      genre: "sci-fi",
      rating: 4.6,
      readers: "13.4k",
      pages: 398,
      language: "EN",
      description: "A space adventure that takes you to the edge of the galaxy.",
      publishedYear: 2021,
      status: 'available',
      likes: 2345,
    },
    {
      id: 8,
      title: "The Art of Focus",
      author: "Linda Chen",
      cover: "https://picsum.photos/seed/book8/150/225",
      genre: "non-fiction",
      rating: 4.9,
      readers: "16.7k",
      pages: 432,
      language: "EN",
      description: "A guide to mastering focus and productivity.",
      publishedYear: 2020,
      status: 'borrowed',
      likes: 3456,
    },
    {
      id: 9,
      title: "Summer Hearts",
      author: "Emily Rose",
      cover: "https://picsum.photos/seed/book9/150/225",
      genre: "romance",
      rating: 4.4,
      readers: "8.9k",
      pages: 288,
      language: "EN",
      description: "A summer romance that will warm your heart.",
      publishedYear: 2019,
      status: 'available',
      likes: 4567,
    },
    {
      id: 10,
      title: "The Silent Witness",
      author: "Jack Thompson",
      cover: "https://picsum.photos/seed/book10/150/225",
      genre: "mystery",
      rating: 4.8,
      readers: "14.2k",
      pages: 376,
      language: "EN",
      description: "A mystery novel with unexpected twists and turns.",
      publishedYear: 2018,
      status: 'borrowed',
      likes: 5678,
    },
    {
      id: 11,
      title: "Beyond the Horizon",
      author: "Maria Santos",
      cover: "https://picsum.photos/seed/book11/150/225",
      genre: "fiction",
      rating: 4.7,
      readers: "11.8k",
      pages: 324,
      language: "EN",
      description: "A captivating story that takes you beyond the horizon.",
      publishedYear: 2021,
      status: 'available',
      likes: 6789,
    },
    {
      id: 12,
      title: "Quantum Theories",
      author: "Dr. Robert Lee",
      cover: "https://picsum.photos/seed/book12/150/225",
      genre: "non-fiction",
      rating: 4.5,
      readers: "9.3k",
      pages: 298,
      language: "EN",
      description: "An exploration of quantum theories and their implications.",
      publishedYear: 2017,
      status: 'available',
      likes: 7890,
    },
    {
      id: 13,
      title: "The Last Detective",
      author: "Patricia Miles",
      cover: "https://picsum.photos/seed/book13/150/225",
      genre: "mystery",
      rating: 4.6,
      readers: "12.5k",
      pages: 362,
      language: "EN",
      description: "A detective novel with a thrilling plot.",
      publishedYear: 2020,
      status: 'borrowed',
      likes: 8901,
    },
    {
      id: 14,
      title: "AI Revolution",
      author: "Thomas Wright",
      cover: "https://picsum.photos/seed/book14/150/225",
      genre: "sci-fi",
      rating: 4.8,
      readers: "15.1k",
      pages: 412,
      language: "EN",
      description: "A sci-fi novel exploring the impact of AI on society.",
      publishedYear: 2022,
      status: 'available',
      likes: 9012,
    },
    {
      id: 15,
      title: "Forever Yours",
      author: "Claire Bennett",
      cover: "https://picsum.photos/seed/book15/150/225",
      genre: "romance",
      rating: 4.3,
      readers: "10.6k",
      pages: 276,
      language: "EN",
      description: "A romantic story that will touch your heart.",
      publishedYear: 2018,
      status: 'borrowed',
      likes: 1234,
    },
    {
      id: 16,
      title: "Data Structures Explained",
      author: "Alan Johnson",
      cover: "https://picsum.photos/seed/book16/150/225",
      genre: "non-fiction",
      rating: 4.7,
      readers: "13.2k",
      pages: 354,
      language: "EN",
      description: "An in-depth guide to data structures.",
      publishedYear: 2017,
      status: 'available',
      likes: 2345,
    },
    {
      id: 17,
      title: "The Time Traveler's Wife",
      author: "Rebecca White",
      cover: "https://picsum.photos/seed/book17/150/225",
      genre: "romance",
      rating: 4.6,
      readers: "17.8k",
      pages: 398,
      language: "EN",
      description: "A love story that transcends time.",
      publishedYear: 2019,
      status: 'available',
      likes: 3456,
    },
    {
      id: 18,
      title: "Cosmic Ruins",
      author: "Nathan Black",
      cover: "https://picsum.photos/seed/book18/150/225",
      genre: "sci-fi",
      rating: 4.9,
      readers: "11.4k",
      pages: 412,
      language: "EN",
      description: "A sci-fi adventure set in the ruins of a cosmic civilization.",
      publishedYear: 2021,
      status: 'borrowed',
      likes: 4567,
    },
    {
      id: 19,
      title: "Murder at Midnight",
      author: "Victoria Cross",
      cover: "https://picsum.photos/seed/book19/150/225",
      genre: "mystery",
      rating: 4.7,
      readers: "14.6k",
      pages: 384,
      language: "EN",
      description: "A mystery novel that will keep you guessing until the end.",
      publishedYear: 2020,
      status: 'available',
      likes: 5678,
    },
    {
      id: 20,
      title: "Ancient Civilizations",
      author: "Prof. Mark Stevens",
      cover: "https://picsum.photos/seed/book20/150/225",
      genre: "non-fiction",
      rating: 4.8,
      readers: "12.9k",
      pages: 432,
      language: "EN",
      description: "An exploration of ancient civilizations and their impact on history.",
      publishedYear: 2017,
      status: 'borrowed',
      likes: 6789,
    },
    {
      id: 21,
      title: "Desert Storm",
      author: "Rachel Adams",
      cover: "https://picsum.photos/seed/book21/150/225",
      genre: "fiction",
      rating: 4.5,
      readers: "9.7k",
      pages: 324,
      language: "EN",
      description: "A gripping story set in the midst of a desert storm.",
      publishedYear: 2019,
      status: 'available',
      likes: 7890,
    },
    {
      id: 22,
      title: "Programming 101",
      author: "Michael Zhang",
      cover: "https://picsum.photos/seed/book22/150/225",
      genre: "non-fiction",
      rating: 4.6,
      readers: "15.3k",
      pages: 298,
      language: "EN",
      description: "A beginner's guide to programming.",
      publishedYear: 2018,
      status: 'available',
      likes: 8901,
    },
    {
      id: 23,
      title: "Summer Romance",
      author: "Julia Roberts",
      cover: "https://picsum.photos/seed/book23/150/225",
      genre: "romance",
      rating: 4.4,
      readers: "10.8k",
      pages: 276,
      language: "EN",
      description: "A summer romance that will make you believe in love.",
      publishedYear: 2019,
      status: 'borrowed',
      likes: 9012,
    },
    {
      id: 24,
      title: "The Hidden Clue",
      author: "George Wilson",
      cover: "https://picsum.photos/seed/book24/150/225",
      genre: "mystery",
      rating: 4.7,
      readers: "13.5k",
      pages: 362,
      language: "EN",
      description: "A mystery novel with hidden clues and secrets.",
      publishedYear: 2020,
      status: 'available',
      likes: 1234,
    },
    {
      id: 25,
      title: "Mars Colony",
      author: "Diana Scott",
      cover: "https://picsum.photos/seed/book25/150/225",
      genre: "sci-fi",
      rating: 4.8,
      readers: "16.2k",
      pages: 412,
      language: "EN",
      description: "A sci-fi novel set in a colony on Mars.",
      publishedYear: 2021,
      status: 'borrowed',
      likes: 2345,
    },
    {
      id: 26,
      title: "Financial Freedom",
      author: "Robert Sterling",
      cover: "https://picsum.photos/seed/book26/150/225",
      genre: "non-fiction",
      rating: 4.7,
      readers: "18.9k",
      pages: 354,
      language: "EN",
      description: "A guide to achieving financial freedom.",
      publishedYear: 2017,
      status: 'available',
      likes: 3456,
    },
    {
      id: 27,
      title: "Heart's Desire",
      author: "Elizabeth Moore",
      cover: "https://picsum.photos/seed/book27/150/225",
      genre: "romance",
      rating: 4.5,
      readers: "11.2k",
      pages: 276,
      language: "EN",
      description: "A romantic story about following your heart's desire.",
      publishedYear: 2018,
      status: 'borrowed',
      likes: 4567,
    },
    {
      id: 28,
      title: "The Quantum Paradox",
      author: "Dr. Samuel Chen",
      cover: "https://picsum.photos/seed/book28/150/225",
      genre: "sci-fi",
      rating: 4.9,
      readers: "14.7k",
      pages: 398,
      language: "EN",
      description: "A sci-fi novel exploring the paradoxes of quantum physics.",
      publishedYear: 2022,
      status: 'available',
      likes: 5678,
    },
    {
      id: 29,
      title: "Cold Case Files",
      author: "Detective Jane Harper",
      cover: "https://picsum.photos/seed/book29/150/225",
      genre: "mystery",
      rating: 4.8,
      readers: "16.5k",
      pages: 384,
      language: "EN",
      description: "A mystery novel based on real cold case files.",
      publishedYear: 2020,
      status: 'borrowed',
      likes: 6789,
    },
    {
      id: 30,
      title: "Modern Architecture",
      author: "Frank Miller",
      cover: "https://picsum.photos/seed/book30/150/225",
      genre: "non-fiction",
      rating: 4.6,
      readers: "9.9k",
      pages: 432,
      language: "EN",
      description: "An exploration of modern architectural designs.",
      publishedYear: 2017,
      status: 'available',
      likes: 7890,
    },
    {
      id: 31,
      title: "The Last Kingdom",
      author: "William Stone",
      cover: "https://picsum.photos/seed/book31/150/225",
      genre: "fiction",
      rating: 4.7,
      readers: "13.8k",
      pages: 324,
      language: "EN",
      description: "A historical fiction novel set in the last kingdom.",
      publishedYear: 2021,
      status: 'borrowed',
      likes: 8901,
    },
    {
      id: 32,
      title: "Artificial Intelligence Ethics",
      author: "Dr. Lisa Wong",
      cover: "https://picsum.photos/seed/book32/150/225",
      genre: "non-fiction",
      rating: 4.8,
      readers: "12.4k",
      pages: 354,
      language: "EN",
      description: "An exploration of the ethical implications of AI.",
      publishedYear: 2020,
      status: 'available',
      likes: 9012,
    },
    {
      id: 33,
      title: "Starship Legacy",
      author: "Chris Anderson",
      cover: "https://picsum.photos/seed/book33/150/225",
      genre: "sci-fi",
      rating: 4.7,
      readers: "15.6k",
      pages: 398,
      language: "EN",
      description: "A sci-fi adventure aboard a legendary starship.",
      publishedYear: 2022,
      status: 'borrowed',
      likes: 1234,
    },
    {
      id: 34,
      title: "Venice Love Story",
      author: "Isabella Romano",
      cover: "https://picsum.photos/seed/book34/150/225",
      genre: "romance",
      rating: 4.4,
      readers: "10.3k",
      pages: 276,
      language: "EN",
      description: "A romantic story set in the beautiful city of Venice.",
      publishedYear: 2019,
      status: 'available',
      likes: 2345,
    },
    {
      id: 35,
      title: "The Detective's Game",
      author: "Marcus Blake",
      cover: "https://picsum.photos/seed/book35/150/225",
      genre: "mystery",
      rating: 4.6,
      readers: "11.9k",
      pages: 362,
      language: "EN",
      description: "A detective novel with a game-like plot.",
      publishedYear: 2020,
      status: 'borrowed',
      likes: 3456,
    },
    {
      id: 36,
      title: "Mindfulness in Practice",
      author: "Dr. Sarah Palmer",
      cover: "https://picsum.photos/seed/book36/150/225",
      genre: "non-fiction",
      rating: 4.7,
      readers: "19.2k",
      pages: 432,
      language: "EN",
      description: "A guide to practicing mindfulness in daily life.",
      publishedYear: 2017,
      status: 'available',
      likes: 4567,
    },
    {
      id: 37,
      title: "The Garden of Dreams",
      author: "Lucy Martinez",
      cover: "https://picsum.photos/seed/book37/150/225",
      genre: "romance",
      rating: 4.5,
      readers: "12.1k",
      pages: 288,
      language: "EN",
      description: "A romantic story set in a dreamlike garden.",
      publishedYear: 2018,
      status: 'borrowed',
      likes: 5678,
    },
    {
      id: 38,
      title: "Space Pirates",
      author: "Jake Sterling",
      cover: "https://picsum.photos/seed/book38/150/225",
      genre: "sci-fi",
      rating: 4.6,
      readers: "14.3k",
      pages: 398,
      language: "EN",
      description: "A sci-fi adventure with space pirates.",
      publishedYear: 2021,
      status: 'available',
      likes: 6789,
    },
    {
      id: 39,
      title: "The Art of War",
      author: "Sun Tzu",
      cover: "https://picsum.photos/seed/book39/150/225",
      genre: "non-fiction",
      rating: 4.9,
      readers: "25.7k",
      pages: 354,
      language: "EN",
      description: "A classic text on military strategy and tactics.",
      publishedYear: 2017,
      status: 'borrowed',
      likes: 7890,
    },
    {
      id: 40,
      title: "Whispers in the Dark",
      author: "Elena Night",
      cover: "https://picsum.photos/seed/book40/150/225",
      genre: "mystery",
      rating: 4.7,
      readers: "13.9k",
      pages: 384,
      language: "EN",
      description: "A mystery novel with dark secrets and whispers.",
      publishedYear: 2020,
      status: 'available',
      likes: 8901,
    },
    {
      id: 41,
      title: "Web Development Mastery",
      author: "Tech Master",
      cover: "https://picsum.photos/seed/book41/150/225",
      genre: "non-fiction",
      rating: 4.8,
      readers: "16.4k",
      pages: 432,
      language: "EN",
      description: "A comprehensive guide to web development.",
      publishedYear: 2018,
      status: 'borrowed',
      likes: 9012,
    },
    {
      id: 42,
      title: "Lost in Tokyo",
      author: "Hiro Tanaka",
      cover: "https://picsum.photos/seed/book42/150/225",
      genre: "fiction",
      rating: 4.6,
      readers: "11.2k",
      pages: 324,
      language: "EN",
      description: "A story of adventure and discovery in Tokyo.",
      publishedYear: 2019,
      status: 'available',
      likes: 1234,
    },
    {
      id: 43,
      title: "Cyber Threat",
      author: "Max Power",
      cover: "https://picsum.photos/seed/book43/150/225",
      genre: "sci-fi",
      rating: 4.7,
      readers: "15.8k",
      pages: 398,
      language: "EN",
      description: "A sci-fi novel about the dangers of cyber threats.",
      publishedYear: 2022,
      status: 'borrowed',
      likes: 2345,
    },
    {
      id: 44,
      title: "Mountain Escape",
      author: "Christine Woods",
      cover: "https://picsum.photos/seed/book44/150/225",
      genre: "romance",
      rating: 4.4,
      readers: "9.6k",
      pages: 288,
      language: "EN",
      description: "A romantic story set in the mountains.",
      publishedYear: 2018,
      status: 'available',
      likes: 3456,
    },
    {
      id: 45,
      title: "History of Mathematics",
      author: "Prof. John Nash",
      cover: "https://picsum.photos/seed/book45/150/225",
      genre: "non-fiction",
      rating: 4.8,
      readers: "14.7k",
      pages: 354,
      language: "EN",
      description: "An exploration of the history of mathematics.",
      publishedYear: 2017,
      status: 'borrowed',
      likes: 4567,
    },
    {
      id: 46,
      title: "The Missing Portrait",
      author: "Oliver Hunt",
      cover: "https://picsum.photos/seed/book46/150/225",
      genre: "mystery",
      rating: 4.6,
      readers: "12.8k",
      pages: 362,
      language: "EN",
      description: "A mystery novel about a missing portrait.",
      publishedYear: 2020,
      status: 'available',
      likes: 5678,
    },
    {
      id: 47,
      title: "Medieval Tales",
      author: "Arthur Knight",
      cover: "https://picsum.photos/seed/book47/150/225",
      genre: "fiction",
      rating: 4.5,
      readers: "10.9k",
      pages: 324,
      language: "EN",
      description: "A collection of tales set in medieval times.",
      publishedYear: 2019,
      status: 'borrowed',
      likes: 6789,
    },
    {
      id: 48,
      title: "Future Earth",
      author: "Zoe Clarke",
      cover: "https://picsum.photos/seed/book48/150/225",
      genre: "sci-fi",
      rating: 4.8,
      readers: "17.3k",
      pages: 412,
      language: "EN",
      description: "A sci-fi novel set in a future Earth.",
      publishedYear: 2021,
      status: 'available',
      likes: 7890,
    },
    {
      id: 49,
      title: "Business Strategy",
      author: "Michael Porter",
      cover: "https://picsum.photos/seed/book49/150/225",
      genre: "non-fiction",
      rating: 4.7,
      readers: "20.1k",
      pages: 354,
      language: "EN",
      description: "A guide to effective business strategies.",
      publishedYear: 2017,
      status: 'borrowed',
      likes: 8901,
    },
    {
      id: 50,
      title: "Paris Nights",
      author: "Marie Laurent",
      cover: "https://picsum.photos/seed/book50/150/225",
      genre: "romance",
      rating: 4.5,
      readers: "11.6k",
      pages: 276,
      language: "EN",
      description: "A romantic story set in the nightlife of Paris.",
      publishedYear: 2018,
      status: 'available',
      likes: 9012,
    },
    {
      id: 51,
      title: "Quantum Computing",
      author: "Dr. Richard Gates",
      cover: "https://picsum.photos/seed/book51/150/225",
      genre: "non-fiction",
      rating: 4.9,
      readers: "18.4k",
      pages: 354,
      language: "EN",
      description: "An exploration of quantum computing and its potential.",
      publishedYear: 2020,
      status: 'borrowed',
      likes: 1234,
    },
    {
      id: 52,
      title: "The Perfect Alibi",
      author: "Laura Chase",
      cover: "https://picsum.photos/seed/book52/150/225",
      genre: "mystery",
      rating: 4.7,
      readers: "15.5k",
      pages: 384,
      language: "EN",
      description: "A mystery novel with the perfect alibi.",
      publishedYear: 2020,
      status: 'available',
      likes: 2345,
    },
    {
      id: 53,
      title: "Dragon's Lair",
      author: "Fantasy Master",
      cover: "https://picsum.photos/seed/book53/150/225",
      genre: "fiction",
      rating: 4.6,
      readers: "13.7k",
      pages: 324,
      language: "EN",
      description: "A fantasy novel set in a dragon's lair.",
      publishedYear: 2021,
      status: 'borrowed',
      likes: 3456,
    },
    {
      id: 54,
      title: "Love Letters",
      author: "Rose Winter",
      cover: "https://picsum.photos/seed/book54/150/225",
      genre: "romance",
      rating: 4.4,
      readers: "10.5k",
      pages: 276,
      language: "EN",
      description: "A collection of romantic love letters.",
      publishedYear: 2019,
      status: 'available',
      likes: 4567,
    },
    {
      id: 55,
      title: "Space Colony Alpha",
      author: "Neil Armstrong Jr.",
      cover: "https://picsum.photos/seed/book55/150/225",
      genre: "sci-fi",
      rating: 4.8,
      readers: "16.9k",
      pages: 412,
      language: "EN",
      description: "A sci-fi novel set in a space colony.",
      publishedYear: 2022,
      status: 'borrowed',
      likes: 5678,
    }
  ];

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleAddToCollection = (bookId: number) => {
    // TODO: Implement add to collection functionality
    console.log(`Adding book ${bookId} to collection`);
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
    const matchesRating = book.rating >= filters.minRating && book.rating <= filters.maxRating;
    const matchesReaders = parseInt(book.readers) >= filters.minReaders;
    
    return matchesSearch && matchesGenre && matchesRating && matchesReaders;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return parseInt(b.readers) - parseInt(a.readers);
  });

  // Calculate pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(sortedBooks.length / booksPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const getPageNumbers = (current: number, total: number) => {
    if (total <= 8) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
  
    if (current <= 4) {
      return [...Array.from({ length: 8 }, (_, i) => i + 1), '...', total];
    }
  
    if (current >= total - 3) {
      return [1, '...', ...Array.from({ length: 8 }, (_, i) => total - 7 + i)];
    }
  
    return [
      1,
      '...',
      ...Array.from({ length: 7 }, (_, i) => current - 3 + i),
      '...',
      total
    ];
  };

  return (
    <div className="library-container">
      <div className="library-header">
        <h1>Library</h1>
        <div className="library-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search books or authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-button">Search</button>
          </div>

          <button 
            className={`advanced-search-toggle ${showAdvancedSearch ? 'open' : ''}`}
            onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
          >
            {showAdvancedSearch ? 'Simple Search' : 'Advanced Search'}
            <i className='bx bx-chevron-down'></i>
          </button>
        </div>

        <div className={`advanced-search-panel ${showAdvancedSearch ? 'open' : ''}`}>
          <div className="filter-group">
            <label>Genre</label>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value as Genre)}
              className="genre-select"
            >
              <option value="all">All Genres</option>
              <option value="fiction">Fiction</option>
              <option value="non-fiction">Non-Fiction</option>
              <option value="mystery">Mystery</option>
              <option value="sci-fi">Science Fiction</option>
              <option value="romance">Romance</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'rating' | 'readers')}
              className="sort-select"
            >
              <option value="rating">Rating</option>
              <option value="readers">Readers</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Rating Range</label>
            <div className="rating-inputs">
              <input
                type="number"
                name="minRating"
                min="0"
                max="5"
                step="0.1"
                value={filters.minRating}
                onChange={handleFilterChange}
                placeholder="Min"
              />
              <span>to</span>
              <input
                type="number"
                name="maxRating"
                min="0"
                max="5"
                step="0.1"
                value={filters.maxRating}
                onChange={handleFilterChange}
                placeholder="Max"
              />
            </div>
          </div>

          <div className="filter-group">
            <label>Minimum Readers</label>
            <input
              type="number"
              name="minReaders"
              min="0"
              value={filters.minReaders}
              onChange={handleFilterChange}
              placeholder="Min readers"
            />
          </div>

          <div className="filter-group">
            <label>Year Published</label>
            <input
              type="number"
              name="yearPublished"
              min="1900"
              max={new Date().getFullYear()}
              value={filters.yearPublished}
              onChange={handleFilterChange}
              placeholder="Year"
            />
          </div>

          <div className="filter-group">
            <label>Language</label>
            <select
              name="language"
              value={filters.language}
              onChange={handleFilterChange}
            >
              <option value="all">All Languages</option>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
        </div>
      </div>

      <div className="books-list">
        {currentBooks.map(book => (
          <div className="book-card" key={book.id}>
            <div className="book-actions">
              <button 
                className="add-to-collection-btn"
                onClick={() => handleAddToCollection(book.id)}
              >
                <i className='bx bx-plus'></i>
                Add to Collection
              </button>
            </div>
            <div className="book-info-container">
              <div className="book-cover-title-group">
                <div className="book-cover-wrapper">
                  <img src={book.cover} alt={`Cover of ${book.title}`} className="book-cover" />
                </div>
                <div className="book-title-section">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">{book.author}</p>
                  <div className="book-categories">
                    <span className="book-genre">{book.genre}</span>
                    {book.tags && book.tags.length > 0 && (
                      <>
                        <span className="book-categories-separator">/</span>
                        {book.tags.join(', ')}
                      </>
                    )}
                  </div>
                  <div className="book-quick-info">
                    <span className="quick-info-item">★ {book.rating}</span>
                    <span className="quick-info-separator">•</span>
                    <span className="quick-info-item">{book.pages} pages</span>
                    <span className="quick-info-separator">•</span>
                    <span className="quick-info-item">{book.readers} readers</span>
                    {book.likes && (
                      <>
                        <span className="quick-info-separator">•</span>
                        <span className="quick-info-item">
                          <i className='bx bxs-heart'></i> {book.likes}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="book-status-info">
                    {book.readingStatus === 'finished' ? (
                      <>
                        <span className="reading-status">Finished</span>
                        <span className="status-separator">|</span>
                        <span className="last-updated">Finished in {book.finishedDate}</span>
                      </>
                    ) : (
                      <>
                        <span className="reading-status">
                          {book.readingStatus === 'in-progress' ? 'In Progress' : 'Frozen'}
                        </span>
                        <span className="status-separator">|</span>
                        <span className="last-updated">
                          Updated {new Date(book.lastUpdated!).toLocaleDateString()}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="book-content">
                <div className="book-main-content">
                  <p className="book-description">{book.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedBooks.length > booksPerPage && (
        <div className="pagination">
          <button
            className="pagination-button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          
          {getPageNumbers(currentPage, totalPages).map((number, index) => (
            number === '...' ? (
              <span key={`ellipsis-${index}`} className="page-ellipsis">...</span>
            ) : (
              <button
                key={number}
                className={`page-number ${currentPage === number ? 'active' : ''}`}
                onClick={() => handlePageChange(number as number)}
              >
                {number}
              </button>
            )
          ))}

          <button
            className="pagination-button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default LibraryPage;