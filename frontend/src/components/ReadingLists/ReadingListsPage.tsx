import React, { useState } from 'react';
import './ReadingListsPage.css';

const mockLists = [
  {
    id: 1,
    name: "December Reading Challenge",
    description: "Books to complete before year end",
    deadline: "2023-12-31",
    count: 5,
    progress: 2,
    priority: "high",
    status: "in-progress"
  },
  {
    id: 2,
    name: "Book Club - Q1 2024",
    description: "Selected books for next quarter's book club",
    deadline: "2024-03-31",
    count: 3,
    progress: 0,
    priority: "medium",
    status: "planned"
  },
  {
    id: 3,
    name: "Learn React Development",
    description: "Essential books for React mastery",
    deadline: "2024-06-30",
    count: 4,
    progress: 1,
    priority: "low",
    status: "in-progress"
  }
];

const ReadingListsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="reading-lists-page">
      <header className="page-header">
        <div className="header-content">
          <div>
            <h1>Reading Lists</h1>
            <p className="header-description">
              Plan your reading journey and track your progress
            </p>
          </div>
          <div className="header-actions">
            <div className="search-wrapper">
              <i className='bx bx-search'></i>
              <input
                type="text"
                placeholder="Search reading lists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="create-list-btn" onClick={() => setShowCreateModal(true)}>
              <i className='bx bx-plus'></i>
              Create List
            </button>
          </div>
        </div>
      </header>

      <div className="lists-overview">
        <div className="status-cards">
          <div className="status-card">
            <i className='bx bx-time'></i>
            <h3>In Progress</h3>
            <span>2 Lists</span>
          </div>
          <div className="status-card">
            <i className='bx bx-calendar'></i>
            <h3>Planned</h3>
            <span>1 List</span>
          </div>
          <div className="status-card">
            <i className='bx bx-check-circle'></i>
            <h3>Completed</h3>
            <span>3 Lists</span>
          </div>
        </div>
      </div>

      <div className="lists-grid">
        {mockLists.map(list => (
          <div key={list.id} className={`list-card ${list.status}`}>
            <div className="list-header">
              <span className={`priority-badge ${list.priority}`}>
                {list.priority} priority
              </span>
              <div className="list-actions">
                <button className="action-btn"><i className='bx bx-edit-alt'></i></button>
                <button className="action-btn"><i className='bx bx-trash'></i></button>
              </div>
            </div>
            
            <div className="list-content">
              <h3>{list.name}</h3>
              <p className="list-description">{list.description}</p>
              
              <div className="list-meta">
                <span className="deadline">
                  <i className='bx bx-calendar'></i>
                  Due by {list.deadline}
                </span>
                <div className="list-progress">
                  <div 
                    className="progress-bar"
                    style={{ width: `${(list.progress / list.count) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="list-footer">
                <button className="start-reading-btn">
                  {list.progress === 0 ? 'Start Reading' : 'Continue Reading'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadingListsPage;
