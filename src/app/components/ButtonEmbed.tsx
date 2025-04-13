import { useEffect, useState } from 'react';

const ButtonEmbedPage = ({ params }: { params: { instanceId: string } }) => {
  const { instanceId } = params;
  interface ButtonSettings {
    color: string;
    size: 'lg' | 'sm';
    text: string;
  }

  const [settings, setSettings] = useState<ButtonSettings | null>(null);

  useEffect(() => {
    // Fetch button settings using the instanceId
    fetch(`/api/get-settings?instance=${instanceId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.settings) {
          setSettings(data.settings);
        }
      })
      .catch((error) => {
        console.error('Error fetching button settings:', error);
      });
  }, [instanceId]);

  if (!settings) {
    return <div>Loading...</div>;
  }

  return (
    <button
      style={{
        backgroundColor: settings.color,
        fontSize: settings.size === 'lg' ? '20px' : '14px',
        padding: '10px 20px',
      }}
    >
      {settings.text}
    </button>
  );
};

export default ButtonEmbedPage;