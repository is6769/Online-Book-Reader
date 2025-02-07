import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CollectionsPage.css';

const mockCollections = [
  {
    id: 3,
    name: "Computer Science",
    description: "Technical and programming books",
    shortDescription: "Tech and programming books",
    count: 15,
    icon: 'bx-code-alt',
    isDefault: false,
    lastUpdated: "2024-01-05"
  },
  {
    id: 4,
    name: "Fiction",
    description: "Novels and stories",
    shortDescription: "Novels and stories",
    count: 42,
    icon: 'bx-book-heart',
    isDefault: false,
    lastUpdated: "2024-01-01"
  }
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
  },
  {
    id: 'history',
    name: "Reading History",
    description: "Your completed books",
    count: 45,
    icon: 'bx-history',
    lastUpdated: "2024-01-05"
  }
];

const CollectionsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [collectionToDelete, setCollectionToDelete] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleViewCollection = (id: string | number) => {
    navigate(`/collections/${id}`);
  };

  const handleDeleteClick = (e: React.MouseEvent, collectionId: number) => {
    e.stopPropagation(); // Prevent card click
    setCollectionToDelete(collectionId);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (collectionToDelete) {
      // Add API call here to delete collection
      console.log('Deleting collection:', collectionToDelete);
      // Mock success - remove this when adding real API call
      setShowDeleteDialog(false);
      setCollectionToDelete(null);
    }
  };

  // Add search filter functions
  const filterCollections = (collections: any[], query: string) => {
    if (!query.trim()) return collections;
    
    const searchTerm = query.toLowerCase().trim();
    return collections.filter(collection => 
      collection.name.toLowerCase().includes(searchTerm) ||
      collection.description.toLowerCase().includes(searchTerm)
    );
  };

  // Filter collections based on search
  const filteredDefaultCollections = filterCollections(defaultCollections, searchQuery);
  const filteredCustomCollections = filterCollections(mockCollections, searchQuery);

  return (
    <div className="collections-page">
      <header className="page-header">
        <div className="header-content">
          <div>
            <h1>My Collections</h1>
            <p className="header-description">
              Organize and manage your personal library
            </p>
          </div>
          <div className="header-actions">
            <div className="search-wrapper">
              <i className='bx bx-search'></i>
              <input
                type="text"
                placeholder="Find collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              className="create-list-btn"
              onClick={() => navigate('/collections/create')}
            >
              <i className='bx bx-plus'></i>
              New Collection
            </button>
          </div>
        </div>
      </header>

      {(filteredDefaultCollections.length > 0 || !searchQuery) && (
        <>
          <div className="section-header">
            <h2>Default Collections</h2>
            <p>Your essential reading collections</p>
          </div>

          <div className="collections-grid">
            {filteredDefaultCollections.map(collection => (
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
        </>
      )}

      {(filteredCustomCollections.length > 0 || !searchQuery) && (
        <>
          <div className="section-header">
            <h2>Custom Collections</h2>
            <p>Organize your books into personalized collections</p>
          </div>

          <div className="collections-grid">
            {filteredCustomCollections.map(collection => (
              <div key={collection.id} className={`collection-card ${collection.isDefault ? 'default' : 'custom'}`}>
                <div className="collection-header">
                  <div className="collection-icon">
                    <i className={`bx ${collection.icon}`}></i>
                  </div>
                  <div className="collection-actions">
                    <button 
                      className="action-btn"
                      onClick={() => navigate(`/collections/${collection.id}/edit`)}
                    >
                      <i className='bx bx-edit-alt'></i>
                    </button>
                    <button 
                      className="action-btn"
                      onClick={(e) => handleDeleteClick(e, collection.id)}
                    >
                      <i className='bx bx-trash'></i>
                    </button>
                  </div>
                </div>
                
                <div className="collection-content">
                  <h3>{collection.name}</h3>
                  <p className="collection-description">{collection.shortDescription}</p>
                  
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
        </>
      )}

      {!filteredDefaultCollections.length && !filteredCustomCollections.length && searchQuery && (
        <div className="no-results">
          <p>No collections found matching "{searchQuery}"</p>
        </div>
      )}

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
};

export default CollectionsPage;
