import CustomButton from '@/app/components/CustomButton';
import SettingsPanel from '@app/dashboard/parts/SettingsPanel';

interface Settings {
  text: string;
  color: string;
  size: string;
  [key: string]: string | number | boolean;
}

const EmbedButtonPage = (settings: Settings) => {

  return (
    <div>
      <CustomButton settings={settings} />
    </div>
  );
};

export default EmbedButtonPage;