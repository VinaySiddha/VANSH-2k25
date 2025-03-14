import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
    return (
        <nav className="navbar">
            <div className="nav-section">
                <h3>Technical Events</h3>
                <Link to="/cad">CAD Designing</Link>
                <Link to="/coders">Coders</Link>
                <Link to="/crelay">Coding Relay</Link>
                <Link to="/pitch">Ideathon & Startup Pitch</Link>
                <Link to="/gaming">Online Gaming</Link>
                <Link to="/ppa">Paper Presentation</Link>
                <Link to="/pp">Poster Presentation</Link>
                <Link to="/vhack">VHack 2k25</Link>
            </div>

            <div className="nav-section">
                <h3>Cultural Events</h3>
                <Link to="/admin/singing-group">Singing Group</Link>
                <Link to="/admin/dance-group">Dance Group</Link>
                <Link to="/admin/battle-of-bands">Battle of Bands</Link>
                <Link to="/admin/drama">Drama</Link>
            </div>

            <div className="nav-section">
                <h3>Art Events</h3>
                <Link to="/admin/art-gallery">Art Gallery</Link>
                <Link to="/admin/art-competition">Art Competition</Link>
                <Link to="/admin/mehandi">Mehandi</Link>
                <Link to="/admin/rangoli">Rangoli</Link>
                <Link to="/admin/nail-art-and-face-art">Nail Art & Face Art</Link>
                <Link to="/admin/quiz">Quiz</Link>
            </div>

            <div className="nav-section">
                <h3>Literary Events</h3>
                <Link to="/admin/creative-writing-and-poetry">Creative Writing & Poetry</Link>
                <Link to="/jam">JAM</Link>
            </div>
        </nav>
    );
}

export default NavBar;