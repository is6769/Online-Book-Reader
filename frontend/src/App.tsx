import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Context Providers
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { MenuProvider } from './contexts/MenuContext';

// Layout Components
import Navigation from './components/Navigation';
import SideNav from './components/Navigation/SideNav';

// Public Pages
import HomePage from './components/Home/HomePage';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import ForgotPasswordPage from './components/Auth/ForgotPasswordPage';
import LibraryPage from './components/Library/LibraryPage';
import BookPage from './components/Book/BookPage';

// Protected Pages
import PrivateRoute from './components/Auth/PrivateRoute';
import ProfilePage from './components/Profile/ProfilePage';

// Collections
import CollectionsPage from './components/Collections/CollectionsPage';
import CreateCollectionPage from './components/Collections/CreateCollectionPage';
import ViewCollectionPage from './components/Collections/ViewCollectionPage';
import EditCollectionPage from './components/Collections/EditCollectionPage';
import AddBooksPage from './components/Collections/AddBooksPage';

// Reading Lists
import ReadingListsPage from './components/ReadingLists/ReadingListsPage';

// Original Works
import OriginalWorksPage from './components/OriginalWorks/OriginalWorksPage';
import CreateWorkPage from './components/OriginalWorks/CreateWorkPage';
import WorkEditorPage from './components/OriginalWorks/WorkEditorPage';

import './App.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <MenuProvider>
          <Router>
            <div className="App">
              <SideNav />
              <Navigation />
              <main className="main-content">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/library" element={<LibraryPage />} />
                  <Route path="/book/:id" element={<BookPage />} />

                  {/* Protected Profile Routes */}
                  <Route path="/profile" element={
                    <PrivateRoute>
                      <ProfilePage />
                    </PrivateRoute>
                  } />

                  {/* Protected Collection Routes */}
                  <Route path="/collections" element={
                    <PrivateRoute><CollectionsPage /></PrivateRoute>
                  } />
                  <Route path="/collections/create" element={
                    <PrivateRoute><CreateCollectionPage /></PrivateRoute>
                  } />
                  <Route path="/collections/:id" element={
                    <PrivateRoute><ViewCollectionPage /></PrivateRoute>
                  } />
                  <Route path="/collections/:id/edit" element={
                    <PrivateRoute><EditCollectionPage /></PrivateRoute>
                  } />
                  <Route path="/collections/:collectionId/add-books" element={
                    <PrivateRoute><AddBooksPage /></PrivateRoute>
                  } />

                  {/* Protected Reading List Routes */}
                  <Route path="/reading-lists" element={
                    <PrivateRoute><ReadingListsPage /></PrivateRoute>
                  } />

                  {/* Protected Original Works Routes */}
                  <Route path="/original-works" element={
                    <PrivateRoute><OriginalWorksPage /></PrivateRoute>
                  } />
                  <Route path="/original-works/create" element={
                    <PrivateRoute><CreateWorkPage /></PrivateRoute>
                  } />
                  <Route path="/original-works/editor/:id" element={
                    <PrivateRoute>
                      <WorkEditorPage />
                    </PrivateRoute>
                  } />
                </Routes>
              </main>
            </div>
          </Router>
        </MenuProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
