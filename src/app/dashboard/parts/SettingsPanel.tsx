'use client';

import { useEffect, useState } from 'react';

type Settings = {
  text: string;
  color: string;
  size: string;
};

const SettingsPanel = ({ onSettingsChange }: { onSettingsChange: (settings: Settings) => void }) => {
  const [text, setText] = useState('Click me!');
  const [color, setColor] = useState('#0070f3');
  const [size, setSize] = useState('md');

  useEffect(() => {
    onSettingsChange({ text, color, size }); // Notify parent of changes
  }, [text, color, size, onSettingsChange]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Button Text</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Button Color</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="mt-1 w-16 h-8 border-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Button Size</label>
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="sm">Small</option>
          <option value="md">Medium</option>
          <option value="lg">Large</option>
        </select>
      </div>
    </div>
  );
};

export default SettingsPanel;