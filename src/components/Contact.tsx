import React from 'react';
import { MessageCircle, Send, Phone, Mail } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg p-6 md:p-8">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Hubungi Kami</h2>

      <div className="space-y-6 text-white text-opacity-95">
        <p className="text-lg leading-relaxed">
          Kami senang mendengar dari Anda! Jika Anda memiliki pertanyaan, saran, atau ingin berdiskusi, jangan ragu untuk menghubungi kami melalui salah satu platform berikut:
        </p>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <a
            href="https://discord.gg/edutipssmp"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-xl p-5 flex items-center gap-4 transition-all transform hover:scale-105 shadow-lg"
          >
            <div className="bg-blue-600 rounded-full p-3">
              <MessageCircle size={28} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Discord</h3>
              <p className="text-sm text-white text-opacity-80">Join komunitas kami</p>
            </div>
          </a>

          <a
            href="https://t.me/edutipssmp"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-xl p-5 flex items-center gap-4 transition-all transform hover:scale-105 shadow-lg"
          >
            <div className="bg-sky-500 rounded-full p-3">
              <Send size={28} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Telegram</h3>
              <p className="text-sm text-white text-opacity-80">@edutipssmp</p>
            </div>
          </a>

          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-xl p-5 flex items-center gap-4 transition-all transform hover:scale-105 shadow-lg"
          >
            <div className="bg-green-500 rounded-full p-3">
              <Phone size={28} />
            </div>
            <div>
              <h3 className="font-bold text-lg">WhatsApp</h3>
              <p className="text-sm text-white text-opacity-80">+62 812-3456-7890</p>
            </div>
          </a>

          <a
            href="mailto:info@edutipssmp.com"
            className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-xl p-5 flex items-center gap-4 transition-all transform hover:scale-105 shadow-lg"
          >
            <div className="bg-red-500 rounded-full p-3">
              <Mail size={28} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Email</h3>
              <p className="text-sm text-white text-opacity-80">info@edutipssmp.com</p>
            </div>
          </a>
        </div>

        <div className="bg-white bg-opacity-10 rounded-lg p-5 mt-8">
          <p className="text-center text-lg">
            Kami akan berusaha untuk merespons secepat mungkin. Terima kasih atas dukungan Anda terhadap EduTips SMP!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;