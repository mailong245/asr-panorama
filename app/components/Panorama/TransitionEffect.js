import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const TransitionEffect = ({ isActive, onTransitionEnd }) => {
  const styles = {
    container: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1900,
      opacity: isActive ? 1 : 0,
      visibility: isActive ? 'visible' : 'hidden',
      transition: 'opacity 0.8s ease-in-out, visibility 0.8s ease-in-out',
      pointerEvents: isActive ? 'auto' : 'none',
    },
    spinner: {
      width: '80px',
      height: '80px',
      border: '6px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '50%',
      borderTop: '6px solid #ffffff',
      animation: 'spin 1s linear infinite',
      boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
    },
    spinnerInner: {
      position: 'absolute',
      width: '40px',
      height: '40px',
      border: '4px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '50%',
      borderTop: '4px solid #ffffff',
      animation: 'spin 1.5s linear infinite reverse',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    message: {
      position: 'absolute',
      bottom: '120px',
      color: 'white',
      fontSize: '20px',
      fontFamily: 'Helvetica, Arial, sans-serif',
      textAlign: 'center',
      animation: 'fade 2s infinite',
      fontWeight: 'bold',
      textShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
    }
  };

  useEffect(() => {
    // Add the keyframes for the spin animation
    if (!document.getElementById('spinner-keyframes')) {
      const style = document.createElement('style');
      style.id = 'spinner-keyframes';
      style.textContent = `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes fade {
          0% { opacity: 0.7; }
          50% { opacity: 1; }
          100% { opacity: 0.7; }
        }
      `;
      document.head.appendChild(style);
    }

    if (isActive) {
      // Use a slightly longer delay to ensure the animation is visible
      const timer = setTimeout(() => {
        if (onTransitionEnd) {
          onTransitionEnd();
        }
      }, 1800); // Duration of transition animation
      
      return () => clearTimeout(timer);
    }
  }, [isActive, onTransitionEnd]);

  return (
    <div style={styles.container}>
      <div style={styles.spinner}>
        <div style={styles.spinnerInner}></div>
      </div>
      <div style={styles.message}>Transitioning to next location...</div>
    </div>
  );
};

TransitionEffect.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onTransitionEnd: PropTypes.func,
};

export default TransitionEffect; 