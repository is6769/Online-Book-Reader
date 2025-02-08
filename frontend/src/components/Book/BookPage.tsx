import React, { useState } from 'react';
import './BookPage.css';
import CommentSection from '../Comments/CommentSection';

interface Chapter {
  id: string;
  number: number;
  title: string;
  publishedAt: Date;
  commentsCount: number;
}

interface BookMetadata {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  likes: number;
  genres: string[];
  tags: string[];
  status: 'in_progress' | 'frozen' | 'finished';
  language: string;
  description: string;
  series?: { name: string; position: number };
  lastUpdated: Date;
  rating: number;
  readersCount: number;
  isLiked?: boolean;
  userRating?: number;
  chapters: Chapter[];
}

const BookPage: React.FC = () => {
  // Temporary mock data - replace with actual data fetching
  const book: BookMetadata = {
    id: '1',
    title: 'Sample Book Title',
    author: 'John Doe',
    coverUrl: 'https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg',
    likes: 1234,
    genres: ['Fantasy', 'Adventure'],
    tags: ['Magic', 'Dragons', 'Epic'],
    status: 'in_progress',
    language: 'English',
    description: 'An epic tale of adventure and discovery...',
    series: { name: 'The Epic Series', position: 1 },
    lastUpdated: new Date(),
    rating: 4.5,
    readersCount: 5678,
    chapters: [
      {
        id: '1',
        number: 1,
        title: 'The Beginning',
        publishedAt: new Date('2024-01-01T12:30:00'),
        commentsCount: 45
      },
      {
        id: '2',
        number: 2,
        title: 'The Journey Begins',
        publishedAt: new Date('2024-01-15T15:20:00'),
        commentsCount: 32
      },
      {
        id: '3',
        number: 3,
        title: 'Unexpected Allies',
        publishedAt: new Date('2024-02-01T09:45:00'),
        commentsCount: 28
      },
      {
        id: '4',
        number: 4,
        title: 'The First Challenge',
        publishedAt: new Date('2024-02-15T18:15:00'),
        commentsCount: 19
      }
    ]
  };

  const [activeSection, setActiveSection] = useState('chapters');
  const [isLiked, setIsLiked] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(null);

  const handleLike = () => {
    setIsLiked(!isLiked);
    // TODO: Add API call to update like status
  };

  const handleRating = (rating: number) => {
    setUserRating(rating);
    // TODO: Add API call to update rating
  };

  const handleReadClick = () => {
    // TODO: Implement read functionality
  };

  const handleAddToCollection = () => {
    // TODO: Implement collection functionality
  };

  return (
    <div className="container page-content">
      <div className="book-details-section">
        <div className="left-column">
          <div className="book-cover-container">
            <div className="book-cover">
              <img src={book.coverUrl} alt={`Cover of ${book.title}`} />
            </div>
          </div>
          <div className="book-actions-container">
            <div className="cover-actions">
              <button className="action-button primary" onClick={handleReadClick}>
                Read Now
              </button>
              <button className="action-button secondary" onClick={handleAddToCollection}>
                Add to Collection
              </button>
            </div>
          </div>
        </div>
        
        <div className="book-content-container">
          <div className="book-metadata">
            <div className="book-header">
              <h1>{book.title}</h1>
              <div className="book-author">by {book.author}</div>
            </div>
            
            <div className="book-stats">
              <div className="stat-item">
                <span className="stat-value">{book.rating.toFixed(1)}</span>
                <div className="rating-controls">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className={`star-button ${userRating && star <= userRating ? 'active' : ''}`}
                      onClick={() => handleRating(star)}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div className="stat-item">
                <button 
                  className={`like-button ${isLiked ? 'liked' : ''}`}
                  onClick={handleLike}
                >
                  <span className="stat-value">{book.likes}</span>
                  <span className="stat-label">{isLiked ? 'Liked' : 'Like'}</span>
                </button>
              </div>
              <div className="stat-item">
                <span className="stat-value">{book.readersCount.toLocaleString()}</span>
                <span className="stat-label">Readers</span>
              </div>
            </div>

            <div className="book-info-rows">
              <div className="book-info-row">
                <span className="info-label">Status</span>
                <span>{book.status.replace('_', ' ')}</span>
              </div>
              <div className="book-info-row">
                <span className="info-label">Series</span>
                <span>{book.series ? `${book.series.name} (Book ${book.series.position})` : 'Standalone'}</span>
              </div>
              <div className="book-info-row">
                <span className="info-label">Language</span>
                <span>{book.language}</span>
              </div>
              <div className="book-info-row">
                <span className="info-label">Updated</span>
                <span>{book.lastUpdated.toLocaleDateString()}</span>
              </div>
            </div>

            <div className="tags-section">
              <div className="tags-label">Genres</div>
              <div className="book-genres">
                {book.genres.map(genre => (
                  <span key={genre} className="genre-tag">{genre}</span>
                ))}
              </div>
              
              <div className="tags-label">Tags</div>
              <div className="book-tags">
                {book.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="book-full-width-content">
        <div className="n-book-description">
          <h3>Description</h3>
          <p>{book.description}</p>
        </div>

        <nav className="book-navigation">
          <ul>
            <li>
              <button 
                className={activeSection === 'chapters' ? 'active' : ''}
                onClick={() => setActiveSection('chapters')}
              >
                Chapters
              </button>
            </li>
            <li>
              <button 
                className={activeSection === 'comments' ? 'active' : ''}
                onClick={() => setActiveSection('comments')}
              >
                Comments
              </button>
            </li>
            <li>
              <button 
                className={activeSection === 'reviews' ? 'active' : ''}
                onClick={() => setActiveSection('reviews')}
              >
                Reviews
              </button>
            </li>
            <li>
              <button 
                className={activeSection === 'similar' ? 'active' : ''}
                onClick={() => setActiveSection('similar')}
              >
                Similar Books
              </button>
            </li>
          </ul>
        </nav>

        <div className="section-content">
          {activeSection === 'chapters' && (
            <div className="chapters-list">
              {book.chapters.map(chapter => (
                <div key={chapter.id} className="chapter-item">
                  <div className="chapter-main">
                    <span className="chapter-number">Chapter {chapter.number}</span>
                    <h3 className="chapter-title">{chapter.title}</h3>
                  </div>
                  <div className="chapter-info">
                    <span className="chapter-comments">{chapter.commentsCount} comments</span>
                    <span className="chapter-date">
                      {chapter.publishedAt.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeSection === 'comments' && (
            <div className="book-comments">
              <CommentSection />
            </div>
          )}
          {/* Other section content remains unchanged */}
        </div>
      </div>
    </div>
  );
};

export default BookPage;
