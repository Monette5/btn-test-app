'use client';

import { useState } from 'react';
import SettingsPanel from '@/app/dashboard/parts/SettingsPanel';
import CustomButton from '@/app/components/CustomButton';
import Widget from '@app/components/Widget';

const DashboardMain = () => {
  const [buttonSettings, setButtonSettings] = useState({
    text: 'Click me!',
    color: '#0070f3',
    size: 'md',
  });

  const handleSettingsChange = (newSettings: typeof buttonSettings) => {
    // Only update state if the settings have actually changed
    if (
      newSettings.text !== buttonSettings.text ||
      newSettings.color !== buttonSettings.color ||
      newSettings.size !== buttonSettings.size
    ) {
      setButtonSettings(newSettings);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Customize Your Button and Widget</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column: Settings */}
        <div className="col-span-1 p-4 bg-white rounded shadow">
          <SettingsPanel onSettingsChange={handleSettingsChange} />
        </div>

        {/* Middle column: Button Preview */}
        <div className="col-span-1 flex items-center justify-center p-8 bg-white rounded shadow">
          <CustomButton settings={buttonSettings} />
        </div>

        {/* Right column: Widget */}
        <div className="col-span-1 p-4 bg-white rounded shadow">
          <Widget />
        </div>
      </div>
    </div>
  );
};


export default DashboardMain;