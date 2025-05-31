import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { motion } from 'framer-motion';
import { Download, Copy, ArrowLeft, Check } from 'lucide-react';
import { QrCodeType } from '../types';

interface QRCodeDisplayProps {
  qrData: QrCodeType;
  onBack: () => void;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ qrData, onBack }) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState(false);
  
  const downloadQRCode = () => {
    if (!qrRef.current) return;
    
    const canvas = qrRef.current.querySelector('canvas');
    if (!canvas) return;
    
    // Create a temporary link element
    const link = document.createElement('a');
    
    // Set link attributes
    link.href = canvas.toDataURL('image/png');
    link.download = `qrcode-${qrData.type === 'url' ? 'url' : 'wifi'}-${Date.now()}.png`;
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const copyQRCode = async () => {
    if (!qrRef.current) return;
    
    const canvas = qrRef.current.querySelector('canvas');
    if (!canvas) return;
    
    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        
        const item = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([item]);
        
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } catch (err) {
      console.error('Failed to copy QR code:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center"
    >
      <div 
        ref={qrRef}
        className="p-6 bg-white rounded-lg shadow-md mb-6 max-w-xs mx-auto"
      >
        <QRCodeCanvas
          value={qrData.data}
          size={250}
          bgColor={qrData.bgColor}
          fgColor={qrData.color}
          level="H"
          includeMargin={true}
        />
      </div>
      
      <div className="w-full max-w-sm flex flex-col gap-3">
        <button
          onClick={downloadQRCode}
          className="w-full py-2.5 px-4 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Download size={18} />
          <span>Download QR Code</span>
        </button>
        
        <button
          onClick={copyQRCode}
          className="w-full py-2.5 px-4 bg-white text-gray-800 border border-gray-300 font-medium rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {copied ? (
            <>
              <Check size={18} className="text-green-500" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={18} />
              <span>Copy to Clipboard</span>
            </>
          )}
        </button>
        
        <button
          onClick={onBack}
          className="w-full py-2.5 px-4 bg-transparent text-gray-600 font-medium rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <ArrowLeft size={18} />
          <span>Create Another QR Code</span>
        </button>
      </div>
    </motion.div>
  );
};

export default QRCodeDisplay;