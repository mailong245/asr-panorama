import React from 'react';
import PropTypes from 'prop-types';

const LoadingScreen = ({ isLoading, progress }) => {
  const styles = {
    container: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#000',
      display: isLoading ? 'flex' : 'none',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2000,
      color: 'white',
      transition: 'opacity 0.5s ease-in-out',
      opacity: isLoading ? 1 : 0,
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '2rem',
      fontFamily: 'Helvetica, Arial, sans-serif',
    },
    loadingText: {
      fontSize: '1.2rem',
      marginBottom: '1rem',
      fontFamily: 'Helvetica, Arial, sans-serif',
    },
    progressContainer: {
      width: '300px',
      height: '5px',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '5px',
      overflow: 'hidden',
    },
    progressBar: {
      height: '100%',
      backgroundColor: '#fff',
      width: `${progress}%`,
      transition: 'width 0.3s ease-in-out',
    },
    footer: {
      position: 'absolute',
      bottom: '30px',
      fontSize: '0.9rem',
      opacity: 0.7,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>360° Virtual Tour</div>
      <div style={styles.loadingText}>Loading virtual tour. Please wait...</div>
      <div style={styles.progressContainer}>
        <div style={styles.progressBar}></div>
      </div>
      <div style={styles.footer}>
        360° Virtual Tour by Your Company
      </div>
    </div>
  );
};

LoadingScreen.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  progress: PropTypes.number.isRequired,
};

export default LoadingScreen; 