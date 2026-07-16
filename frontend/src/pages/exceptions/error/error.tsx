import { useTranslation } from 'react-i18next';
import './error.css'

interface ErrorScreenProps {
  message: string;
}

export default function ErrorScreen({ message }: ErrorScreenProps) {
  const {t} = useTranslation();
  return (
    <div className="special-status-container">
      <p>{message} T-T</p>
      <p>{t("errorPage.subtitle")}</p>
    </div>
  );
}
