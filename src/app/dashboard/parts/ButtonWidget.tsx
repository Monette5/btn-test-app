'use client';

import { useEffect, useState } from 'react';

export default function ButtonWidget({ instance }: { instance: string }) {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    // Fetch the settings for the given instance
    const fetchSettings = async () => {
      const response = await fetch(`/api/get-settings?instance=${instance}`);
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      } else {
        console.error('Error fetching settings');
      }
    };

    fetchSettings();
  }, [instance]);

  if (!settings) {
    return <div>Loading...</div>;
  }

  const { text, color, size, effect } = settings;

  const buttonStyle = {
    backgroundColor: color,
    fontSize: size === 'small' ? '12px' : size === 'medium' ? '16px' : '20px',
    textTransform: (effect === 'uppercase' ? 'uppercase' : 'none') as React.CSSProperties['textTransform'],
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <button style={buttonStyle}>
      {text}
    </button>
  );
}
