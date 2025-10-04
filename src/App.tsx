import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ContentList from './components/ContentList';
import About from './components/About';
import Contact from './components/Contact';
import AdminPage from './components/AdminPage';
import AdminLogin from './components/AdminLogin';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminId, setAdminId] = useState('');

  useEffect(() => {
    const storedAdminId = localStorage.getItem('admin_id');
    if (storedAdminId) {
      setIsAdmin(true);
      setAdminId(storedAdminId);
    }
  }, []);

  const handleLogout = () => {
    setIsAdmin(false);
    setAdminId('');
    localStorage.removeItem('admin_id');
    localStorage.removeItem('admin_username');
    setCurrentPage('home');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'admin':
        return isAdmin ? (
          <AdminPage adminId={adminId} onLogout={handleLogout} />
        ) : (
          <AdminLogin setIsAdmin={setIsAdmin} setAdminId={setAdminId} />
        );
      default:
        return <ContentList />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-500 text-white">
      <Header setCurrentPage={setCurrentPage} isAdmin={isAdmin} />
      <main className="flex-grow container mx-auto px-4 py-8 overflow-y-auto">
        {currentPage !== 'admin' && (
          <h1 className="text-4xl font-bold text-center mb-8">Tips dan Trik Edu SMP</h1>
        )}
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;