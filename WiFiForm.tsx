import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Lock, Eye, EyeOff } from 'lucide-react';
import ColorPicker from './ColorPicker';

interface WiFiFormProps {
  onSubmit: (ssid: string, password: string, security: string, color: string, bgColor: string) => void;
}

const WiFiForm: React.FC<WiFiFormProps> = ({ onSubmit }) => {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [security, setSecurity] = useState('WPA');
  const [showPassword, setShowPassword] = useState(false);
  const [qrColor, setQrColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [formErrors, setFormErrors] = useState({
    ssid: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = {
      ssid: '',
      password: '',
    };
    
    if (!ssid.trim()) {
      errors.ssid = 'Network name is required';
    }
    
    if (security !== 'nopass' && !password.trim()) {
      errors.password = 'Password is required for secured networks';
    }
    
    setFormErrors(errors);
    
    if (!errors.ssid && !errors.password) {
      onSubmit(ssid, password, security, qrColor, bgColor);
    }
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
        <label htmlFor="ssid" className="block text-sm font-medium text-gray-700 mb-1">
          Network Name (SSID)
        </label>
        <div className="relative">
          <input
            type="text"
            id="ssid"
            value={ssid}
            onChange={(e) => {
              setSsid(e.target.value);
              if (formErrors.ssid) setFormErrors({ ...formErrors, ssid: '' });
            }}
            className={`block w-full px-4 py-3 rounded-lg border ${
              formErrors.ssid ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pl-10`}
            placeholder="WiFi Network Name"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Wifi size={18} />
          </div>
        </div>
        {formErrors.ssid && (
          <p className="mt-1 text-sm text-red-600">{formErrors.ssid}</p>
        )}
      </div>

      <div>
        <label htmlFor="security" className="block text-sm font-medium text-gray-700 mb-1">
          Security Type
        </label>
        <select
          id="security"
          value={security}
          onChange={(e) => setSecurity(e.target.value)}
          className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        >
          <option value="WPA">WPA/WPA2/WPA3</option>
          <option value="WEP">WEP</option>
          <option value="nopass">No Password</option>
        </select>
      </div>

      {security !== 'nopass' && (
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (formErrors.password) setFormErrors({ ...formErrors, password: '' });
              }}
              className={`block w-full px-4 py-3 rounded-lg border ${
                formErrors.password ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pl-10 pr-10`}
              placeholder="WiFi Password"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Lock size={18} />
            </div>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {formErrors.password && (
            <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
          )}
        </div>
      )}

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
        <Wifi size={20} />
        <span>Generate WiFi QR Code</span>
      </button>
    </motion.form>
  );
};

export default WiFiForm;