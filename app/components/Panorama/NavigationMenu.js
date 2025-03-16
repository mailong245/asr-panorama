import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NavigationMenu = ({ locations, currentLocation, onLocationChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const styles = {
    container: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      zIndex: 1500,
      fontFamily: 'Helvetica, Arial, sans-serif',
    },
    button: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      color: 'white',
      border: 'none',
      padding: '10px 15px',
      borderRadius: '5px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontWeight: 'bold',
      fontSize: '14px',
    },
    menu: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      width: '250px',
      borderRadius: '5px',
      marginTop: '10px',
      overflow: 'hidden',
      maxHeight: isOpen ? '400px' : '0',
      transition: 'max-height 0.3s ease-in-out',
    },
    menuTitle: {
      padding: '15px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      color: 'white',
      fontSize: '16px',
      fontWeight: 'bold',
    },
    locationList: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      maxHeight: '300px',
      overflowY: 'auto',
    },
    locationItem: {
      padding: '12px 15px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      cursor: 'pointer',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    activeLocation: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    locationIcon: {
      width: '20px',
      height: '20px',
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '12px',
    },
  };

  return (
    <div style={styles.container}>
      <button 
        style={styles.button} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>🧭</span>
        {isOpen ? 'Close Menu' : 'Explore Locations'}
      </button>
      
      <div style={styles.menu}>
        <div style={styles.menuTitle}>Tour Locations</div>
        <ul style={styles.locationList}>
          {locations.map((location, index) => (
            <li 
              key={location.id}
              style={{
                ...styles.locationItem,
                ...(location.id === currentLocation ? styles.activeLocation : {})
              }}
              onClick={() => {
                onLocationChange(location.id);
                setIsOpen(false);
              }}
            >
              <div style={styles.locationIcon}>{index + 1}</div>
              {location.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

NavigationMenu.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  currentLocation: PropTypes.string.isRequired,
  onLocationChange: PropTypes.func.isRequired,
};

export default NavigationMenu; 