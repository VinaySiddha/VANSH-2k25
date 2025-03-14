import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Remove the './Registration.css' import since we're using App.css
const eventsList = [
  { 
    name: 'CAD_DESIGNING',
    fee: 100,
    noParticipants: 2,
    type: 'TECHNICAL',
    description: 'CAD Designing Competition'
  },
    { 
    name: 'CODING_RELAY',
    fee: 100,
    noParticipants: 3,
    type: 'TECHNICAL',
    description: 'Team Coding Challenge'
  },
  { 
    name: 'IDEATHON_START_UP_PITCH_DAY',
    fee: 100,
    noParticipants: 2,
    type: 'TECHNICAL',
    description: 'Startup Pitch Competition'
  },
  { 
    name: 'ONLINE_GAMING',
    fee: 300,
    noParticipants: 4,
    type: 'TECHNICAL',
    description: 'Gaming Tournament'
  },
  { 
    name: 'PAPER_PRESENTATION',
    fee: 100,
    noParticipants: 2,
    type: 'TECHNICAL',
    description: 'Technical Paper Presentation'
  },
  { 
    name: 'POSTER_PRESENTATION',
    fee: 100,
    noParticipants: 2,
    type: 'TECHNICAL',
    description: 'Technical Poster Presentation'
  },
  { 
    name: 'V\'HACK 2k25',
    fee: 300,
    noParticipants: 4,
    type: 'TECHNICAL',
    description: 'Hackathon'
  },
  { 
    name: 'SINGING_SOLO',
    fee: 200,
    noParticipants: 1,
    type: 'CULTURALS',
    description: 'CAD Designing Competition'
  },
  { 
    name: 'SINGING_GROUP',
    fee: 200,
    noParticipants: 3,
    type: 'CULTURALS',
    description: 'CAD Designing Competition'
  },
  { 
    name: 'DANCE_SOLO',
    fee: 200,
    noParticipants: 1,
    type: 'CULTURALS',
    description: 'CAD Designing Competition'
  },
  { 
    name: 'DANCE_GROUP',
    fee: 300,
    noParticipants: 6,
    type: 'CULTURALS',
    description: 'CAD Designing Competition'
  },
  { 
    name: 'BATTLE_OF_BANDS',
    fee: 699,
    noParticipants: 1,
    type: 'CULTURALS',
    description: 'CAD Designing Competition'
  },
  { 
    name: 'DRAMA',
    fee: 200,
    noParticipants: 8,
    type: 'CULTURALS',
    description: 'Coding Competition'
  },
  { 
    name: 'ART GALLERY',
    fee: 0,
    noParticipants: 1,
    type: 'ART',
    description: 'Coding Competition'
  },
  { 
    name: 'ART COMPETITION',
    fee: 50,
    noParticipants: 1,
    type: 'ART',
    description: 'Coding Competition'
  },
  { 
    name: 'MEHANDI',
    fee: 50,
    noParticipants: 1,
    type: 'ART',
    description: 'Coding Competition'
  },
  { 
    name: 'RANGOLI',
    fee: 200,
    noParticipants: 4,
    type: 'ART',
    description: 'Coding Competition'
  },
  { 
    name: 'NAIL_ART_AND_FACE_ART',
    fee: 50,
    noParticipants: 1,
    type: 'ART',
    description: 'Coding Competition'
  },
  { 
    name: 'QUIZ',
    fee: 200,
    noParticipants: 1,
    type: 'ART',
    description: 'Coding Competition'
  },
  { 
    name: 'CREATIVE_WRITING_&POETRY',
    fee: 50,
    noParticipants: 1,
    type: 'LITERARY',
    description: 'Coding Competition'
  },
  { 
    name: 'JAM',
    fee: 50,
    noParticipants: 1,
    type: 'LITERARY',
    description: 'Coding Competition'
  },
];
function Registration() {
  // Update the initial state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const [formData, setFormData] = useState({
    username: '',
    collegename:'',
    email: '',
    phoneNumber: '',
    events:[],
    utrid: ''
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [ackId, setAckId] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Add these validation rules in validateForm()
  // Fix the validateForm function
  const validateForm = () => {
    const newErrors = {};
    
    // Username validation - alphanumeric with underscore, 3-20 characters
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(formData.username)) {
      newErrors.username = 'Username must be 3-20 characters and can only contain letters, numbers, and underscores';
    }

        // ... existing validation code ...

    // College name validation - allow letters, numbers, spaces, dots, and common special characters
    const collegenameRegex = /^[a-zA-Z0-9\s.,'-]{3,100}$/;
    if (!collegenameRegex.test(formData.collegename)) {
      newErrors.collegename = 'College name must be between 3-100 characters and can contain letters, numbers, spaces, and basic punctuation';
    }

    // Email validation - more comprehensive check
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

     // Phone number validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }

    // Events validation
    if (formData.events.length === 0) {
      newErrors.events = 'Please select at least one event';
    }
    // Updated UTR ID validation - alphanumeric, 12-22 characters
    const utridRegex = /^[a-zA-Z0-9]{12,22}$/;
    if (!utridRegex.test(formData.utrid)) {
      newErrors.utrid = 'Please enter a valid UTR ID (12-22 characters, letters and numbers only)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add real-time validation
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        console.log('Submitting form data:', formData);
        const response = await axios.post('http://vansh-2k25.onrender.com/api/register', formData);
        
        if (response.data.acknowledgementId) {
          setMessage('Registration successful!');
          // Get the formatted ackId from the backend response
          setAckId(response.data.formattedAckId);
          setShowPopup(true);
          
          // Auto close popup after 30 seconds
          setTimeout(() => {
            setShowConfetti(true);
            setTimeout(() => {
              setShowPopup(false);
              setShowConfetti(false);
            }, 1000);
          }, 30000);

          // Download PDF after successful registration
          try {
            const pdfResponse = await axios.get(`http://vansh-2k25.onrender.com/api/download-pdf/${response.data.formattedAckId}`, {
              responseType: 'blob'
            });
            
            const url = window.URL.createObjectURL(new Blob([pdfResponse.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${response.data.formattedAckId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
          } catch (pdfError) {
            console.error('PDF download error:', pdfError);
            setMessage('Registration successful but PDF download failed. Please contact support.');
          }
          
          // Reset form
          setFormData({
            username: '',
            collegename:'',
            email: '',
            events: [],
            phoneNumber: '',
            utrid: ''
          });
          setErrors({});
        }
      } catch (error) {
        console.error('Registration error:', error);
        const errorMessage = error.response?.data?.error || 'Error registering user';
        setMessage(errorMessage);
        setAckId('');
      }
    }
};

  const [isClosing, setIsClosing] = useState(false);

  const closePopup = () => {
    setIsClosing(true);
    setShowConfetti(true);
    setTimeout(() => {
      setShowPopup(false);
      setShowConfetti(false);
      setIsClosing(false);
    }, 500);
  };
  const handleDownloadAcknowledgment = async (username) => {
    try {
      // First get the acknowledgment ID for the username
      const userResponse = await axios.get(`http://117.213.202.136:5000/api/user-acknowledgment/${username}`);
      const acknowledgmentId = userResponse.data.acknowledgement_id;
      
      // Then download the PDF using the acknowledgment ID
      const response = await axios.get(`http://117.213.202.136:5000/api/download-acknowledgment/${acknowledgmentId}`, {
        responseType: 'blob',
        headers: {
          'Accept': 'application/pdf'
        }
      });
      
      // Create and trigger download
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${username}.pdf`);
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error('Download error:', error);
      setMessage('Error downloading acknowledgment. Please try again.');
    }
  };
  return (
    <div className="registration-form">
               <h2 style={{
        color: '#00c3ff',
        animation: 'colorChange 8s linear infinite',
        fontWeight: '800',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        marginBottom: '2rem',
        fontSize: '2.2em',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
      }}>
        VANSH 2K25 Event Registration
      </h2>
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <i className="fas fa-user"></i>
          {errors.username && <div className="error-message">{errors.username}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <i className="fas fa-envelope"></i>
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="collegename" className="form-label">College Name</label>
          <input
            id="collegename"
            type="text"
            name="collegename"
            placeholder="Enter College Name"
            value={formData.collegename}
            onChange={handleChange}
            required
          />
          <i className="fas fa-lock"></i>
          {errors.collegename && <div className="error-message">{errors.collegename}</div>}
        </div>

        <div className="form-group">
          <div className="events-container">
            <div className="event-options">
              {/* Technical Events Section */}
              <div className="event-category">
                <h3 className="event-category-title">Technical Events</h3>
                {eventsList
                  .filter(event => event.type === 'TECHNICAL')
                  .map(event => (
                    <label 
                      key={event.name} 
                      className={`event-label technical ${
                        formData.events.includes(event.name) ? 'selected' : ''
                      }`}
                    >
                      <input
                        type="checkbox"
                        name="events"
                        value={event.name}
                        checked={formData.events.includes(event.name)}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData(prev => ({
                            ...prev,
                            events: e.target.checked 
                              ? [...prev.events, value]
                              : prev.events.filter(evt => evt !== value)
                          }));
                        }}
                        style={{ display: 'none' }}
                      />
                      <span className="event-info">
                        <span className="event-name">&nbsp;{event.name.replace(/_/g, ' ')}</span>
                        <span className="event-details">
                          <span className="event-fee">&nbsp;₹{event.fee}&nbsp;</span>
                          <span className="participants-count">Team Size-{event.noParticipants}</span>
                        </span>
                      </span>
                    </label>
                  ))}
              </div>
              
              {/* Cultural Events Section */}
              <div className="event-category">
                <h3 className="event-category-title">Cultural Events</h3>
                {eventsList
                  .filter(event => event.type === 'CULTURALS')
                  .map(event => (
                    <label 
                      key={event.name} 
                      className={`event-label cultural ${
                        formData.events.includes(event.name) ? 'selected' : ''
                      }`}
                    >
                      {/* Same input and span structure as technical events */}
                      <input
                        type="checkbox"
                        name="events"
                        value={event.name}
                        checked={formData.events.includes(event.name)}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData(prev => ({
                            ...prev,
                            events: e.target.checked 
                              ? [...prev.events, value]
                              : prev.events.filter(evt => evt !== value)
                          }));
                        }}
                        style={{ display: 'none' }}
                      />
                      <span className="event-info">
                        <span className="event-name">&nbsp;{event.name.replace(/_/g, ' ')}</span>
                        <span className="event-details">
                          <span className="event-fee">&nbsp;₹{event.fee}&nbsp;</span>
                          <span className="participants-count">Team Size-{event.noParticipants}</span>
                        </span>
                      </span>
                    </label>
                  ))}
              </div>
              
            {/* Literary Events Section */}
            <div className="event-category">
                <h3 className="event-category-title">Literary Events</h3>
                {eventsList
                  .filter(event => event.type === 'LITERARY')
                  .map(event => (
                    <label 
                      key={event.name} 
                      className={`event-label literary ${
                        formData.events.includes(event.name) ? 'selected' : ''
                      }`}
                    >
                      {/* Same input and span structure as technical events */}
                      <input
                        type="checkbox"
                        name="events"
                        value={event.name}
                        checked={formData.events.includes(event.name)}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData(prev => ({
                            ...prev,
                            events: e.target.checked 
                              ? [...prev.events, value]
                              : prev.events.filter(evt => evt !== value)
                          }));
                        }}
                        style={{ display: 'none' }}
                      />
                      <span className="event-info">
                        <span className="event-name">&nbsp;{event.name.replace(/_/g, ' ')}</span>
                        <span className="event-details">
                          <span className="event-fee">&nbsp;₹{event.fee}&nbsp;</span>
                          <span className="participants-count">Team Size-{event.noParticipants}</span>
                        </span>
                      </span>
                    </label>
                  ))}
              </div>
            {/* Art Events Section */}
            <div className="event-category">
                <h3 className="event-category-title">Art Events</h3>
                {eventsList
                  .filter(event => event.type === 'ART')
                  .map(event => (
                    <label 
                      key={event.name} 
                      className={`event-label art ${
                        formData.events.includes(event.name) ? 'selected' : ''
                      }`}
                    >
                      {/* Same input and span structure as technical events */}
                      <input
                        type="checkbox"
                        name="events"
                        value={event.name}
                        checked={formData.events.includes(event.name)}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData(prev => ({
                            ...prev,
                            events: e.target.checked 
                              ? [...prev.events, value]
                              : prev.events.filter(evt => evt !== value)
                          }));
                        }}
                        style={{ display: 'none' }}
                      />
                      <span className="event-info">
                        <span className="event-name">&nbsp;{event.name.replace(/_/g, ' ')}</span>
                        <span className="event-details">
                          <span className="event-fee">&nbsp;₹{event.fee}&nbsp;</span>
                          <span className="participants-count">Team Size-{event.noParticipants}</span>
                        </span>
                      </span>
                    </label>
                  ))}
              </div>
              
            </div>
          </div>
          {errors.events && <div className="error-message">{errors.events}</div>}
          <div className="totalamount">
          <label htmlFor="collegeName" className="form-label">Total Amount</label>
            <span className="totalamount" style={{ color: 'white' }}>₹{formData.events.reduce((total, eventName) => {
              const event = eventsList.find(e => e.name === eventName);
              return total + (event ? event.fee : 0);
            }, 0)}</span>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
          <input
            id="phoneNumber"
            type="tel"
            name="phoneNumber"
            placeholder="Enter your phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <i className="fas fa-phone"></i>
          {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}
        </div>

        
        <div className="form-group">
          <label htmlFor="QRScanner" className="form-label">QR Scanner</label>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <img 
              src={process.env.PUBLIC_URL + '/qr.JPG'} 
              alt="Payment QR Code"
              style={{ maxWidth: '50%', height: 'auto', margin: '1rem auto' }}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="utrid" className="form-label">UTR ID</label>
          <input
            id="utrid"
            type="text"
            name="utrid"
            placeholder="Enter UTR ID"
            value={formData.utrid}
            onChange={handleChange}
            required
          />
          {errors.utrid && <div className="error-message">{errors.utrid}</div>}
        </div>
        <div className="login-link">
        <a id="a" href="https://chat.whatsapp.com/C5ooZbhNxo71w3G7Hwevyn">whatsapp group for Art & Literary events</a>
      </div>
        <button type="submit">Register</button>
      </form>
      <div className="login-link">
        Download the Receipt? <a href="/ReceiptDownload">Click here</a>
      </div>

      {showPopup && (
        <div className={`popup-overlay ${isClosing ? 'closing' : ''}`}>
          <div className={`popup-content ${isClosing ? 'closing' : ''}`}>
            <h3>Registration Successful!</h3>
            <div className="ack-details">
              <p>Your VANSH 2k25 Receipt ID:</p>
              <div className="ack-id">{ackId}</div>
            </div>
            <p className="popup-note">Please save this Receipt for future reference</p>
            <button onClick={closePopup} className="close-button">Close</button>
          </div>
        </div>
      )}

      {showConfetti && (
        <div className="confetti-container">
          {[...Array(50)].map((_, i) => (
            <div 
              key={i} 
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                backgroundColor: `hsl(${Math.random() * 360}, 70%, 50%)`
              }}
            />          ))}
        </div>
      )}
    </div>
  );
}

export default Registration;
