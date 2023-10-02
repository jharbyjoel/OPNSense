import React, {useState, useEffect} from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';
import '../css/FirmwareStatus.css';

function FirmwareStatus() {
    const [firmwareInfo, setFirmwareInfo] = useState({}); // Create an empty useState Object

    useEffect(() => {
        fetch('http://localhost:3005/api/firmware/info', {mode: 'cors'}) // CORS needs to be enabled to allows port 3000 to access port 3005 (backend)
        .then((response) => response.json()) // Fetching the response 
        .then((data) => {
            setFirmwareInfo(data);
        })
        .catch((error) => {
            console.error('Error fetching firmware info:', error);
        });
    }, []);

    const handleCheckForUpdate = () => {
        alert('Checking for updates...')
    }

    const handleRollBack = () => {
        alert('Rolling back to previous version...')
    }

    return (
        <div className="firmware-status-container">
          <h1 className="firmware-status-title">Firmware Updates</h1>
          <button className='check-for-update-button' onClick={handleCheckForUpdate}>Check for Update
          </button>
          <p className="firmware-status-text">
            <strong>Product</strong> {firmwareInfo.productID || 'N/A'}
          </p>
          <p className="firmware-status-text">
            <strong> Version:</strong> {firmwareInfo.productVersion || 'N/A'}
          </p>
          <div>
            <p className="firmware-status-text">
              <strong>Changelog:</strong>
            </p>
            <ul className="changelog-list">
              {firmwareInfo.changeLog &&
                firmwareInfo.changeLog.map((entry, index) => (
                  <li key={index} className="changelog-item">
                    <strong>Series:</strong> {entry.series}<br />
                    <strong>Version:</strong> {entry.version}<br />
                    <strong>Date:</strong> {entry.date}<br />
                    <button className='rollback-button' on onClick={handleRollBack}>Roll Back
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      );
    }
    
    
export default FirmwareStatus;