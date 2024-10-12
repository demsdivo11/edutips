import React from 'react';

const About = () => {
  return (
    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6">
      <h2 className="text-3xl font-bold mb-4">Tentang EduTips SMP</h2>
      <p className="mb-4">
        EduTips SMP adalah platform yang didedikasikan untuk membantu siswa SMP dalam pembelajaran mereka. Kami menyediakan tips, trik, dan soal-soal latihan untuk berbagai mata pelajaran.
      </p>
      <p className="mb-4">
        Tujuan kami adalah untuk membuat pembelajaran menjadi lebih menyenangkan dan efektif. Dengan menggunakan platform ini, siswa dapat:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Mendapatkan tips belajar yang praktis</li>
        <li>Mempelajari trik-trik untuk memahami konsep dengan lebih mudah</li>
        <li>Berlatih dengan soal-soal yang relevan</li>
        <li>Meningkatkan pemahaman mereka dalam berbagai mata pelajaran</li>
      </ul>
      <p>
        Ingat, ini hanya alat bantu pembelajaran. Kesuksesan tetap tergantung pada usaha dan ketekunan Anda dalam belajar. Jangan jadikan ini sebagai satu-satunya sumber belajar Anda. Tetaplah rajin membaca buku, mengikuti pelajaran di sekolah, dan berdiskusi dengan guru dan teman-teman Anda.
      </p>
    </div>
  );
};

export default About;