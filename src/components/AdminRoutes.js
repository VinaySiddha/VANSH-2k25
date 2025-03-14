import React from 'react';
import { Route } from 'react-router-dom';
import CadDesigning from './CadDesigning';
import Coders from './Coders';
import PosterPresentation from './pp';
import PaperPresentation from './ppa';
import VHack from './vhack';
import Pitch from './pitch';

import Jam from './jam';
import Gaming from './Gaming';
import CodingRelay from './crelay';
import SingingSolo from './singing_solo';
import SingingGroup from './singing_group';
import DanceGroup from './dance_group';
import BattleOfBands from './battle_of_bands';
import Drama from './drama';
import ArtGallery from './art_gallery';
import ArtCompetition from './art_competition';
import Mehandi from './mehandi';
import Rangoli from './rangoli';
import NailArtAndFaceArt from './nail_art_and_face_art';
import Quiz from './quiz';
import CreativeWritingAndPoetry from './creative_writing_and_poetry';

function AdminRoutes() {
    return (
        <>
            <Route path="/cad" element={<CadDesigning />} />
            <Route path="/coders" element={<Coders />} />
            <Route path="/pp" element={<PosterPresentation />} />
            <Route path="/ppa" element={<PaperPresentation />} />
            <Route path="/vhack" element={<VHack />} />
            <Route path="/pitch" element={<Pitch />} />
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
            <Route path="/admin/creative-writing-and-poetry" element={<CreativeWritingAndPoetry />} />
        </>
    );
}

export default AdminRoutes;