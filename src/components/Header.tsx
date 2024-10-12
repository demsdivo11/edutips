import React, { useState } from 'react';
import { Book, Menu, X } from 'lucide-react';

const Header = ({ setCurrentPage, isAdmin, setIsAdmin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg text-white py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Book className="mr-2" size={24} />
          <span className="text-xl font-bold">EduTips SMP</span>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block absolute md:relative top-full left-0 w-full md:w-auto bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg md:bg-transparent z-50`}>
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 p-4 md:p-0">
            <li><a href="#" onClick={() => handleNavClick('home')} className="block md:inline-block hover:text-pink-200">Beranda</a></li>
            <li><a href="#" onClick={() => handleNavClick('about')} className="block md:inline-block hover:text-pink-200">Tentang</a></li>
            <li><a href="#" onClick={() => handleNavClick('contact')} className="block md:inline-block hover:text-pink-200">Kontak</a></li>
            {isAdmin && (
              <li><a href="#" onClick={() => handleNavClick('admin')} className="block md:inline-block hover:text-pink-200">Admin</a></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;