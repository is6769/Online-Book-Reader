import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateCollectionPage.css';

const CreateCollectionPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: 'bx-collection'
  });

  const icons = [
    { id: 'bx-book-heart', label: 'Favorite Books' },
    { id: 'bx-code-alt', label: 'Programming' },
    { id: 'bx-bookmark', label: 'Bookmarked' },
    { id: 'bx-bookmarks', label: 'Collections' },
    { id: 'bx-glasses', label: 'Study' },
    { id: 'bx-library', label: 'Library' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    navigate('/collections');
  };

  return (
    <div className="create-collection-page">
      <header className="page-header">
        <div className="header-content">
          <div className="header-left">
            <button 
              className="back-btn"
              onClick={() => navigate('/collections')}
            >
              <i className='bx bx-arrow-left'></i>
              Back to Collections
            </button>
            <div>
              <h1>Create New Collection</h1>
              <p className="header-description">
                Create a new collection to organize your books
              </p>
            </div>
          </div>
        </div>
      </header>

      <form className="collection-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Collection Name</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="Enter collection name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Describe your collection"
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
                className={`icon-btn ${formData.icon === icon.id ? 'selected' : ''}`}
                onClick={() => setFormData({...formData, icon: icon.id})}
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
            onClick={() => navigate('/collections')}
          >
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Create Collection
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCollectionPage;
