import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios';

const ContentList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterSubject, setFilterSubject] = useState('all');
  const [content, setContent] = useState([]);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/content');
      setContent(response.data);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const filteredContent = content.filter((item) => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesSubject = filterSubject === 'all' || item.subject === filterSubject;
    return matchesSearch && matchesType && matchesSubject;
  });

  const subjects = [...new Set(content.map(item => item.subject))];

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
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="w-full md:w-auto px-4 py-2 rounded-full bg-white bg-opacity-20 text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="all">Semua Tipe</option>
          <option value="tip">Tips</option>
          <option value="question">Soal</option>
          <option value="trick">Trik</option>
        </select>
        <select
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
          className="w-full md:w-auto px-4 py-2 rounded-full bg-white bg-opacity-20 text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="all">Semua Mata Pelajaran</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-white responsive-table">
          <thead>
            <tr className="bg-indigo-600 bg-opacity-50">
              <th className="px-4 py-2 text-left">Judul</th>
              <th className="px-4 py-2 text-left">Tipe</th>
              <th className="px-4 py-2 text-left">Mata Pelajaran</th>
              <th className="px-4 py-2 text-left">Konten</th>
            </tr>
          </thead>
          <tbody>
            {filteredContent.map((item) => (
              <tr key={item.id} className="border-b border-indigo-200 border-opacity-25 hover:bg-indigo-300 hover:bg-opacity-10">
                <td className="px-4 py-2" data-label="Judul">{item.title}</td>
                <td className="px-4 py-2" data-label="Tipe">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                    item.type === 'tip' ? 'bg-green-500' :
                    item.type === 'question' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`}>
                    {item.type === 'tip' ? 'Tips' : item.type === 'question' ? 'Soal' : 'Trik'}
                  </span>
                </td>
                <td className="px-4 py-2" data-label="Mata Pelajaran">{item.subject}</td>
                <td className="px-4 py-2" data-label="Konten">{item.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContentList;