import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate(); // Add navigate hook
  const [activeTab, setActiveTab] = useState('overview');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [collectionToDelete, setCollectionToDelete] = useState<number | null>(null);

  // Mock user stats and data
  const userStats = {
    booksRead: 24,
    pagesRead: 6248,
    averageRating: 4.5,
    readingStreak: 15,
    favoriteGenre: 'Science Fiction',
    timeSpentReading: '156 hours',
    publishedBooks: 3,
    totalReaders: 1240,
    achievements: [
      { id: 1, name: 'Bookworm', icon: 'bx-book-heart', description: 'Read 10 books' },
      { id: 2, name: 'Author', icon: 'bx-pen', description: 'Published first book' },
      { id: 3, name: 'Streak Master', icon: 'bx-flame', description: '10 days reading streak' }
    ]
  };

  const publishedBooks = [
    { id: 1, title: 'Digital Dreams', reads: 560, rating: 4.8, status: 'published' },
    { id: 2, title: 'The AI Revolution', reads: 420, rating: 4.6, status: 'published' },
    { id: 3, title: 'Future Perfect', reads: 260, rating: 4.7, status: 'draft' }
  ];

  // Add mock collections data
  const userCollections = [
    { id: 1, name: 'Science Fiction', bookCount: 12, icon: 'bx-rocket' },
    { id: 2, name: 'Fantasy', bookCount: 8, icon: 'bx-book-heart' },
    { id: 3, name: 'Technical Books', bookCount: 15, icon: 'bx-code-alt' }
  ];

  const defaultCollections = [
    {
      id: 'reading',
      name: "Currently Reading",
      description: "Track your active reading progress",
      count: 3,
      icon: 'bx-book-open',
      lastUpdated: "2024-01-15"
    },
    {
      id: 'favorites',
      name: "Favorites",
      description: "Your favorite books collection",
      count: 28,
      icon: 'bx-star',
      lastUpdated: "2024-01-10"
    }
  ];

  const customCollections = [
    {
      id: 1,
      name: "Science Fiction",
      description: "Best sci-fi books",
      count: 12,
      icon: 'bx-rocket',
      lastUpdated: "2024-01-05"
    },
    {
      id: 2,
      name: "Fantasy",
      description: "Magic and adventure",
      count: 8,
      icon: 'bx-book-heart',
      lastUpdated: "2024-01-03"
    }
  ];

  const handleEditWork = (workId: number) => {
    navigate(`/original-works/${workId}/edit`, { 
      state: { returnTo: '/profile' }
    });
  };

  const handleManageWork = (workId: number) => {
    navigate(`/original-works/${workId}/manage`, {
      state: { returnTo: '/profile' }
    });
  };

  const handleCreateWork = () => {
    navigate('/original-works/create');
  };

  const handleViewCollection = (collectionId: string | number) => {
    navigate(`/collections/${collectionId}`);
  };

  const handleEditCollection = (collectionId: number) => {
    navigate(`/collections/${collectionId}/edit`);
  };

  const handleDeleteCollectionClick = (e: React.MouseEvent, collectionId: number) => {
    e.stopPropagation();
    setCollectionToDelete(collectionId);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (collectionToDelete) {
      // Add API call here to delete collection
      console.log('Deleting collection:', collectionToDelete);
      setShowDeleteDialog(false);
      setCollectionToDelete(null);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="overview-content">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Books Read</h3>
                <p className="stat-value">{userStats.booksRead}</p>
              </div>
              <div className="stat-card">
                <h3>Pages Read</h3>
                <p className="stat-value">{userStats.pagesRead}</p>
              </div>
              <div className="stat-card">
                <h3>Average Rating</h3>
                <p className="stat-value">⭐ {userStats.averageRating}</p>
              </div>
              <div className="stat-card">
                <h3>Reading Streak</h3>
                <p className="stat-value">🔥 {userStats.readingStreak} days</p>
              </div>
              <div className="stat-card highlight">
                <h3>Published Books</h3>
                <p className="stat-value">{userStats.publishedBooks}</p>
              </div>
              <div className="stat-card highlight">
                <h3>Total Readers</h3>
                <p className="stat-value">{userStats.totalReaders}</p>
              </div>
            </div>
            
            <div className="achievements-section">
              <h2>Achievements</h2>
              <div className="achievements-grid">
                {userStats.achievements.map(achievement => (
                  <div key={achievement.id} className="achievement-card">
                    <i className={`bx ${achievement.icon}`}></i>
                    <h4>{achievement.name}</h4>
                    <p>{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'original-works':
        return (
          <div className="original-works-content">
            <div className="books-header">
              <h2>Original Works</h2>
              <button 
                className="create-work-btn"
                onClick={handleCreateWork}
              >
                <i className='bx bx-plus'></i>
                Create New Work
              </button>
            </div>
            <div className="works-grid">
              {publishedBooks.map(book => (
                <div key={book.id} className="work-card">
                  <div className="work-cover">
                    <img src={`/book-covers/${book.id}.jpg`} alt={book.title} />
                    <span className={`status-badge status-${book.status}`}>
                      {book.status}
                    </span>
                  </div>
                  
                  <div className="work-content">
                    <h3>{book.title}</h3>
                    <p className="work-description">
                      Your amazing story description here...
                    </p>
                    
                    <div className="work-stats">
                      <span><i className='bx bx-book'></i>12 chapters</span>
                      <span><i className='bx bx-reader'></i>{book.reads} reads</span>
                      {book.rating > 0 && (
                        <span><i className='bx bxs-star'></i>{book.rating}</span>
                      )}
                    </div>
                    
                    <div className="work-meta">
                      <span className="genre">Fiction</span>
                      <span className="update-date">Last updated today</span>
                    </div>

                    <div className="work-actions">
                      <button 
                        className="edit-btn" 
                        onClick={() => handleEditWork(book.id)}
                        title="Edit book content and information"
                      >
                        <i className='bx bx-edit'></i>
                        Edit Content
                      </button>
                      <button 
                        className="manage-btn"
                        onClick={() => handleManageWork(book.id)}
                        title="Manage publishing and analytics"
                      >
                        <i className='bx bx-cog'></i>
                        Manage
                      </button>
                      <button className="delete-btn">
                        <i className='bx bx-trash'></i>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'collections':
        return (
          <div className="collections-content">
            <div className="section-header">
              <h2>Default Collections</h2>
              <p>Your essential reading collections</p>
            </div>

            <div className="collections-grid">
              {defaultCollections.map(collection => (
                <div key={collection.id} className="collection-card default">
                  <div className="collection-header">
                    <div className="collection-icon">
                      <i className={`bx ${collection.icon}`}></i>
                    </div>
                  </div>
                  
                  <div className="collection-content">
                    <h3>{collection.name}</h3>
                    <p className="collection-description">{collection.description}</p>
                    
                    <div className="collection-meta">
                      <span className="book-count">
                        <i className='bx bx-book'></i>
                        {collection.count} books
                      </span>
                    </div>
                    
                    <div className="collection-footer">
                      <div className="update-date">
                        <i className='bx bx-calendar'></i>
                        <span>Updated {collection.lastUpdated}</span>
                      </div>
                      <button 
                        className="view-btn"
                        onClick={() => handleViewCollection(collection.id)}
                      >
                        View Collection
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="section-header">
              <h2>Custom Collections</h2>
              <p>Your personalized book collections</p>
            </div>

            <div className="collections-grid">
              {customCollections.map(collection => (
                <div key={collection.id} className="collection-card custom">
                  <div className="collection-header">
                    <div className="collection-icon">
                      <i className={`bx ${collection.icon}`}></i>
                    </div>
                    <div className="collection-actions">
                      <button 
                        className="action-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditCollection(collection.id);
                        }}
                        title="Edit collection"
                      >
                        <i className='bx bx-edit-alt'></i>
                      </button>
                      <button 
                        className="action-btn"
                        onClick={(e) => handleDeleteCollectionClick(e, collection.id)}
                        title="Delete collection"
                      >
                        <i className='bx bx-trash'></i>
                      </button>
                    </div>
                  </div>
                  
                  <div className="collection-content">
                    <h3>{collection.name}</h3>
                    <p className="collection-description">{collection.description}</p>
                    
                    <div className="collection-meta">
                      <span className="book-count">
                        <i className='bx bx-book'></i>
                        {collection.count} books
                      </span>
                    </div>
                    
                    <div className="collection-footer">
                      <div className="update-date">
                        <i className='bx bx-calendar'></i>
                        <span>Updated {collection.lastUpdated}</span>
                      </div>
                      <button 
                        className="view-btn"
                        onClick={() => handleViewCollection(collection.id)}
                      >
                        View Collection
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {showDeleteDialog && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h3>Delete Collection?</h3>
                  <p>Are you sure you want to delete this collection? This action cannot be undone.</p>
                  <div className="modal-actions">
                    <button 
                      className="secondary-btn"
                      onClick={() => {
                        setShowDeleteDialog(false);
                        setCollectionToDelete(null);
                      }}
                    >
                      Cancel
                    </button>
                    <button 
                      className="danger-btn"
                      onClick={handleConfirmDelete}
                    >
                      Delete Collection
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-info">
          <div className="profile-avatar">
            {user?.nickname?.charAt(0).toUpperCase()}
          </div>
          <div className="profile-details">
            <h1>{user?.nickname}</h1>
            <p>{user?.email}</p>
            <div className="profile-badges">
              <span className="badge author">Author</span>
              <span className="badge premium">
                <i className='bx bx-crown'></i> Premium
              </span>
            </div>
          </div>
        </div>
        <button className="edit-profile-button">Edit Profile</button>
      </div>

      <div className="profile-tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab ${activeTab === 'original-works' ? 'active' : ''}`}
          onClick={() => setActiveTab('original-works')}
        >
          Original Works
        </button>
        <button 
          className={`tab ${activeTab === 'collections' ? 'active' : ''}`}
          onClick={() => setActiveTab('collections')}
        >
          Collections
        </button>
      </div>

      <div className="profile-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProfilePage;
