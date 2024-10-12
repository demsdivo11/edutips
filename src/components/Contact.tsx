import React from 'react';
import { MessageCircle, Send, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6">
      <h2 className="text-3xl font-bold mb-4">Hubungi Kami</h2>
      <p className="mb-4">
        Kami senang mendengar dari Anda! Jika Anda memiliki pertanyaan, saran, atau ingin berdiskusi, jangan ragu untuk menghubungi kami melalui salah satu platform berikut:
      </p>
      <ul className="space-y-4">
        <li>
          <a href="https://discord.gg/edutipssmp" target="_blank" rel="noopener noreferrer" className="flex items-center text-white hover:text-pink-200">
            <MessageCircle className="mr-2" />
            Discord Server
          </a>
        </li>
        <li>
          <a href="https://t.me/edutipssmp" target="_blank" rel="noopener noreferrer" className="flex items-center text-white hover:text-pink-200">
            <Send className="mr-2" />
            Telegram: @edutipssmp
          </a>
        </li>
        <li>
          <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="flex items-center text-white hover:text-pink-200">
            <Phone className="mr-2" />
            WhatsApp: +62 812-3456-7890
          </a>
        </li>
      </ul>
      <p className="mt-4">
        Kami akan berusaha untuk merespons secepat mungkin. Terima kasih atas dukungan Anda terhadap EduTips SMP!
      </p>
    </div>
  );
};

export default Contact;