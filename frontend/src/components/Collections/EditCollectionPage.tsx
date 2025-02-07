import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditCollectionPage.css';

const icons = [
  { id: 'bx-book-heart', label: 'Favorite Books' },
  { id: 'bx-code-alt', label: 'Programming' },
  { id: 'bx-bookmark', label: 'Bookmarked' },
  { id: 'bx-bookmarks', label: 'Collections' },
  { id: 'bx-glasses', label: 'Study' },
  { id: 'bx-library', label: 'Library' }
];

const EditCollectionPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState({
    name: '',
    description: '',
    icon: '',
    shortDescription: ''
  });

  useEffect(() => {
    // Simulate API call to fetch collection
    setLoading(true);
    setTimeout(() => {
      // Mock data - replace with actual API call
      setCollection({
        name: "Computer Science",
        description: "Technical and programming books",
        shortDescription: "Tech and programming books",
        icon: 'bx-code-alt'
      });
      setLoading(false);
    }, 500);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add API call here
    console.log('Updating collection:', collection);
    navigate(`/collections/${id}`);
  };

  if (loading) {
    return (
      <div className="edit-collection-page">
        <div className="loading-state">
          <i className='bx bx-loader-alt bx-spin'></i>
          <p>Loading collection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-collection-page">
      <header className="page-header">
        <div className="header-content">
          <div className="header-left">
            <button 
              className="back-btn"
              onClick={() => navigate(`/collections/${id}`)}
            >
              <i className='bx bx-arrow-left'></i>
              Back to Collection
            </button>
            <div>
              <h1>Edit Collection</h1>
              <p className="header-description">
                Update your collection details
              </p>
            </div>
          </div>
        </div>
      </header>

      <form className="collection-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Collection Name</label>
          <input
            id="name"
            type="text"
            value={collection.name}
            onChange={(e) => setCollection(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={collection.description}
            onChange={(e) => setCollection(prev => ({ ...prev, description: e.target.value }))}
            rows={4}
          />
        </div>

        <div className="form-group">
          <label>Collection Icon</label>
          <div className="icon-grid">
            {icons.map(icon => (
              <button
                key={icon.id}
                type="button"
                className={`icon-btn ${collection.icon === icon.id ? 'selected' : ''}`}
                onClick={() => setCollection(prev => ({ ...prev, icon: icon.id }))}
              >
                <i className={`bx ${icon.id}`}></i>
                <span>{icon.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate(`/collections/${id}`)}
          >
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCollectionPage;
