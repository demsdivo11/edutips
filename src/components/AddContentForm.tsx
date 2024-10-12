import React, { useState } from 'react';

interface AddContentFormProps {
  onAddContent: (newContent: {
    title: string;
    type: string;
    subject: string;
    content: string;
  }) => void;
}

const AddContentForm: React.FC<AddContentFormProps> = ({ onAddContent }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('tip');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddContent({ title, type, subject, content });
    // Reset form
    setTitle('');
    setType('tip');
    setSubject('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-white">Judul</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white bg-opacity-20 text-white"
          required
        />
      </div>
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-white">Tipe</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white bg-opacity-20 text-white"
        >
          <option value="tip">Tips</option>
          <option value="question">Soal</option>
          <option value="trick">Trik</option>
        </select>
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-white">Mata Pelajaran</label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white bg-opacity-20 text-white"
          required
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-white">Konten</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white bg-opacity-20 text-white"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Tambah Konten
      </button>
    </form>
  );
};

export default AddContentForm;