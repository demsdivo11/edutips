import React, { useState, useEffect } from 'react';
import { supabase, EdutipsContent } from '../lib/supabase';
import { Plus, CreditCard as Edit2, Trash2, Eye, EyeOff, LogOut, RefreshCw } from 'lucide-react';
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
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Admin</h1>
            <p className="text-gray-600">Kelola konten edukasi Anda</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button
              onClick={fetchContents}
              className="flex-1 md:flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
              title="Refresh"
            >
              <RefreshCw size={20} />
              <span className="md:hidden">Refresh</span>
            </button>
            <button
              onClick={() => setShowForm(true)}
              className="flex-1 md:flex-none bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <Plus size={20} />
              Tambah Konten
            </button>
            <button
              onClick={onLogout}
              className="flex-1 md:flex-none bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <AddContentForm
              adminId={adminId}
              onClose={handleFormClose}
              editContent={editingContent}
            />
          </div>
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-xl shadow-lg p-12">
          <div className="flex flex-col items-center justify-center">
            <RefreshCw className="animate-spin text-blue-600 mb-4" size={48} />
            <p className="text-gray-600 text-lg">Memuat data...</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                <tr>
                  <th className="px-4 py-4 text-left font-semibold">Judul</th>
                  <th className="px-4 py-4 text-left font-semibold">Kategori</th>
                  <th className="px-4 py-4 text-left font-semibold">Status</th>
                  <th className="px-4 py-4 text-left font-semibold">Dibuat</th>
                  <th className="px-4 py-4 text-center font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {contents.map((content, index) => (
                  <tr
                    key={content.id}
                    className={`border-b transition-colors ${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    } hover:bg-blue-50`}
                  >
                    <td className="px-4 py-4 font-medium text-gray-800">{content.title}</td>
                    <td className="px-4 py-4">
                      <span className="text-gray-700 capitalize">{content.category}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          content.is_published
                            ? 'bg-green-100 text-green-800 border border-green-300'
                            : 'bg-gray-100 text-gray-800 border border-gray-300'
                        }`}
                      >
                        {content.is_published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-600">
                      {new Date(content.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-center gap-1">
                        <button
                          onClick={() => togglePublish(content)}
                          className={`p-2 rounded-lg transition-all ${
                            content.is_published
                              ? 'hover:bg-yellow-100 text-yellow-600'
                              : 'hover:bg-green-100 text-green-600'
                          }`}
                          title={content.is_published ? 'Unpublish' : 'Publish'}
                        >
                          {content.is_published ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        <button
                          onClick={() => handleEdit(content)}
                          className="p-2 hover:bg-blue-100 rounded-lg text-blue-600 transition-all"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(content.id)}
                          className="p-2 hover:bg-red-100 rounded-lg text-red-600 transition-all"
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
          </div>
          {contents.length === 0 && (
            <div className="text-center py-16 px-4">
              <div className="text-gray-400 mb-4">
                <Plus size={64} className="mx-auto opacity-50" />
              </div>
              <p className="text-gray-600 text-lg font-medium mb-2">Belum ada konten</p>
              <p className="text-gray-500">Tambahkan konten pertama Anda dengan klik tombol "Tambah Konten"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPage;