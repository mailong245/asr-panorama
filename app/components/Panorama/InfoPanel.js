import React, { useState } from 'react';
import PropTypes from 'prop-types';

const InfoPanel = ({ location }) => {
  const [isOpen, setIsOpen] = useState(false);

  const styles = {
    container: {
      position: 'absolute',
      bottom: '90px',
      right: '20px',
      zIndex: 1500,
      fontFamily: 'Helvetica, Arial, sans-serif',
      width: '350px',
      transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
      transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
      opacity: isOpen ? 1 : 0,
      pointerEvents: isOpen ? 'auto' : 'none',
    },
    toggleButton: {
      position: 'absolute',
      bottom: '20px',
      right: '20px',
      zIndex: 1501,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      color: 'white',
      border: 'none',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '20px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
    },
    content: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderRadius: '5px',
      padding: '20px',
      color: 'white',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
    },
    title: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '10px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      paddingBottom: '10px',
    },
    description: {
      fontSize: '14px',
      lineHeight: '1.5',
      marginBottom: '15px',
    },
    image: {
      width: '100%',
      height: '150px',
      objectFit: 'cover',
      borderRadius: '5px',
      marginBottom: '15px',
    },
    features: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      marginTop: '15px',
    },
    feature: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: '5px 10px',
      borderRadius: '15px',
      fontSize: '12px',
      whiteSpace: 'nowrap',
    },
  };

  return (
    <>
      <button 
        style={styles.toggleButton} 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '×' : 'i'}
      </button>
      <div style={styles.container}>
        <div style={styles.content}>
          <h2 style={styles.title}>{location.name}</h2>
          
          {location.image && (
            <img src={location.image} alt={location.name} style={styles.image} />
          )}
          
          <p style={styles.description}>{location.description}</p>
          
          {location.features && location.features.length > 0 && (
            <div style={styles.features}>
              {location.features.map((feature, index) => (
                <span key={index} style={styles.feature}>{feature}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

InfoPanel.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default InfoPanel; 