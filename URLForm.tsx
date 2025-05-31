import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode } from 'lucide-react';
import ColorPicker from './ColorPicker';

interface URLFormProps {
  onSubmit: (url: string, color: string, bgColor: string) => void;
}

const URLForm: React.FC<URLFormProps> = ({ onSubmit }) => {
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const [qrColor, setQrColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');

  const validateUrl = (value: string) => {
    try {
      // Check if the URL is valid by attempting to construct a URL object
      new URL(value);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepend http:// if no protocol is specified
    let processedUrl = url.trim();
    if (processedUrl && !processedUrl.match(/^[a-zA-Z]+:\/\//)) {
      processedUrl = `https://${processedUrl}`;
    }
    
    if (!processedUrl) {
      setUrlError('Please enter a URL');
      return;
    }
    
    if (!validateUrl(processedUrl)) {
      setUrlError('Please enter a valid URL');
      return;
    }
    
    setUrlError('');
    onSubmit(processedUrl, qrColor, bgColor);
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
          Enter URL
        </label>
        <div className="relative">
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (urlError) setUrlError('');
            }}
            className={`block w-full px-4 py-3 rounded-lg border ${
              urlError ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pl-10`}
            placeholder="https://example.com"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <QrCode size={18} />
          </div>
        </div>
        {urlError && (
          <p className="mt-1 text-sm text-red-600">{urlError}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ColorPicker
          label="QR Code Color"
          color={qrColor}
          onChange={setQrColor}
        />
        <ColorPicker
          label="Background Color"
          color={bgColor}
          onChange={setBgColor}
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <QrCode size={20} />
        <span>Generate QR Code</span>
      </button>
    </motion.form>
  );
};

export default URLForm;