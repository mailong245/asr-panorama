import React, { useRef, useState } from 'react';
import { Pannellum } from 'pannellum-react';
import Container from './Container';
import PanoramaView from './PanoramaView';
import BottomBar from './BottomBar';

export default function Panorama() {
  const pannellumRef = useRef(null);
  const [hfov, setHfov] = useState(110);
  const [isFullscreen, setIsFullscreen] = useState(false);

//   const containerStyle = {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     width: '100vw',
//     height: '100vh',
//     zIndex: 1000,
//     display: 'flex',
//     flexDirection: 'column'
//   };

//   const panoramaStyle = {
//     flex: 1,
//     width: '100%',
//     height: '100%'
//   };

//   const bottomBarStyle = {
//     width: '100%',
//     height: '60px',
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: '20px',
//     padding: '10px',
//     zIndex: 1001
//   };

  const buttonStyle = {
    padding: '8px 16px',
    backgroundColor: '#4a90e2',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '14px'
  };

  const handleZoomIn = () => {
    setHfov(prevHfov => Math.max(prevHfov - 10, 30));
  };

  const handleZoomOut = () => {
    setHfov(prevHfov => Math.min(prevHfov + 10, 180));
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.getElementById('panorama').requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div id = "panorama">
      <PanoramaView>
        <Pannellum
          ref={pannellumRef}
          width="100%"
          height="100%"
          image="https://images.unsplash.com/photo-1557971370-e7298ee473fb?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          pitch={10}
          yaw={180}
          hfov={hfov}
          autoLoad
          showZoomCtrl={false}
          onLoad={() => {
            console.log('panorama loaded');
          }}
          hotspots={[
            {
              pitch: 0,
              yaw: 50,
              type: "scene",
              text: "Go to next location",
              sceneId: "scene2"
            },
            {
              pitch: 0,
              yaw: 90,
              type: "info",
              text: "Click here for more info"
            }
          ]}
        />
      </PanoramaView>
      <BottomBar>
        <button 
          style={buttonStyle}
          onClick={() => window.location.href = '/'}
        >
          🏠 Go to Panorama Page
        </button>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={buttonStyle} onClick={handleZoomIn}>
            🔍+ Zoom In
          </button>
          <button style={buttonStyle} onClick={handleZoomOut}>
            🔍- Zoom Out
          </button>
          <button 
            style={{
              ...buttonStyle,
              backgroundColor: isFullscreen ? '#e24a4a' : '#4a90e2'
            }} 
            onClick={handleFullscreen}
          >
            {isFullscreen ? '⤓ Exit Fullscreen' : '⤢ Fullscreen'}
          </button>
        </div>
      </BottomBar>
    </div>
  );
}