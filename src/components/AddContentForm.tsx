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
    <div className="p-6 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          {editContent ? 'Edit Konten' : 'Tambah Konten Baru'}
        </h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          type="button"
        >
          <X size={24} className="text-gray-600" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
            Judul <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
            placeholder="Masukkan judul konten"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
            Kategori <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
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
          <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
            Konten <span className="text-red-500">*</span>
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-y"
            placeholder="Tuliskan konten edukasi Anda di sini..."
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-700 mb-2">
            URL Gambar <span className="text-gray-500 font-normal">(opsional)</span>
          </label>
          <input
            type="url"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPublished"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
            />
            <label htmlFor="isPublished" className="ml-3 text-sm font-medium text-gray-700 cursor-pointer">
              Publish konten langsung setelah disimpan
            </label>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-semibold text-gray-700"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Menyimpan...
              </span>
            ) : (
              editContent ? 'Update Konten' : 'Simpan Konten'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContentForm;