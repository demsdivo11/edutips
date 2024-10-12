import React, { useState } from 'react';
import { Book } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import ContentList from './components/ContentList';
import About from './components/About';
import Contact from './components/Contact';
import AdminPage from './components/AdminPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);

  const renderContent = () => {
    switch (currentPage) {
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'admin':
        return isAdmin ? <AdminPage /> : <div>Access Denied</div>;
      default:
        return <ContentList />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 text-white">
      <Header setCurrentPage={setCurrentPage} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      <main className="flex-grow container mx-auto px-4 py-8 overflow-y-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Tips dan Trik Edu SMP</h1>
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;