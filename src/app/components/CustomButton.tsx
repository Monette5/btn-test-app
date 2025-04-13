
const CustomButton = ({ settings }: { settings: { text: string; color: string; size: string } }) => {
  return (
    <button
      style={{
        backgroundColor: settings.color,
        fontSize: settings.size === 'lg' ? '20px' : settings.size === 'sm' ? '12px' : '16px',
        padding: settings.size === 'lg' ? '12px 24px' : settings.size === 'sm' ? '6px 12px' : '10px 20px',
        color: '#fff',
        borderRadius: '5px',
        cursor: 'pointer',
        border: 'none',
      }}
      className="shadow hover:opacity-90 transition-opacity"
    >
      {settings.text}
    </button>
  );
};

export default CustomButton;