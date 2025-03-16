import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Pannellum } from 'pannellum-react';

const PanoramaHotspot = ({ yaw, pitch, type, text, id, onClick, sceneId, scale = 1 }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Add custom CSS for hotspots if not already added
    if (!document.getElementById('hotspot-styles')) {
      const style = document.createElement('style');
      style.id = 'hotspot-styles';
      style.textContent = `
        .custom-hotspot {
          width: 40px;
          height: 40px;
          background-color: rgba(0, 0, 0, 0);
          border-radius: 50%;
          cursor: pointer;
          z-index: 1002;
          position: relative;
          transition: transform 0.3s ease-in-out;
        }
        
        .custom-hotspot::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          background-color: rgba(255, 255, 255, 0.5);
          border: 2px solid white;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        
        .custom-hotspot::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 8px;
          height: 8px;
          background-color: white;
          border-radius: 50%;
        }
        
        .custom-hotspot:hover {
          transform: scale(1.2);
        }
        
        .custom-hotspot:hover::before {
          animation: none;
          background-color: rgba(255, 255, 255, 0.8);
        }
        
        .custom-hotspot.clicked::before {
          animation: none;
          background-color: rgba(255, 255, 255, 1);
          width: 30px;
          height: 30px;
          transition: width 0.3s ease-out, height 0.3s ease-out, background-color 0.3s ease-out;
        }
        
        .custom-hotspot.clicked::after {
          background-color: rgba(74, 144, 226, 1);
          width: 12px;
          height: 12px;
          transition: width 0.3s ease-out, height 0.3s ease-out, background-color 0.3s ease-out;
        }
        
        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 1;
          }
          70% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
          100% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0;
          }
        }
        
        @keyframes expand {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
          }
        }
        
        .pnlm-hotspot {
          z-index: 1002 !important;
        }
        
        .pnlm-hotspot div {
          z-index: 1002 !important;
        }
        
        .pnlm-tooltip {
          z-index: 1003 !important;
          background-color: rgba(0, 0, 0, 0.7) !important;
          border-radius: 5px !important;
          padding: 10px 15px !important;
          font-family: Helvetica, Arial, sans-serif !important;
          font-size: 14px !important;
          color: white !important;
          font-weight: bold !important;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2) !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // This function will be passed directly to Pannellum
  // It needs to match the signature expected by the library
  const handleClick = (evt, args) => {
    console.log('==== HOTSPOT CLICK EVENT FROM PANNELLUM ====');
    console.log('Event:', evt);
    console.log('Args:', args);
    
    // Set active state to trigger animation
    setIsActive(true);
    
    // Animation timeout
    setTimeout(() => {
      setIsActive(false);
    }, 800);
    
    // Call parent onClick with hotspot ID
    if (onClick) {
      onClick(id);
    }
  };

  // This is what we'll use to pass to Pannellum as "handleClickArg"
  const clickArgs = {
    id,
    sceneId,
    type,
    text
  };

  return (
    <Pannellum.Hotspot
      yaw={yaw}
      pitch={pitch}
      type="custom"  // Always use "custom" type to ensure our click handler is used
      text={text}
      cssClass={`custom-hotspot ${isActive ? 'clicked' : ''}`}
      scale={scale}
      id={id}
      handleClick={handleClick}
      handleClickArg={clickArgs}  // Pass args that our click handler will receive
    />
  );
};

PanoramaHotspot.propTypes = {
  yaw: PropTypes.number.isRequired,
  pitch: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  sceneId: PropTypes.string,
  scale: PropTypes.number
};

export default PanoramaHotspot; 