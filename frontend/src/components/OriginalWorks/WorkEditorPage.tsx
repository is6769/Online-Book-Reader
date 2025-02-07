import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './WorkEditorPage.css';
import { ScheduleModal } from './ScheduleModal';
import { BookDetails, Chapter } from './types';

const MOCK_BOOK = {
  id: '1',
  title: 'The Midnight Chronicles',
  cover: '/images/covers/midnight-chronicles.jpg',
  description: 'In a world where darkness holds ancient secrets, one person\'s journey will unlock the truth about humanity\'s forgotten past...',
  genre: 'Fantasy',
  status: 'draft' as const,
  stats: {
    views: 1243,
    likes: 89,
    comments: 34,
    rating: 4.5
  },
  chapters: [
    {
      id: 1,
      title: 'The Beginning of Shadows',
      content: `<h2>Chapter 1: The Beginning of Shadows</h2>
                <p>The night was unusually still when Sarah first noticed the strange lights dancing in the distance. They weren't like anything she had seen before – not streetlights, not car headlights, not even the occasional shooting star that she loved to watch from her bedroom window.</p>
                <p>"This is different," she whispered to herself, pressing her hand against the cool glass. The lights seemed to pulse with an inner life, weaving patterns that almost looked like writing...</p>`,
      status: 'published' as const,
      wordCount: 2500,
      lastModified: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      title: 'Whispers in the Dark',
      content: `<h2>Chapter 2: Whispers in the Dark</h2>
                <p>The old library stood like a sentinel at the edge of town, its Victorian architecture a stark contrast to the modern buildings surrounding it. Sarah had passed by it hundreds of times before, but today something felt different...</p>`,
      status: 'draft' as const,
      wordCount: 1800,
      lastModified: '2024-01-18T15:45:00Z'
    },
    {
      id: 3,
      title: 'The Hidden Message',
      content: '',
      status: 'draft' as const,
      wordCount: 0,
      lastModified: '2024-01-20T09:15:00Z'
    }
  ],
  metadata: {
    language: 'English',
    targetAudience: 'Young Adult',
    themes: ['Mystery', 'Coming of Age', 'Supernatural'],
    contentWarnings: ['Mild Violence', 'Supernatural Elements'],
    copyright: '© 2024 All Rights Reserved',
    status: 'In Progress'
  },
  settings: {
    enableComments: true,
    visibility: 'public',
    allowReader: true,
    monetization: 'free'
  }
};

const WorkEditorPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState<BookDetails | null>(null);
  const [activeSection, setActiveSection] = useState<'details' | 'chapters' | 'editor' | 'settings'>('details');
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [chapterContent, setChapterContent] = useState('');
  const [chapterTitle, setChapterTitle] = useState('');

  const sections = [
    { id: 'details', label: 'Book Details', icon: 'bx-info-circle' },
    { id: 'chapters', label: 'Chapters List', icon: 'bx-list-ul' },
    { id: 'editor', label: 'Write', icon: 'bx-edit-alt' },
    { id: 'settings', label: 'Settings', icon: 'bx-cog' }
  ];

  useEffect(() => {
    setBook(MOCK_BOOK);
  }, [id]);

  useEffect(() => {
    if (activeChapter) {
      setChapterTitle(activeChapter.title);
      setChapterContent(activeChapter.content);
    }
  }, [activeChapter]);

  const handleRemoveWarning = (warning: string) => {
    setBook(prev => prev ? {
      ...prev,
      metadata: {
        ...prev.metadata!,
        contentWarnings: prev.metadata!.contentWarnings.filter(w => w !== warning)
      }
    } : null);
  };

  const handleAddWarning = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      setBook(prev => prev ? {
        ...prev,
        metadata: {
          ...prev.metadata!,
          contentWarnings: [...prev.metadata!.contentWarnings, e.currentTarget.value]
        }
      } : null);
      e.currentTarget.value = '';
    }
  };

  const handleSave = () => {
    // Save book details logic here
  };

  const handleContentChange = (content: string) => {
    setChapterContent(content);
    // Calculate word count
    const wordCount = content.replace(/<[^>]*>/g, '')
      .trim()
      .split(/\s+/)
      .filter(word => word.length > 0).length;

    // Update chapter in book
    if (activeChapter) {
      setBook(prev => prev ? {
        ...prev,
        chapters: prev.chapters.map(ch =>
          ch.id === activeChapter.id
            ? {
                ...ch,
                content,
                wordCount,
                lastModified: new Date().toISOString()
              }
            : ch
        )
      } : null);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setChapterTitle(newTitle);
    
    if (activeChapter) {
      setBook(prev => prev ? {
        ...prev,
        chapters: prev.chapters.map(ch =>
          ch.id === activeChapter.id
            ? { ...ch, title: newTitle }
            : ch
        )
      } : null);
    }
  };

  const renderDetails = () => (
    <div className="details-section">
      <div className="book-cover-section">
        <div className="cover-preview">
          <img src={book?.cover || '/default-cover.jpg'} alt={book?.title} />
          <button className="change-cover-btn">
            <i className='bx bx-image-add'></i>
            Change Cover
          </button>
        </div>
      </div>

      <div className="book-form">
        <div className="form-group">
          <label>Title</label>
          <input 
            type="text"
            value={book?.title}
            onChange={(e) => setBook(prev => prev ? {...prev, title: e.target.value} : null)}
            placeholder="Enter book title"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea 
            value={book?.description}
            onChange={(e) => setBook(prev => prev ? {...prev, description: e.target.value} : null)}
            placeholder="Enter book description"
            rows={5}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Genre</label>
            <select 
              value={book?.genre}
              onChange={(e) => setBook(prev => prev ? {...prev, genre: e.target.value} : null)}
            >
              <option value="">Select Genre</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Science Fiction">Science Fiction</option>
              <option value="Mystery">Mystery</option>
              <option value="Romance">Romance</option>
              <option value="Thriller">Thriller</option>
            </select>
          </div>

          <div className="form-group">
            <label>Target Audience</label>
            <select 
              value={book?.metadata?.targetAudience}
              onChange={(e) => setBook(prev => prev ? {
                ...prev, 
                metadata: {...prev.metadata!, targetAudience: e.target.value}
              } : null)}
            >
              <option value="">Select Target Audience</option>
              <option value="All Ages">All Ages</option>
              <option value="Young Adult">Young Adult</option>
              <option value="Adult">Adult</option>
              <option value="Mature">Mature</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Content Warnings</label>
          <div className="tags-input">
            {book?.metadata?.contentWarnings.map(warning => (
              <span key={warning} className="tag">
                {warning}
                <button onClick={() => handleRemoveWarning(warning)}>&times;</button>
              </span>
            ))}
            <input 
              type="text" 
              placeholder="Add a warning..."
              onKeyDown={handleAddWarning}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Copyright Notice</label>
          <input 
            type="text"
            value={book?.metadata?.copyright}
            onChange={(e) => setBook(prev => prev ? {
              ...prev,
              metadata: {...prev.metadata!, copyright: e.target.value}
            } : null)}
            placeholder="© 2024 Your Name"
          />
        </div>

        <div className="form-actions">
          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  const renderChaptersList = () => (
    <div className="chapters-section">
      <div className="chapters-header">
        <h2>Chapters</h2>
        <div className="chapters-actions">
          <button className="new-chapter-btn" onClick={handleAddChapter}>
            <i className='bx bx-plus'></i>
            New Chapter
          </button>
        </div>
      </div>

      <div className="chapters-grid">
        {book?.chapters.map(chapter => (
          <div key={chapter.id} className="chapter-card">
            <div className="chapter-card-header">
              <h3>{chapter.title}</h3>
              <span className={`status-badge ${chapter.status}`}>
                {chapter.status}
              </span>
            </div>
            
            <div className="chapter-stats">
              <span>
                <i className='bx bx-book-open'></i>
                {chapter.wordCount} words
              </span>
              <span>
                <i className='bx bx-calendar'></i>
                {new Date(chapter.lastModified!).toLocaleDateString()}
              </span>
              {chapter.isScheduled && (
                <span className="scheduled-badge">
                  <i className='bx bx-time'></i>
                  Scheduled for {new Date(chapter.scheduledFor!).toLocaleDateString()}
                  <button 
                    className="unschedule-btn"
                    onClick={() => handleUnscheduleChapter(chapter.id)}
                    title="Unschedule chapter"
                  >
                    <i className='bx bx-x'></i>
                  </button>
                </span>
              )}
            </div>

            <div className="chapter-preview">
              {chapter.content ? (
                <p>{chapter.content.replace(/<[^>]*>/g, '').slice(0, 150)}...</p>
              ) : (
                <p className="empty-content">No content yet</p>
              )}
            </div>

            <div className="chapter-actions">
              <button onClick={() => handleEditChapter(chapter.id)}>
                <i className='bx bx-edit'></i>
                Edit
              </button>
              <button onClick={() => handlePreviewChapter(chapter.id)}>
                <i className='bx bx-show'></i>
                Preview
              </button>
              <button onClick={() => handleScheduleChapter(chapter.id)}>
                <i className='bx bx-calendar'></i>
                Schedule
              </button>
              <button 
                className="delete-btn"
                onClick={() => handleDeleteChapter(chapter.id)}
              >
                <i className='bx bx-trash'></i>
                Delete
              </button>
            </div>
          </div>
        ))}
        
        {showScheduleModal && (
          <ScheduleModal
            chapter={selectedChapter}
            onClose={() => setShowScheduleModal(false)}
            onSchedule={handleSaveSchedule}
          />
        )}
      </div>
    </div>
  );

  const handleEditChapter = (chapterId: number) => {
    const chapter = book?.chapters.find(ch => ch.id === chapterId);
    if (chapter) {
      setActiveChapter(chapter);
      setActiveSection('editor');
    }
  };

  const handlePreviewChapter = (chapterId: number) => {
    // Implement preview functionality
    console.log('Preview chapter:', chapterId);
  };

  const handleDeleteChapter = (chapterId: number) => {
    if (window.confirm('Are you sure you want to delete this chapter?')) {
      setBook(prev => prev ? {
        ...prev,
        chapters: prev.chapters.filter(ch => ch.id !== chapterId)
      } : null);
    }
  };

  const handleAddChapter = () => {
    setBook(prev => {
      if (!prev) return null;
      const newChapterId = Math.max(...prev.chapters.map(ch => ch.id), 0) + 1;
      return {
        ...prev,
        chapters: [...prev.chapters, {
          id: newChapterId,
          title: `Chapter ${newChapterId}`,
          content: '',
          wordCount: 0,
          status: 'draft' as const,
          lastModified: new Date().toISOString()
        }]
      };
    });
  };

  const handleScheduleChapter = (chapterId: number) => {
    const chapter = book?.chapters.find(ch => ch.id === chapterId);
    if (chapter) {
      setSelectedChapter(chapter);
      setShowScheduleModal(true);
    }
  };

  const handleSaveSchedule = (chapterId: number, scheduledDate: string) => {
    setBook(prev => {
      if (!prev) return null;
      return {
        ...prev,
        chapters: prev.chapters.map(ch => 
          ch.id === chapterId 
            ? { 
                ...ch, 
                scheduledFor: scheduledDate, 
                isScheduled: true,
                status: 'scheduled' as const
              }
            : ch
        )
      };
    });
    setShowScheduleModal(false);
  };

  const handleUnscheduleChapter = (chapterId: number) => {
    setBook(prev => {
      if (!prev) return null;
      return {
        ...prev,
        chapters: prev.chapters.map(ch => 
          ch.id === chapterId 
            ? { 
                ...ch, 
                scheduledFor: undefined,
                isScheduled: false,
                status: 'draft' as const
              }
            : ch
        )
      };
    });
  };

  const renderEditor = () => (
    <div className="writer-section">
      <div className="writer-header">
        <div className="writer-header-top">
          <input
            type="text"
            className="chapter-title-input"
            value={chapterTitle}
            onChange={handleTitleChange}
            placeholder="Chapter Title"
          />
        </div>
        <div className="writer-info">
          <span className="chapter-number">Chapter {activeChapter?.id}</span>
          <span className="word-count">
            <i className='bx bx-book-open'></i>
            {activeChapter?.wordCount || 0} words
          </span>
        </div>
      </div>
      
      <div className="writer-content">
        <ReactQuill
          theme="snow"
          value={chapterContent}
          onChange={handleContentChange}
          modules={{
            toolbar: [
              ['bold', 'italic', 'underline'],
              [{ 'header': [2, 3, false] }],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              ['blockquote', 'link'],
              ['clean']
            ]
          }}
          formats={[
            'bold', 'italic', 'underline',
            'header',
            'list', 'bullet',
            'blockquote', 'link'
          ]}
        />
      </div>

      <div className="writer-footer">
        <div className="auto-save-status">
          <i className='bx bx-time'></i>
          Last saved: {activeChapter?.lastModified ? 
            new Date(activeChapter.lastModified).toLocaleTimeString() : 'Never'}
        </div>
        <div className="writer-actions">
          <button className="preview-btn">
            <i className='bx bx-show'></i>
            Preview
          </button>
          <button className="save-btn">
            <i className='bx bx-save'></i>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="page-container">
      <header className="page-header">
        <div className="header-content">
          <h1>{book?.title || 'Untitled Work'}</h1>
          <div className="header-actions">
            <button className="secondary-btn">
              <i className='bx bx-show'></i>
              Preview
            </button>
            <button className="primary-btn">
              <i className='bx bx-upload'></i>
              Publish
            </button>
          </div>
        </div>
        <nav className="section-nav">
          {sections.map(section => (
            <button
              key={section.id}
              className={`nav-btn ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id as any)}
            >
              <i className={`bx ${section.icon}`}></i>
              {section.label}
            </button>
          ))}
        </nav>
      </header>

      <div className="page-content">
        <div className="content-layout">
          {activeSection === 'details' && renderDetails()}
          {activeSection === 'chapters' && renderChaptersList()}
          {activeSection === 'editor' && renderEditor()}
          {activeSection === 'settings' && (
            <div className="settings-section">
              {/* Book settings */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default WorkEditorPage;

