import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../../styles/common.css';
import './HomePage.css';

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  genre: string;
  rating: number;
  readers: string;
  pages?: number;
  language?: string;
  updatedAt?: string;
}

const HomePage = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const booksPerView = 4;
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const [popularWidth, setPopularWidth] = useState(0);
  const [recentWidth, setRecentWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);
  const popularCarousel = useRef<HTMLDivElement>(null);
  const recentCarousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidths = () => {
      if (carousel.current) {
        setWidth(Math.max(0, carousel.current.scrollWidth - carousel.current.offsetWidth));
      }
      if (popularCarousel.current) {
        setPopularWidth(Math.max(0, popularCarousel.current.scrollWidth - popularCarousel.current.offsetWidth));
      }
      if (recentCarousel.current) {
        setRecentWidth(Math.max(0, recentCarousel.current.scrollWidth - recentCarousel.current.offsetWidth));
      }
    };

    updateWidths();
    window.addEventListener('resize', updateWidths);
    return () => window.removeEventListener('resize', updateWidths);
  }, []);

  const booksList = [
    {
      id: 1,
      title: "The Shadow's Edge",
      author: "Emma Blackwood",
      cover: "https://picsum.photos/seed/book1/300/400",
      rating: 4.8,
      readers: "12.3k"
    },
    {
      id: 2,
      title: "Midnight Chronicles",
      author: "James Spencer",
      cover: "https://picsum.photos/seed/book2/300/400",
      rating: 4.9,
      readers: "8.7k"
    },
    {
      id: 3,
      title: "The Lost Key",
      author: "Sarah Quinn",
      cover: "https://picsum.photos/seed/book3/300/400",
      rating: 4.7,
      readers: "15.2k"
    },
    {
      id: 4,
      title: "Ocean's Secret",
      author: "Michael Chen",
      cover: "https://picsum.photos/seed/book4/300/400",
      rating: 4.6,
      readers: "10.1k"
    },
    {
      id: 5,
      title: "Winter's Tale",
      author: "Anna Frost",
      cover: "https://picsum.photos/seed/book5/300/400",
      rating: 4.9,
      readers: "9.8k"
    },
    {
      id: 6,
      title: "Desert Storm",
      author: "Ahmed Hassan",
      cover: "https://picsum.photos/seed/book6/300/400",
      rating: 4.7,
      readers: "11.5k"
    },
    {
      id: 7,
      title: "City of Dreams",
      author: "Lisa Wong",
      cover: "https://picsum.photos/seed/book7/300/400",
      rating: 4.8,
      readers: "13.3k"
    },
    {
      id: 8,
      title: "Mountain's Call",
      author: "John Peak",
      cover: "https://picsum.photos/seed/book8/300/400",
      rating: 4.5,
      readers: "7.9k"
    }
  ];

  // Remove or comment out the auto-sliding logic
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prev) => (prev + 1) % booksList.length);
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, []);

  const featuredBooks = [
    {
      id: 1,
      title: "The Shadow's Edge",
      author: "Emma Blackwood",
      cover: "https://picsum.photos/seed/book1/300/400",
      genre: "Fantasy",
      rating: 4.8,
      readers: "12.3k",
      pages: 342,
      language: "EN"
    },
    {
      id: 2,
      title: "Midnight Chronicles",
      author: "James Spencer",
      cover: "https://picsum.photos/seed/book2/300/400",
      genre: "Fantasy",
      rating: 4.9,
      readers: "8.7k",
      pages: 342,
      language: "EN"
    },
    {
      id: 3,
      title: "The Lost Key",
      author: "Sarah Quinn",
      cover: "https://picsum.photos/seed/book3/300/400",
      genre: "Fantasy",
      rating: 4.7,
      readers: "15.2k",
      pages: 342,
      language: "EN"
    },
    {
      id: 4,
      title: "Ocean's Secret",
      author: "Michael Chen",
      cover: "https://picsum.photos/seed/book4/300/400",
      genre: "Fantasy",
      rating: 4.6,
      readers: "10.1k",
      pages: 342,
      language: "EN"
    },
    {
      id: 5,
      title: "Winter's Tale",
      author: "Anna Frost",
      cover: "https://picsum.photos/seed/book5/300/400",
      genre: "Fantasy",
      rating: 4.9,
      readers: "9.8k",
      pages: 342,
      language: "EN"
    },
    {
      id: 6,
      title: "Desert Storm",
      author: "Ahmed Hassan",
      cover: "https://picsum.photos/seed/book6/300/400",
      genre: "Fantasy",
      rating: 4.7,
      readers: "11.5k",
      pages: 342,
      language: "EN"
    },
    {
      id: 7,
      title: "City of Dreams",
      author: "Lisa Wong",
      cover: "https://picsum.photos/seed/book7/300/400",
      genre: "Fantasy",
      rating: 4.8,
      readers: "13.3k",
      pages: 342,
      language: "EN"
    },
    {
      id: 8,
      title: "Mountain's Call",
      author: "John Peak",
      cover: "https://picsum.photos/seed/book8/300/400",
      genre: "Fantasy",
      rating: 4.5,
      readers: "7.9k",
      pages: 342,
      language: "EN"
    }
  ];

// Update popularBooks array with complete data
const popularBooks = [
  {
    id: 1,
    title: "The Shadow's Edge",
    author: "Emma Blackwood",
    cover: "https://picsum.photos/seed/book1/300/400",
    genre: "Fantasy",
    rating: 4.8,
    readers: "12.3k",
    pages: 342,
    language: "EN"
  },
  {
    id: 2,
    title: "Midnight Chronicles",
    author: "James Spencer",
    cover: "https://picsum.photos/seed/book2/300/400",
    genre: "Mystery",
    rating: 4.9,
    readers: "8.7k",
    pages: 456,
    language: "EN"
  },
  // Add more books with the same structure...
];

// Update recentlyUpdatedBooks array with complete data
const recentlyUpdatedBooks = [
  {
    id: 1,
    title: "The Shadow's Edge",
    author: "Emma Blackwood",
    cover: "https://picsum.photos/seed/book1/300/400",
    genre: "Fantasy",
    rating: 4.8,
    readers: "12.3k",
    pages: 342,
    language: "EN",
    updatedAt: "2 days ago"
  },
  {
    id: 2,
    title: "Midnight Chronicles",
    author: "James Spencer",
    cover: "https://picsum.photos/seed/book2/300/400",
    genre: "Mystery",
    rating: 4.9,
    readers: "8.7k",
    pages: 456,
    language: "EN",
    updatedAt: "5 days ago"
  },
  // Add more books with the same structure...
];

  const handleBookClick = (bookId: number) => {
    window.location.href = `/book/${bookId}`;
  };

  // Add drag state
  const [dragStart, setDragStart] = useState(0);

  const handleDragStart = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleDragEnd = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    setIsDragging(false);
    const dragDistance = Math.abs(e.clientX - dragStart);
    
    // If dragged less than 5px, consider it a click
    if (dragDistance < 5) {
      const target = e.target as HTMLElement;
      const card = target.closest('.carousel-item');
      if (card) {
        const bookId = card.getAttribute('data-book-id');
        if (bookId) handleBookClick(parseInt(bookId));
      }
    }
  };

  return (
    <div className="container">
      <div className="page-content">
        <div className="header-section">
          <h1 className="page-title">Welcome to Online Book Reader</h1>
          <p className="page-subtitle">Your digital library for endless reading possibilities</p>
        </div>

        <section className="featured-section">
          <h2>Featured Books</h2>
          <motion.div 
            ref={carousel} 
            className="carousel" 
            whileTap={{ cursor: "grabbing" }}
          >
            <motion.div 
              drag="x"
              dragConstraints={{ right: 0, left: -width }}
              className="inner-carousel"
              dragElastic={0.08} // Reduced from 0.1 for tighter feel
              dragTransition={{
                bounceStiffness: 800, // Increased from 600
                bounceDamping: 50,   // Increased from 20
                power: 0.5          // Add power for smoother deceleration
              }}
              whileTap={{ cursor: "grabbing" }}
            >
              {featuredBooks.map((book) => (
                <motion.div 
                  className="carousel-item" 
                  key={book.id}
                  data-book-id={book.id}
                  onMouseDown={handleDragStart}
                  onMouseUp={handleDragEnd}
                  onMouseLeave={() => setIsDragging(false)}
                >
                  <div style={{ position: 'relative' }}>
                    <img src={book.cover} alt={book.title} />
                    <div className="hover-overlay">
                      <button className="read-now-btn">Read Now</button>
                    </div>
                  </div>
                  <div className="book-info">
                    <div className="genre-badge">{book.genre}</div>
                    <h3>{book.title}</h3>
                    <p>{book.author}</p>
                    <div className="book-badges">
                      <span className="badge rating-badge">
                        <i className='bx bxs-star'></i>
                        {book.rating}
                      </span>
                      <span className="badge">
                        <i className='bx bxs-group'></i>
                        {book.readers}
                      </span>
                      <span className="badge">
                        <i className='bx bxs-book'></i>
                        {book.pages}p
                      </span>
                      <span className="badge">
                        <i className='bx bx-globe'></i>
                        {book.language}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Popular Books Section */}
        <section className="featured-section">
  <h2>Popular Books</h2>
  <motion.div 
    ref={popularCarousel} 
    className="carousel" 
    whileTap={{ cursor: "grabbing" }}
  >
    <motion.div 
      drag="x"
      dragConstraints={{ right: 0, left: -popularWidth }}
      className="inner-carousel"
      dragElastic={0.08}
      dragTransition={{
        bounceStiffness: 800,
        bounceDamping: 50,
        power: 0.5
      }}
    >
      {popularBooks.map((book) => (
        <motion.div 
          className="carousel-item" 
          key={book.id}
          data-book-id={book.id}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onMouseLeave={() => setIsDragging(false)}
        >
          <div style={{ position: 'relative' }}>
            <img src={book.cover} alt={book.title} />
            <div className="hover-overlay">
              <button className="read-now-btn">Read Now</button>
            </div>
          </div>
          <div className="book-info">
            <div className="genre-badge">{book.genre}</div>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <div className="book-badges">
              <span className="badge rating-badge">
                <i className='bx bxs-star'></i>
                {book.rating}
              </span>
              <span className="badge">
                <i className='bx bxs-group'></i>
                {book.readers}
              </span>
              <span className="badge">
                <i className='bx bxs-book'></i>
                {book.pages}p
              </span>
              <span className="badge">
                <i className='bx bx-globe'></i>
                {book.language}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
</section>

        {/* Recently Updated Section */}
        <section className="featured-section">
  <h2>Recently Updated</h2>
  <motion.div 
    ref={recentCarousel} 
    className="carousel" 
    whileTap={{ cursor: "grabbing" }}
  >
    <motion.div 
      drag="x"
      dragConstraints={{ right: 0, left: -recentWidth }}
      className="inner-carousel"
      dragElastic={0.08}
      dragTransition={{
        bounceStiffness: 800,
        bounceDamping: 50,
        power: 0.5
      }}
    >
      {recentlyUpdatedBooks.map((book) => (
        <motion.div 
          className="carousel-item" 
          key={book.id}
          data-book-id={book.id}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onMouseLeave={() => setIsDragging(false)}
        >
          <div style={{ position: 'relative' }}>
            <img src={book.cover} alt={book.title} />
            <div className="hover-overlay">
              <button className="read-now-btn">Read Now</button>
            </div>
          </div>
          <div className="book-info">
            <div className="genre-badge">{book.genre}</div>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <div className="book-badges">
              <span className="badge rating-badge">
                <i className='bx bxs-star'></i>
                {book.rating}
              </span>
              <span className="badge">
                <i className='bx bxs-group'></i>
                {book.readers}
              </span>
              <span className="badge">
                <i className='bx bxs-book'></i>
                {book.pages}p
              </span>
              <span className="badge">
                <i className='bx bx-globe'></i>
                {book.language}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
</section>

      </div>
    </div>
  );
};

export default HomePage;
