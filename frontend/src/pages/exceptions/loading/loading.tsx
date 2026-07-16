import { SyncLoader } from "react-spinners";
import './loading.css'

export default function LoadingScreen() {
  return (
    <div className="special-status-container">
      <SyncLoader color="var(--primary-color)" loading size={35} margin={10} />
      <p style={{ color: "#262626" }}>Loading...</p>
    </div>
  );
}
