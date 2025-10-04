import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { supabase, EdutipsContent } from '../lib/supabase';

const ContentList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [content, setContent] = useState<EdutipsContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('edutips_content')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContent(data || []);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredContent = content.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(content.map(item => item.category))];

  if (loading) {
    return (
      <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-4 md:p-6">
        <div className="text-center text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-4 md:p-6">
      <h2 className="text-2xl font-bold text-white mb-4">Konten EduTips SMP</h2>

      <div className="mb-4 flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
        <div className="relative flex-grow w-full md:w-auto">
          <input
            type="text"
            placeholder="Cari konten..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-full bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <Search className="absolute right-3 top-2.5 text-gray-300" size={20} />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="w-full md:w-auto px-4 py-2 rounded-full bg-white bg-opacity-20 text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="all">Semua Kategori</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {filteredContent.length === 0 ? (
          <div className="text-center text-white py-12 bg-white bg-opacity-10 rounded-lg">
            <p className="text-xl font-semibold mb-2">Tidak ada konten yang ditemukan</p>
            <p className="text-white text-opacity-70">Coba ubah filter pencarian Anda</p>
          </div>
        ) : (
          filteredContent.map((item, index) => (
            <div
              key={item.id}
              className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-5 hover:bg-opacity-20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-3">
                <h3 className="text-2xl font-bold text-white leading-tight">{item.title}</h3>
                <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-md whitespace-nowrap self-start">
                  {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                </span>
              </div>
              <p className="text-white text-opacity-95 whitespace-pre-wrap leading-relaxed mb-3">
                {item.content}
              </p>
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="mt-4 rounded-lg max-w-full h-auto shadow-lg"
                  loading="lazy"
                />
              )}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-white border-opacity-20">
                <p className="text-white text-opacity-70 text-sm flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(item.created_at).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContentList;