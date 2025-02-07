import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ViewCollectionPage.css';

// Mock data - replace with actual API calls later
const mockCollectionData: { [key: string]: any } = {
  '3': {
    id: 3,
    name: "Computer Science",
    description: "Technical and programming books",
    count: 15,
    icon: 'bx-code-alt',
    lastUpdated: "2024-01-05",
    stats: {
      total: 15,
      reading: 2,
      completed: 8
    },
    books: [
      {
        id: 1,
        title: "The Pragmatic Programmer",
        author: "David Thomas, Andrew Hunt",
        cover: "/images/book1.jpg",
        progress: 65,
        lastRead: "2024-01-15"
      },
      {
        id: 2,
        title: "Clean Code",
        author: "Robert C. Martin",
        cover: "/images/book2.jpg",
        progress: 30,
        lastRead: "2024-01-10"
      }
    ]
  },
  'reading': {
    id: 'reading',
    name: "Currently Reading",
    description: "Track your active reading progress",
    count: 3,
    icon: 'bx-book-open',
    lastUpdated: "2024-01-15",
    stats: {
      total: 3,
      reading: 3,
      completed: 0
    },
    books: [
      {
        id: 1,
        title: "The Pragmatic Programmer",
        author: "David Thomas, Andrew Hunt",
        cover: "/images/book1.jpg",
        progress: 65,
        lastRead: "2024-01-15"
      },
      {
        id: 2,
        title: "Clean Code",
        author: "Robert C. Martin",
        cover: "/images/book2.jpg",
        progress: 30,
        lastRead: "2024-01-10"
      }
    ]
  }
  // Add more collections as needed
};

const ViewCollectionPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [collection, setCollection] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchCollection = () => {
      setLoading(true);
      setTimeout(() => {
        if (id && mockCollectionData[id]) {
          setCollection(mockCollectionData[id]);
        }
        setLoading(false);
      }, 500);
    };

    fetchCollection();
  }, [id]);

  const isDefaultCollection = id === 'reading' || id === 'favorites' || id === 'history';

  if (loading) {
    return (
      <div className="view-collection-page">
        <div className="loading-state">
          <i className='bx bx-loader-alt bx-spin'></i>
          <p>Loading collection...</p>
        </div>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="view-collection-page">
        <div className="error-state">
          <i className='bx bx-error-circle'></i>
          <h2>Collection not found</h2>
          <button className="back-btn" onClick={() => navigate('/collections')}>
            Back to Collections
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="view-collection-page">
      <header className="page-header">
        <div className="header-content">
          <div className="header-left">
            <button className="back-btn" onClick={() => navigate('/collections')}>
              <i className='bx bx-arrow-left'></i>
              Back to Collections
            </button>
            <div>
              <h1>{collection.name}</h1>
              <p className="header-description">{collection.description}</p>
            </div>
          </div>
          <div className="header-actions">
            {!isDefaultCollection && (
              <button 
                className="edit-collection-btn"
                onClick={() => navigate(`/collections/${id}/edit`)}
              >
                <i className='bx bx-edit-alt'></i>
                Edit Collection
              </button>
            )}
            <button 
              className="primary-btn"
              onClick={() => navigate(`/collections/${id}/add-books`)}
            >
              <i className='bx bx-plus'></i>
              Add Books
            </button>
          </div>
        </div>
      </header>

      <div className="collection-stats">
        <div className="stat-card">
          <i className='bx bx-book'></i>
          <div>
            <h3>Total Books</h3>
            <span>{collection.stats.total} books</span>
          </div>
        </div>
        <div className="stat-card">
          <i className='bx bx-book-reader'></i>
          <div>
            <h3>Currently Reading</h3>
            <span>{collection.stats.reading} books</span>
          </div>
        </div>
        <div className="stat-card">
          <i className='bx bx-check-circle'></i>
          <div>
            <h3>Completed</h3>
            <span>{collection.stats.completed} books</span>
          </div>
        </div>
      </div>

      <section className="books-section">
        <div className="section-header">
          <h2>Books in Collection</h2>
          <div className="view-options">
            <button className="view-btn active">
              <i className='bx bx-grid-alt'></i>
            </button>
            <button className="view-btn">
              <i className='bx bx-list-ul'></i>
            </button>
          </div>
        </div>

        <div className="books-grid">
          {collection.books.map((book: any) => (
            <div key={book.id} className="book-card">
              <div className="book-cover">
                <img src={book.cover} alt={book.title} />
                <div className="book-progress">
                  <div 
                    className="progress-bar"
                    style={{ width: `${book.progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="book-info">
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <div className="book-meta">
                  <span>
                    <i className='bx bx-time'></i>
                    Last read {book.lastRead}
                  </span>
                  <span>{book.progress}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ViewCollectionPage;
