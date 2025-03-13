import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Registration from './components/Registration';
import Login from './components/login'; // Fixed capitalization
import backgroundVideo from './videos/background.mp4';
import CadDesigning from './components/CadDesigning';
import Coders from './components/Coders';
import PosterPresentation from './components/pp';
import PaperPresentation from './components/ppa';
import vhack from './components/vhack';
import pitch from './components/pitch';
import ReceiptDownload from './components/ReceiptDownload';
function App() {
  return (
    <Router>
      <div className="App">
        <div className="video-background">
          <video autoPlay muted loop playsInline>
            <source src={backgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cad" element={<CadDesigning />} />
          <Route path="/coders" element={<Coders />} />
          <Route path="/pp" element={<PosterPresentation />} />
          <Route path="/ppa" element={<PaperPresentation />} />
          <Route path="/vhack" element={<vhack />} />
          <Route path="/pitch" element={<pitch />} />
          <Route path="/ReceiptDownload" element={<ReceiptDownload />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
