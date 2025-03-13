import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReceiptDownload = () => {
  const [receiptName, setReceiptName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!receiptName.trim()) {
      setError('Please enter a receipt ID');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`https://vvansh-2k25-welk.vercel.app/api/download-pdf/${receiptName}`, {
        responseType: 'blob',
        headers: {
          'Accept': 'application/pdf'
        }
      });

      if (response.status === 200 && response.data.size > 0) {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${receiptName}.pdf`);
        document.body.appendChild(link);
        link.click();

        // Cleanup
        setTimeout(() => {
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        }, 100);

        setError('');
        setReceiptName('');
        
        // Add redirect after successful download
        setTimeout(() => {
          navigate('/');
        }, 10000);
      } else {
        throw new Error('Invalid PDF data received');
      }
    } catch (error) {
      console.error('Download error:', error);
      setError(
        error.response?.status === 404
          ? 'Receipt not found. Please check the ID and try again.'
          : 'Error downloading receipt. Please try again later.'
      );
    } finally {
      setLoading(false);
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
        fontSize: '2.2em'
      }}>
        Download Receipt
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="receiptName" className="form-label">Receipt ID</label>
          <input
            id="receiptName"
            type="text"
            value={receiptName}
            onChange={(e) => setReceiptName(e.target.value)}
            placeholder="Enter Receipt ID (e.g., vansh-vits@123456)"
            required
          />
          <i className="fas fa-file-pdf"></i>
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Downloading...' : 'Download Receipt'}
        </button>
      </form>
      {loading && <p>Redirecting to registration page in 10 seconds...</p>}
    </div>
  );
};

export default ReceiptDownload;