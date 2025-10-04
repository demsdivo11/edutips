import React, { useState, useEffect } from 'react';
import { supabase, EdutipsContent } from '../lib/supabase';
import { X } from 'lucide-react';

interface AddContentFormProps {
  adminId: string;
  onClose: () => void;
  editContent?: EdutipsContent | null;
}

const AddContentForm: React.FC<AddContentFormProps> = ({ adminId, onClose, editContent }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('umum');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editContent) {
      setTitle(editContent.title);
      setCategory(editContent.category);
      setContent(editContent.content);
      setImageUrl(editContent.image_url || '');
      setIsPublished(editContent.is_published);
    }
  }, [editContent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const contentData = {
        title,
        category,
        content,
        image_url: imageUrl || null,
        is_published: isPublished,
        updated_at: new Date().toISOString(),
      };

      if (editContent) {
        const { error } = await supabase
          .from('edutips_content')
          .update(contentData)
          .eq('id', editContent.id);

        if (error) throw error;
        alert('Konten berhasil diupdate!');
      } else {
        const { error } = await supabase
          .from('edutips_content')
          .insert([{
            ...contentData,
            created_by: adminId,
          }]);

        if (error) throw error;
        alert('Konten berhasil ditambahkan!');
      }

      onClose();
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Gagal menyimpan konten');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {editContent ? 'Edit Konten' : 'Tambah Konten Baru'}
        </h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Judul *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Kategori *
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="umum">Umum</option>
            <option value="matematika">Matematika</option>
            <option value="ipa">IPA</option>
            <option value="ips">IPS</option>
            <option value="bahasa">Bahasa</option>
            <option value="seni">Seni</option>
            <option value="olahraga">Olahraga</option>
          </select>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Konten *
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
            URL Gambar (opsional)
          </label>
          <input
            type="url"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isPublished"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="isPublished" className="ml-2 text-sm font-medium text-gray-700">
            Publish langsung
          </label>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            {loading ? 'Menyimpan...' : (editContent ? 'Update' : 'Simpan')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContentForm;