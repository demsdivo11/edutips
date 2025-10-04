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
          <div className="text-center text-white py-8">
            Tidak ada konten yang ditemukan
          </div>
        ) : (
          filteredContent.map((item) => (
            <div key={item.id} className="bg-white bg-opacity-10 rounded-lg p-4 hover:bg-opacity-20 transition-all">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <span className="bg-cyan-500 text-white px-3 py-1 rounded-full text-sm">
                  {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                </span>
              </div>
              <p className="text-white text-opacity-90 whitespace-pre-wrap">{item.content}</p>
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="mt-3 rounded-lg max-w-full h-auto"
                />
              )}
              <p className="text-white text-opacity-60 text-sm mt-2">
                {new Date(item.created_at).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContentList;