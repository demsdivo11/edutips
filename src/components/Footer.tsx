import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white bg-opacity-10 backdrop-blur-lg text-white py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="flex items-center gap-2 text-sm md:text-base">
            Dibuat dengan <Heart size={18} className="text-red-400 fill-red-400 animate-pulse" /> untuk pendidikan Indonesia
          </p>
          <p className="text-sm text-white text-opacity-80">
            &copy; {new Date().getFullYear()} EduTips SMP. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;