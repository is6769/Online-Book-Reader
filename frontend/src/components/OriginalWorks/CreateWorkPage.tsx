import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateWorkPage.css';

interface Tag {
  id: number;
  name: string;
}

// Helper function to generate mock tags
const generateMockTags = (): Tag[] => {
  const categories = [
    'Fantasy', 'Science', 'Romance', 'Mystery', 'Horror', 'Adventure', 'Drama',
    'Historical', 'Comedy', 'Thriller', 'Western', 'Crime', 'Family', 'Political',
    'Military', 'Educational', 'Supernatural', 'Psychological', 'Medical', 'Legal'
  ];

  const modifiers = [
    'Modern', 'Classic', 'Dark', 'Light', 'Epic', 'Urban', 'Rural', 'Contemporary',
    'Ancient', 'Future', 'Alternative', 'Traditional', 'Experimental', 'Young',
    'Adult', 'Children', 'Teen', 'Mature', 'Global', 'Local'
  ];

  const themes = [
    'Love', 'War', 'Peace', 'Death', 'Life', 'Family', 'Friendship', 'Betrayal',
    'Revenge', 'Justice', 'Freedom', 'Power', 'Magic', 'Technology', 'Nature',
    'Society', 'Identity', 'Growth', 'Conflict', 'Resolution', 'Mystery', 'Discovery',
    'Loss', 'Hope', 'Fear'
  ];

  const tags = new Set<Tag>();
  let id = 1;

  // Generate combinations
  while (tags.size < 1000) {
    // Random combination type
    const type = Math.floor(Math.random() * 4);
    
    let tagName = '';
    switch (type) {
      case 0:
        // Category + Modifier
        tagName = `${modifiers[Math.floor(Math.random() * modifiers.length)]} ${
          categories[Math.floor(Math.random() * categories.length)]}`;
        break;
      case 1:
        // Theme + Category
        tagName = `${themes[Math.floor(Math.random() * themes.length)]} ${
          categories[Math.floor(Math.random() * categories.length)]}`;
        break;
      case 2:
        // Modifier + Theme
        tagName = `${modifiers[Math.floor(Math.random() * modifiers.length)]} ${
          themes[Math.floor(Math.random() * themes.length)]}`;
        break;
      case 3:
        // Single word
        const allWords = [...categories, ...modifiers, ...themes];
        tagName = allWords[Math.floor(Math.random() * allWords.length)];
        break;
    }

    if (![...tags].some(tag => tag.name === tagName)) {
      tags.add({ id: id++, name: tagName });
    }
  }

  return Array.from(tags);
};

// Generate 1000 unique tags
const AVAILABLE_TAGS: Tag[] = generateMockTags();

// Add visibility options
const VISIBILITY_OPTIONS = [
  { value: 'public', label: 'Public - Anyone can read', description: 'Your work will be visible to all users' },
  { value: 'private', label: 'Private - Only you', description: 'Only you can see and edit this work' },
  { value: 'unlisted', label: 'Unlisted - Anyone with link', description: 'Not listed publicly, but accessible via direct link' },
  { value: 'followers', label: 'Followers Only', description: 'Only your followers can read this work' }
] as const;

const MAX_TAGS = 12;

// Mock user data (replace with actual auth context)
const currentUser = {
  id: 1,
  name: 'John Doe',
  username: 'johndoe'
};

// Mock data for user search (replace with API call)
const searchUsers = async (query: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  const mockUsers = [
    { id: 2, name: 'Jane Smith', username: 'janesmith' },
    { id: 3, name: 'Bob Wilson', username: 'bobwilson' },
    { id: 4, name: 'Alice Brown', username: 'alicebrown' }
  ];
  return mockUsers.filter(user => 
    user.name.toLowerCase().includes(query.toLowerCase()) ||
    user.username.toLowerCase().includes(query.toLowerCase())
  );
};

interface Author {
  id: number;
  name: string;
  username: string;
}

interface FormData {
  title: string;
  genre: string;
  description: string;
  tags: number[];
  visibility: typeof VISIBILITY_OPTIONS[number]['value'];
  mainAuthor: Author;
  coAuthors: Author[];
}

const CreateWorkPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    genre: '',
    description: '',
    tags: [],
    visibility: 'private',
    mainAuthor: currentUser, // This will now be fixed as currentUser
    coAuthors: []
  });

  // File states
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>('');

  // Search states
  const [tagSearch, setTagSearch] = useState('');
  const [coAuthorSearch, setCoAuthorSearch] = useState('');

  // Results states
  const [searchResults, setSearchResults] = useState<Author[]>([]);

  // Loading states
  const [isSearching, setIsSearching] = useState(false);

  // Toggle state
  const [isAdvancedAuthorMode, setIsAdvancedAuthorMode] = useState(false);

  // Search co-authors effect
  useEffect(() => {
    const searchCoAuthors = async () => {
      if (!coAuthorSearch) {
        setSearchResults([]);
        return;
      }
      setIsSearching(true);
      try {
        const results = await searchUsers(coAuthorSearch);
        setSearchResults(results.filter(user => 
          user.id !== currentUser.id && 
          !formData.coAuthors.some(coAuthor => coAuthor.id === user.id)
        ));
      } catch (error) {
        console.error('Error searching users:', error);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimeout = setTimeout(searchCoAuthors, 300);
    return () => clearTimeout(debounceTimeout);
  }, [coAuthorSearch, formData.coAuthors]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddCoAuthor = (user: Author) => {
    setFormData(prev => ({
      ...prev,
      coAuthors: [...prev.coAuthors, user]
    }));
    setCoAuthorSearch('');
  };

  const handleRemoveCoAuthor = (userId: number) => {
    setFormData(prev => ({
      ...prev,
      coAuthors: prev.coAuthors.filter(author => author.id !== userId)
    }));
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleTagToggle = (tagId: number) => {
    setFormData(prev => {
      if (prev.tags.includes(tagId)) {
        return {
          ...prev,
          tags: prev.tags.filter(id => id !== tagId)
        };
      }
      if (prev.tags.length >= MAX_TAGS) {
        return prev; // Don't add more tags if limit reached
      }
      return {
        ...prev,
        tags: [...prev.tags, tagId]
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: API call to create work
      console.log('Form submitted:', { ...formData, coverFile });
      navigate('/original-works');
    } catch (error) {
      console.error('Error creating work:', error);
      // TODO: Show error message to user
    }
  };

  const renderAuthorSearchResults = (
    results: Author[],
    isLoading: boolean,
    onSelect: (user: Author) => void
  ) => (
    <div className="search-dropdown">
      {isLoading ? (
        <div className="search-message">Searching...</div>
      ) : results.length > 0 ? (
        results.map(user => (
          <div
            key={user.id}
            className="search-result"
            onClick={() => onSelect(user)}
          >
            <i className='bx bxs-user-circle'></i>
            <div className="user-info">
              <span className="name">{user.name}</span>
              <span className="username">@{user.username}</span>
            </div>
          </div>
        ))
      ) : (
        <div className="search-message">No users found</div>
      )}
    </div>
  );

  const filteredTags = AVAILABLE_TAGS.filter((tag: Tag) =>
    tag.name.toLowerCase().includes(tagSearch.toLowerCase())
  );

  return (
    <div className="create-work-page">
      <header className="page-header">
        <h1>Create New Work</h1>
        <p>Start your new writing journey</p>
      </header>

      <form onSubmit={handleSubmit} className="create-work-form">
        <div className="form-section">
          <h2 className="section-title">
            <i className='bx bx-info-circle'></i>
            Basic Information
          </h2>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="Enter your work's title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <select
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a genre</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Science Fiction">Science Fiction</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Mystery">Mystery</option>
              <option value="Romance">Romance</option>
              <option value="Horror">Horror</option>
              <option value="Poetry">Poetry</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              placeholder="Write a compelling description of your work"
              rows={5}
            />
          </div>

          <h2 className="section-title">
            <i className='bx bx-lock-alt'></i>
            Privacy Settings
          </h2>
          <div className="form-group">
            <label>Visibility</label>
            <div className="visibility-options">
              {VISIBILITY_OPTIONS.map(option => (
                <div 
                  key={option.value}
                  className={`visibility-option ${formData.visibility === option.value ? 'selected' : ''}`}
                  onClick={() => handleInputChange({ 
                    target: { name: 'visibility', value: option.value }
                  } as any)}
                >
                  <div className="visibility-header">
                    <i className={`bx bx-${option.value === 'public' ? 'globe' : 
                                         option.value === 'private' ? 'lock' :
                                         option.value === 'unlisted' ? 'link' : 'group'}`}></i>
                    <span>{option.label}</span>
                  </div>
                  <p>{option.description}</p>
                </div>
              ))}
            </div>
          </div>

          <h2 className="section-title">
            <i className='bx bx-purchase-tag'></i>
            Tags and Categories
          </h2>
          <div className="form-group">
            <label>Tags ({formData.tags.length}/{MAX_TAGS})</label>
            <div className="tags-search">
              <i className='bx bx-search'></i>
              <input
                type="text"
                placeholder="Search from available tags..."
                value={tagSearch}
                onChange={(e) => setTagSearch(e.target.value)}
              />
            </div>
            <div className="tags-wrapper">
              <div className="tags-container">
                {filteredTags.map(tag => (
                  <button
                    key={tag.id}
                    type="button"
                    className={`tag-button ${formData.tags.includes(tag.id) ? 'selected' : ''}`}
                    onClick={() => handleTagToggle(tag.id)}
                    title={tag.name}
                    disabled={!formData.tags.includes(tag.id) && formData.tags.length >= MAX_TAGS}
                  >
                    {tag.name}
                  </button>
                ))}
                {filteredTags.length === 0 && (
                  <p className="no-tags-message">No matching tags found</p>
                )}
              </div>
            </div>
            <small className="tags-hint">
              {formData.tags.length >= MAX_TAGS ? 
                `Maximum ${MAX_TAGS} tags limit reached` : 
                `Selected tags: ${formData.tags.length}/${MAX_TAGS}`}
            </small>
          </div>

          <h2 className="section-title">
            <i className='bx bx-image'></i>
            Cover Image
          </h2>
          <div className="form-group">
            <label htmlFor="cover">Cover Image</label>
            <div className="cover-upload-area">
              <input
                type="file"
                id="cover"
                accept="image/*"
                onChange={handleCoverChange}
                className="cover-input"
              />
              {coverPreview ? (
                <img src={coverPreview} alt="Cover preview" className="cover-preview" />
              ) : (
                <div className="cover-placeholder">
                  <i className='bx bx-image-add'></i>
                  <span>Click to upload cover image</span>
                </div>
              )}
            </div>
          </div>

          <h2 className="section-title">
            <i className='bx bx-user'></i>
            Authors
          </h2>
          <div className="form-group authors-group">
            <div className="authors-toggle">
              <button 
                type="button"
                className={`toggle-button ${isAdvancedAuthorMode ? 'active' : ''}`}
                onClick={() => setIsAdvancedAuthorMode(!isAdvancedAuthorMode)}
              >
                <i className='bx bx-user-plus'></i>
                <span>Advanced Author Management</span>
              </button>
            </div>

            <div className="authors-content">
              <div className="main-author">
                <div className="author-info primary">
                  <i className='bx bxs-user-circle'></i>
                  <div className="author-details">
                    <span className="name">{currentUser.name}</span>
                    <span className="username">@{currentUser.username}</span>
                  </div>
                </div>
              </div>

              {isAdvancedAuthorMode && (
                <div className="co-authors">
                  <div className="co-authors-search">
                    <input
                      type="text"
                      placeholder="Add co-authors..."
                      value={coAuthorSearch}
                      onChange={(e) => setCoAuthorSearch(e.target.value)}
                    />
                    {coAuthorSearch && renderAuthorSearchResults(
                      searchResults,
                      isSearching,
                      handleAddCoAuthor
                    )}
                  </div>
                  
                  <div className="co-authors-list">
                    {formData.coAuthors.map(author => (
                      <div key={author.id} className="co-author-item">
                        <i className='bx bxs-user-circle'></i>
                        <div className="author-details">
                          <span className="name">{author.name}</span>
                          <span className="username">@{author.username}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveCoAuthor(author.id)}
                          className="remove-btn"
                        >
                          <i className='bx bx-x'></i>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => navigate('/original-works')}
          >
            Cancel
          </button>
          <button type="submit" className="create-btn">
            Create Work
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateWorkPage;
