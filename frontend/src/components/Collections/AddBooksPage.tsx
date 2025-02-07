import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AddBooksPage.css';

// Mock data - replace with API call
const mockBooks = [
  {
    id: 1,
    title: "The Pragmatic Programmer",
    author: "David Thomas, Andrew Hunt",
    cover: "/images/book1.jpg",
    categories: ["Programming", "Software Engineering"]
  },
  {
    id: 2,
    title: "Clean Code",
    author: "Robert C. Martin",
    cover: "/images/book2.jpg",
    categories: ["Programming", "Software Engineering"]
  },
  // Add more mock books as needed
];

const AddBooksPage: React.FC = () => {
  const { collectionId } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);

  const handleBookSelect = (bookId: number) => {
    setSelectedBooks(prev => 
      prev.includes(bookId) 
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  const handleAddBooks = () => {
    // Add API call here
    console.log('Adding books:', selectedBooks, 'to collection:', collectionId);
    navigate(`/collections/${collectionId}`);
  };

  return (
    <div className="add-books-page">
      <header className="page-header">
        <div className="header-content">
          <div className="header-left">
            <button 
              className="back-btn"
              onClick={() => navigate(`/collections/${collectionId}`)}
            >
              <i className='bx bx-arrow-left'></i>
              Back to Collection
            </button>
            <div>
              <h1>Add Books to Collection</h1>
              <p className="header-description">
                Select books to add to your collection
              </p>
            </div>
          </div>
          <div className="header-actions">
            <div className="search-wrapper">
              <i className='bx bx-search'></i>
              <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              className="primary-btn"
              onClick={handleAddBooks}
              disabled={selectedBooks.length === 0}
            >
              <i className='bx bx-plus'></i>
              Add Selected ({selectedBooks.length})
            </button>
          </div>
        </div>
      </header>

      <div className="books-grid">
        {mockBooks.map(book => (
          <div 
            key={book.id} 
            className={`book-card ${selectedBooks.includes(book.id) ? 'selected' : ''}`}
            onClick={() => handleBookSelect(book.id)}
          >
            <div className="book-cover">
              <img src={book.cover} alt={book.title} />
              {selectedBooks.includes(book.id) && (
                <div className="selected-overlay">
                  <i className='bx bx-check'></i>
                </div>
              )}
            </div>
            <div className="book-info">
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <div className="book-categories">
                {book.categories.map(category => (
                  <span key={category} className="category-tag">
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddBooksPage;
