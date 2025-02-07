import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OriginalWorksPage.css';

const OriginalWorksPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [workToDelete, setWorkToDelete] = useState<number | null>(null);

  // Mock data for original works
  const works = [
    {
      id: 1,
      title: "Digital Dreams",
      cover: "/book-covers/1.jpg",
      status: "published",
      chapters: 24,
      reads: 560,
      rating: 4.8,
      lastUpdated: "2024-01-15",
      genre: "Science Fiction",
      description: "A journey into the digital realm where reality blends with virtual worlds."
    },
    {
      id: 2,
      title: "The AI Revolution",
      cover: "/book-covers/2.jpg",
      status: "in_progress",
      chapters: 18,
      reads: 420,
      rating: 4.6,
      lastUpdated: "2024-01-10",
      genre: "Science Fiction",
      description: "Exploring the impact of artificial intelligence on human society."
    },
    {
      id: 3,
      title: "Future Perfect",
      cover: "/book-covers/3.jpg",
      status: "draft",
      chapters: 12,
      reads: 0,
      rating: 0,
      lastUpdated: "2024-01-05",
      genre: "Science Fiction",
      description: "A glimpse into a utopian future that might not be as perfect as it seems."
    }
  ];

  const handleDeleteClick = (workId: number) => {
    setWorkToDelete(workId);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    // Add API call to delete work
    console.log('Deleting work:', workToDelete);
    setShowDeleteDialog(false);
    setWorkToDelete(null);
  };

  const filteredWorks = works.filter(work => 
    work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    work.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'published': return 'status-published';
      case 'in_progress': return 'status-in-progress';
      case 'draft': return 'status-draft';
      default: return '';
    }
  };

  const getActionUrl = (workId: number) => {
    return `/original-works/editor/${workId}`; // Updated URL format
  };

  return (
    <div className="original-works-page">
      <header className="page-header">
        <div className="header-content">
          <div>
            <h1>Original Works</h1>
            <p className="header-description">Create and manage your written works</p>
          </div>
          <div className="header-actions">
            <div className="search-wrapper">
              <i className='bx bx-search'></i>
              <input
                type="text"
                placeholder="Search your works..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              className="create-work-btn"
              onClick={() => navigate('/original-works/create')}
            >
              <i className='bx bx-plus'></i>
              Create New Work
            </button>
          </div>
        </div>
      </header>

      <div className="works-grid">
        {filteredWorks.map(work => (
          <div key={work.id} className="work-card">
            <div className="work-cover">
              <img src={work.cover} alt={work.title} />
              <span className={`status-badge ${getStatusBadgeClass(work.status)}`}>
                {work.status.replace('_', ' ')}
              </span>
            </div>
            
            <div className="work-content">
              <h3>{work.title}</h3>
              <p className="work-description">{work.description}</p>
              
              <div className="work-stats">
                <span><i className='bx bx-book'></i>{work.chapters} chapters</span>
                <span><i className='bx bx-reader'></i>{work.reads} reads</span>
                {work.rating > 0 && (
                  <span><i className='bx bxs-star'></i>{work.rating}</span>
                )}
              </div>
              
              <div className="work-meta">
                <span className="genre">{work.genre}</span>
                <span className="update-date">Updated {work.lastUpdated}</span>
              </div>

              <div className="work-actions">
                <button 
                  className="edit-btn" 
                  onClick={() => navigate(`/original-works/editor/${work.id}`)}
                  title="Edit and manage work"
                >
                  <i className='bx bx-edit'></i>
                  Open Editor
                </button>
                <button className="delete-btn" onClick={() => handleDeleteClick(work.id)}>
                  <i className='bx bx-trash'></i>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showDeleteDialog && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Delete Work</h3>
            <p>Are you sure you want to delete this work? This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowDeleteDialog(false)}>
                Cancel
              </button>
              <button className="confirm-delete-btn" onClick={handleConfirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OriginalWorksPage;
