import React, { useState, useEffect } from 'react';
import { supabase, EdutipsContent } from '../lib/supabase';
import { Plus, Edit2, Trash2, Eye, EyeOff, LogOut } from 'lucide-react';
import AddContentForm from './AddContentForm';

interface AdminPageProps {
  adminId: string;
  onLogout: () => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ adminId, onLogout }) => {
  const [contents, setContents] = useState<EdutipsContent[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingContent, setEditingContent] = useState<EdutipsContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const { data, error } = await supabase
        .from('edutips_content')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContents(data || []);
    } catch (error) {
      console.error('Error fetching contents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus konten ini?')) return;

    try {
      const { error } = await supabase
        .from('edutips_content')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchContents();
      alert('Konten berhasil dihapus!');
    } catch (error) {
      console.error('Error deleting content:', error);
      alert('Gagal menghapus konten');
    }
  };

  const togglePublish = async (content: EdutipsContent) => {
    try {
      const { error } = await supabase
        .from('edutips_content')
        .update({ is_published: !content.is_published })
        .eq('id', content.id);

      if (error) throw error;
      fetchContents();
    } catch (error) {
      console.error('Error toggling publish:', error);
      alert('Gagal mengubah status publikasi');
    }
  };

  const handleEdit = (content: EdutipsContent) => {
    setEditingContent(content);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingContent(null);
    fetchContents();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Admin</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={20} />
            Tambah Konten
          </button>
          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <AddContentForm
              adminId={adminId}
              onClose={handleFormClose}
              editContent={editingContent}
            />
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">Judul</th>
                <th className="px-4 py-3 text-left">Kategori</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Dibuat</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {contents.map((content) => (
                <tr key={content.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{content.title}</td>
                  <td className="px-4 py-3">{content.category}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        content.is_published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {content.is_published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {new Date(content.created_at).toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => togglePublish(content)}
                        className="p-2 hover:bg-gray-200 rounded"
                        title={content.is_published ? 'Unpublish' : 'Publish'}
                      >
                        {content.is_published ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      <button
                        onClick={() => handleEdit(content)}
                        className="p-2 hover:bg-blue-100 rounded text-blue-600"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(content.id)}
                        className="p-2 hover:bg-red-100 rounded text-red-600"
                        title="Hapus"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {contents.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Belum ada konten. Tambahkan konten pertama Anda!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPage;