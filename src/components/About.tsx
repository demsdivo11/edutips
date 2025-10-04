import React from 'react';
import { BookOpen, Target, Lightbulb, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg p-6 md:p-8">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Tentang EduTips SMP</h2>

      <div className="space-y-6 text-white text-opacity-95 leading-relaxed">
        <p className="text-lg">
          EduTips SMP adalah platform yang didedikasikan untuk membantu siswa SMP dalam pembelajaran mereka. Kami menyediakan tips, trik, dan konten edukatif untuk berbagai mata pelajaran.
        </p>

        <div className="bg-white bg-opacity-10 rounded-lg p-5 my-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Target className="text-cyan-300" size={24} />
            Tujuan Kami
          </h3>
          <p>
            Membuat pembelajaran menjadi lebih menyenangkan, efektif, dan mudah dipahami oleh semua siswa SMP di Indonesia.
          </p>
        </div>

        <h3 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-2">
          <Lightbulb className="text-yellow-300" size={28} />
          Manfaat Platform
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white bg-opacity-10 rounded-lg p-4 hover:bg-opacity-20 transition-all">
            <div className="flex items-start gap-3">
              <div className="bg-cyan-500 rounded-full p-2 mt-1">
                <BookOpen size={20} />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Tips Belajar Praktis</h4>
                <p className="text-sm text-white text-opacity-80">Dapatkan cara belajar yang efektif dan mudah diterapkan</p>
              </div>
            </div>
          </div>

          <div className="bg-white bg-opacity-10 rounded-lg p-4 hover:bg-opacity-20 transition-all">
            <div className="flex items-start gap-3">
              <div className="bg-blue-500 rounded-full p-2 mt-1">
                <Lightbulb size={20} />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Trik Pemahaman</h4>
                <p className="text-sm text-white text-opacity-80">Pelajari trik untuk memahami konsep dengan lebih mudah</p>
              </div>
            </div>
          </div>

          <div className="bg-white bg-opacity-10 rounded-lg p-4 hover:bg-opacity-20 transition-all">
            <div className="flex items-start gap-3">
              <div className="bg-green-500 rounded-full p-2 mt-1">
                <Target size={20} />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Konten Berkualitas</h4>
                <p className="text-sm text-white text-opacity-80">Akses berbagai konten edukatif yang relevan</p>
              </div>
            </div>
          </div>

          <div className="bg-white bg-opacity-10 rounded-lg p-4 hover:bg-opacity-20 transition-all">
            <div className="flex items-start gap-3">
              <div className="bg-orange-500 rounded-full p-2 mt-1">
                <Users size={20} />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Beragam Kategori</h4>
                <p className="text-sm text-white text-opacity-80">Materi dari berbagai mata pelajaran SMP</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-500 bg-opacity-20 border-l-4 border-yellow-300 rounded-lg p-5 mt-8">
          <p className="font-semibold mb-2">Catatan Penting:</p>
          <p className="text-sm">
            Platform ini adalah alat bantu pembelajaran. Kesuksesan tetap tergantung pada usaha dan ketekunan Anda dalam belajar. Jangan jadikan ini sebagai satu-satunya sumber belajar Anda. Tetaplah rajin membaca buku, mengikuti pelajaran di sekolah, dan berdiskusi dengan guru dan teman-teman Anda.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;