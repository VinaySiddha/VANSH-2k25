import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MrMrsCoders from './components/mr_mrs_coders';
import Registration from './components/Registration';
import Login from './components/login';
import backgroundVideo from './videos/background.mp4';
import CadDesigning from './components/CadDesigning';
import Coders from './components/Coders';
import PosterPresentation from './components/pp';
import PaperPresentation from './components/ppa';
import VHack from './components/vhack';
import Pitch from './components/pitch';
import ReceiptDownload from './components/ReceiptDownload';
import Jam from './components/jam';
import Gaming from './components/Gaming';
import CodingRelay from './components/crelay';
import SingingGroup from './components/singing_group';
import DanceGroup from './components/dance_group';
import BattleOfBands from './components/battle_of_bands';
import Drama from './components/drama';
import ArtGallery from './components/art_gallery';
import ArtCompetition from './components/art_competition';
import Mehandi from './components/mehandi';
import Rangoli from './components/rangoli';
import NailArtAndFaceArt from './components/nail_art_and_face_art';
import Quiz from './components/quiz';
import SingingSolo from './components/singing_solo';
import AIArena from './components/ai_arena';
import CreativePoetry from './components/creative_poetry';  
import CreativeWriting from './components/creative_writing';

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
          <Route path="/creative-writing" element={<CreativeWriting />} />
          <Route path="/admin/creative-writing" element={<CreativeWriting />} />
          <Route path="/creative-poetry" element={<CreativePoetry />} />
          <Route path="/admin/creative-poetry" element={<CreativePoetry />} />
          <Route path="/ppa" element={<PaperPresentation />} />
          <Route path="/ai_arena" element={<AIArena />} />
          <Route path="/admin/ai_arena" element={<AIArena />} />
          <Route path="/vhack" element={<VHack />} />
          <Route path="/pitch" element={<Pitch />} />
          <Route path="/ReceiptDownload" element={<ReceiptDownload />} />
          <Route path="/jam" element={<Jam />} />
          <Route path="/gaming" element={<Gaming />} />
          <Route path="/crelay" element={<CodingRelay />} />
          <Route path="/admin/singing-solo" element={<SingingSolo />} />
          <Route path="/admin/singing-group" element={<SingingGroup />} />
          <Route path="/admin/dance-group" element={<DanceGroup />} />
          <Route path="/admin/battle-of-bands" element={<BattleOfBands />} />
          <Route path="/admin/drama" element={<Drama />} />
          <Route path="/admin/art-gallery" element={<ArtGallery />} />
          <Route path="/admin/art-competition" element={<ArtCompetition />} />
          <Route path="/admin/mehandi" element={<Mehandi />} />
          <Route path="/admin/rangoli" element={<Rangoli />} />
          <Route path="/admin/nail-art-and-face-art" element={<NailArtAndFaceArt />} />
          <Route path="/admin/quiz" element={<Quiz />} />
          <Route path="/creative_poetry" element={<CreativePoetry />} />
          {/* Update this route to use the correct component */}
          <Route path="/mrmrscoder" element={<MrMrsCoders />} />
          <Route path="/admin/mr-mrs-coders" element={<MrMrsCoders />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
