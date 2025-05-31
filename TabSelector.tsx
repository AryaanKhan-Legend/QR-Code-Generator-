import React from 'react';
import { motion } from 'framer-motion';
import { Link, Wifi } from 'lucide-react';

interface TabSelectorProps {
  activeTab: 'url' | 'wifi';
  setActiveTab: (tab: 'url' | 'wifi') => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center">
      <div className="inline-flex rounded-lg bg-gray-100 p-1">
        <button
          onClick={() => setActiveTab('url')}
          className={`relative px-4 py-2 rounded-md flex items-center gap-2 transition-all duration-200 ${
            activeTab === 'url' 
              ? 'text-white' 
              : 'text-gray-700 hover:text-gray-900'
          }`}
        >
          {activeTab === 'url' && (
            <motion.div
              layoutId="tab-bg"
              className="absolute inset-0 bg-blue-600 rounded-md"
              initial={false}
              transition={{ type: 'spring', duration: 0.5 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            <Link size={18} />
            <span>URL</span>
          </span>
        </button>
        
        <button
          onClick={() => setActiveTab('wifi')}
          className={`relative px-4 py-2 rounded-md flex items-center gap-2 transition-all duration-200 ${
            activeTab === 'wifi' 
              ? 'text-white' 
              : 'text-gray-700 hover:text-gray-900'
          }`}
        >
          {activeTab === 'wifi' && (
            <motion.div
              layoutId="tab-bg"
              className="absolute inset-0 bg-blue-600 rounded-md"
              initial={false}
              transition={{ type: 'spring', duration: 0.5 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            <Wifi size={18} />
            <span>WiFi</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default TabSelector;