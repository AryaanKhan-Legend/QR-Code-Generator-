import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TabSelector from './TabSelector';
import URLForm from './URLForm';
import WiFiForm from './WiFiForm';
import QRCodeDisplay from './QRCodeDisplay';
import { QrCodeType } from '../types';

const QRCodeGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'url' | 'wifi'>('url');
  const [qrData, setQrData] = useState<QrCodeType>({
    type: 'url',
    data: '',
    color: '#000000',
    bgColor: '#FFFFFF',
  });
  const [isGenerated, setIsGenerated] = useState(false);

  const handleURLSubmit = (url: string, color: string, bgColor: string) => {
    setQrData({
      type: 'url',
      data: url,
      color,
      bgColor,
    });
    setIsGenerated(true);
  };

  const handleWiFiSubmit = (ssid: string, password: string, security: string, color: string, bgColor: string) => {
    // Format according to WiFi QR code standard
    // WIFI:S:<SSID>;T:<WPA|WEP|>;P:<PASSWORD>;;
    const wifiString = `WIFI:S:${ssid};T:${security};P:${password};;`;
    
    setQrData({
      type: 'wifi',
      data: wifiString,
      color,
      bgColor,
    });
    setIsGenerated(true);
  };

  const resetForm = () => {
    setIsGenerated(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 md:p-8"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
        Generate QR Codes Instantly
      </h2>
      
      {!isGenerated ? (
        <>
          <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <div className="mt-6">
            {activeTab === 'url' ? (
              <URLForm onSubmit={handleURLSubmit} />
            ) : (
              <WiFiForm onSubmit={handleWiFiSubmit} />
            )}
          </div>
        </>
      ) : (
        <QRCodeDisplay qrData={qrData} onBack={resetForm} />
      )}
    </motion.div>
  );
};

export default QRCodeGenerator;