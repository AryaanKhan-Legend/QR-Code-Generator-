import React from 'react';
import { QrCode } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="p-4 md:p-6 flex items-center justify-center bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <QrCode className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">QRCraft</h1>
        </div>
        <div className="text-sm text-gray-500">
          Simple. Beautiful. Fast.
        </div>
      </div>
    </header>
  );
};

export default Header;