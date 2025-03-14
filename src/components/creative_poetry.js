import React, { useState, useEffect } from 'react';
import './CadDesigning.css';

function CreativePoetry() {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch('https://vansh-2k25.onrender.com/api/registrations/by-event/CREATIVE_POETRY')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Received data:', data);
                if (data.success) {
                    setRegistrations(data.registrations);
                } else {
                    setError('Failed to fetch data');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setError(error.message);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!registrations.length) return <div className="no-data">No registrations found</div>;

    return (
        <div className="cad-designing-container">
            <h2>Creative Poetry Registrations</h2>
            <div className="table-container">
                <table className="registrations-table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>College</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registrations.map((reg, index) => (
                            <tr key={index}>
                                <td data-label="Username">{reg.username}</td>
                                <td data-label="College">{reg.collegename}</td>
                                <td data-label="Email">{reg.email}</td>
                                <td data-label="Phone">{reg.phonenumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CreativePoetry;