const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const PDFDocument = require('pdfkit-table');
const fs = require('fs');
const path = require('path');

// Add events list at the top of the file
const eventsList = [
  { 
    name: 'CAD_DESIGNING',
    fee: 100,
    noParticipants: 2,
    type: 'TECHNICAL'
  },
  { 
    name: 'CODERS',
    fee: 100,
    noParticipants: 4,
    type: 'TECHNICAL'
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
    name: 'VHACK2k25',
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
    noParticipants: 3-6,
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
    noParticipants: 5-8,
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
    name: 'CREATIVE_WRITING&POETRY',
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
const pool = mysql.createPool({
    host: 'vansh2k25.database.windows.net,',
    user: 'vinay',
    password: 'Megha@1705',
    database: 'event_registration',
    waitForConnections: true,
    connectionLimit: 10000,
    queueLimit: 0
});

// Test database connection
pool.getConnection()
    .then(connection => {
        console.log('Database connected successfully');
        connection.release();
    })
    .catch(err => {
        console.error('Error connecting to database:', err);
    });

const app = express();

app.use(cors());
app.use(express.json());

// Add this near your other middleware
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// In your registration endpoint
app.post('/api/register', async (req, res) => {
    try {
        const { username, collegename, email, phoneNumber, events, utrid } = req.body;

        // More detailed validation
        if (!username || !email || !collegename || !phoneNumber || !utrid) {
            console.log('Missing field:', { username, email, collegename, phoneNumber, utrid });
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (!events || !Array.isArray(events) || events.length === 0) {
            console.log('Invalid events:', events);
            return res.status(400).json({ error: 'Please select at least one event' });
        }

        // Convert events array to comma-separated string
        const eventsString = events.join(',');
        console.log('Events string:', eventsString);

        // Calculate total amount with validation
        const totalAmount = events.reduce((total, eventName) => {
            const event = eventsList.find(e => e.name === eventName);
            if (!event) {
                console.log('Invalid event name:', eventName);
                return total;
            }
            return total + event.fee;
        }, 0);
        console.log('Calculated total amount:', totalAmount);

        // First, ensure uploads directory exists
        const uploadsDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        // Database insert
        const [result] = await pool.execute(
          `INSERT INTO users 
          (username, collegename, email, phonenumber, events, total_amount, utrid) 
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [username, collegename, email, phoneNumber, eventsString, totalAmount, utrid]
      );
      

        // Generate formatted acknowledgment ID
        const formattedAckId = `vansh-vits@${String(result.insertId).padStart(6, '0')}`;

        // Update the record with the formatted acknowledgment ID
        await pool.execute(
            'UPDATE users SET acknowledgment_id = ? WHERE id = ?',
            [formattedAckId, result.insertId]
        );

        // Generate PDF with new filename
        const doc = new PDFDocument({ margin: 30, size: 'A4' });
        const pdfPath = path.join(uploadsDir, `${formattedAckId}.pdf`);
        const pdfStream = fs.createWriteStream(pdfPath);

        // Create PDF content
        doc.pipe(pdfStream);
        
        // Add header with styling
        doc.fontSize(24)
           .font('Helvetica-Bold')
           .text('VANSH 2K25 Registration Confirmation', { align: 'center' });
        doc.moveDown();

        // Add registration details in table format
        const table = {
            headers: ['Field', 'Details'],
            rows: [
                ['Registration ID', formattedAckId],
                ['Username', username],
                ['College Name', collegename],
                ['Email', email],
                ['Phone Number', phoneNumber],
                ['Events', events.join(', ')],
                ['Total Amount', `₹${totalAmount}`],
                ['UTR ID', utrid],
                ['Registration Date', new Date().toLocaleString()]
            ]
        };

        // Wait for table to be rendered
        await doc.table(table, {
            prepareHeader: () => doc.font('Helvetica-Bold').fontSize(12),
            prepareRow: () => doc.font('Helvetica').fontSize(10),
            width: 500,
            padding: 10,
            divider: {
                header: { disabled: false, width: 2, opacity: 1 },
                horizontal: { disabled: false, width: 1, opacity: 0.5 }
            }
        });

        // End PDF generation
        doc.end();

        // Wait for PDF to be fully written
        await new Promise((resolve, reject) => {
            pdfStream.on('finish', resolve);
            pdfStream.on('error', reject);
        });

        // Send response only after PDF is generated
        res.status(201).json({
            success: true,
            message: 'Registration successful',
            acknowledgementId: result.insertId,
            formattedAckId: formattedAckId,
            pdfUrl: `/uploads/${formattedAckId}.pdf`
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            error: 'Registration failed',
            details: error.message || 'Unknown error occurred'
        });
    }
});

// Add new endpoint to download PDF
app.get('/api/download-pdf/:ackId', (req, res) => {
    const { ackId } = req.params;
    const pdfPath = path.join(__dirname, '../uploads', `${ackId}.pdf`);
    
    if (fs.existsSync(pdfPath)) {
        res.download(pdfPath);
    } else {
        res.status(404).json({ error: 'PDF not found' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Add this after your existing endpoints
app.get('/api/registrations/by-event/:eventName', async (req, res) => {
    try {
        const eventName = req.params.eventName;
        console.log('Fetching registrations for event:', eventName);

        // Query to find users who registered for a specific event
        const [rows] = await pool.execute(
            `SELECT username, collegename, email, phonenumber, events, total_amount 
             FROM users 
             WHERE FIND_IN_SET(?, events) > 0`,
            [eventName]
        );

        console.log(`Found ${rows.length} registrations for ${eventName}`);

        res.json({
            success: true,
            registrations: rows
        });

    } catch (error) {
        console.error('Error fetching registrations:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch registrations',
            details: error.message
        });
    }
});


