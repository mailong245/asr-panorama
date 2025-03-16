import React, { useRef, useState, useEffect } from 'react';
import { Pannellum } from 'pannellum-react';
import PropTypes from 'prop-types';
import { containerStyle, panoramaStyle, bottomBarStyle, buttonStyle } from './PanoramaStyles';
import LoadingScreen from './LoadingScreen';
import NavigationMenu from './NavigationMenu';
import InfoPanel from './InfoPanel';
import TransitionEffect from './TransitionEffect';
import panoramaLocations from './panoramaData';
import Container from './Container';
// import Container from './Container';
import PanoramaView from './PanoramaView';
import BottomBar from './BottomBar';

export default function Panorama(props) {
  Panorama.propTypes = {
    initialLocation: PropTypes.string,
    panoramaData: PropTypes.array,
    onClose: PropTypes.func
  };

  const pannellumRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentLocationId, setCurrentLocationId] = useState(props.initialLocation || 'entrance');
  const [targetLocationId, setTargetLocationId] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hfov, setHfov] = useState(110);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeHotspotId, setActiveHotspotId] = useState(null);

  // Use provided data or default panoramaLocations
  const locations = props.panoramaData || panoramaLocations;

  // Get current location data
  const currentLocation = locations.find(location => location.id === currentLocationId) || locations[0];

  useEffect(() => {
    // Hide Pannellum default controls
    const controlsContainer = document.querySelector('.pnlm-controls-container');
    if (controlsContainer) {
      controlsContainer.style.display = 'none';
    }

    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
      progress += 5;
      setLoadingProgress(progress);
      if (progress >= 100) {
        clearInterval(loadingInterval);
        setTimeout(() => {
          setIsLoading(false);
        }, 500); // Small delay to ensure images are loaded
      }
    }, 100);

    return () => clearInterval(loadingInterval);
  }, []);

  // Update view parameters when location changes
  useEffect(() => {
    if (!isLoading && pannellumRef.current && currentLocation) {
      const viewParams = currentLocation.initialViewParams || { yaw: 0, pitch: 0, hfov: 110 };
      const yaw = viewParams.yaw || 0;
      const pitch = viewParams.pitch || 0;
      const viewHfov = viewParams.hfov || 110;

      pannellumRef.current.getViewer().setYaw(yaw);
      pannellumRef.current.getViewer().setPitch(pitch);
      setHfov(viewHfov);
    }
  }, [currentLocationId, isLoading, currentLocation]);

  // useEffect(() => {
  //   // Add a global hotspot click handler for debugging
  //   window.handlePanoramaHotspotClick = (hotspotId) => {
  //     console.log('Global hotspot handler called with:', hotspotId);
  //     handleHotspotClick(hotspotId);
  //   };

  //   return () => {
  //     // Clean up the global handler when component unmounts
  //     delete window.handlePanoramaHotspotClick;
  //   };
  // }, []);

  const handleHotspotClick = (hotspotId) => {
    try {
      console.log('==== PANORAMA COMPONENT: HOTSPOT CLICK ====');
      console.log('Hotspot clicked:', hotspotId);

      // Set the active hotspot ID
      setActiveHotspotId(hotspotId);

      if (!currentLocation || !currentLocation.hotspots) {
        console.error('No current location or hotspots defined!');
        console.log('Current location:', currentLocation);
        return;
      }

      const hotspot = currentLocation.hotspots.find(h => h.id === hotspotId);
      console.log('Hotspot found:', hotspot);

      // Handle both "scene" and "custom" type hotspots for navigation
      if (hotspot && (hotspot.type === 'scene' || hotspot.type === 'custom') && hotspot.sceneId) {
        console.log('Transitioning to scene:', hotspot.sceneId);

        // Make sure the target scene exists
        const targetScene = locations.find(loc => loc.id === hotspot.sceneId);
        if (targetScene) {
          console.log('Target scene found:', targetScene.name);
          console.log('Target scene image:', targetScene.panoramaImage);
          // Start transition animation
          setTargetLocationId(hotspot.sceneId);
          setIsTransitioning(true);
        } else {
          console.error('Target scene not found for sceneId:', hotspot.sceneId);
          console.log('Available scenes:', locations.map(l => l.id));
        }
      } else if (hotspot && hotspot.type === 'info') {
        console.log('Info hotspot clicked:', hotspot.text);
        // Handle info hotspot if needed
      } else {
        console.error('No valid hotspot found or hotspot missing data');
        console.log('All available hotspots:', currentLocation.hotspots);
      }
      console.log('=========================================');
    } catch (error) {
      console.error('Error in handleHotspotClick:', error);
    }
  };

  const handleTransitionEnd = () => {
    // When transition animation ends, update the current location
    if (targetLocationId) {
      console.log('Transition ended, changing scene to:', targetLocationId);
      setCurrentLocationId(targetLocationId);
      setTargetLocationId(null);

      // Small delay to ensure the new scene loads before hiding the transition
      setTimeout(() => {
        setIsTransitioning(false);
        console.log('Transition overlay hidden, new scene visible');
      }, 300);
    }
  };

  const handleLocationChange = (locationId) => {
    // Use the same transition animation for menu navigation
    setTargetLocationId(locationId);
    setIsTransitioning(true);
  };

  const handleZoomIn = () => {
    setHfov(prevHfov => Math.max(prevHfov - 10, 50));
  };

  const handleZoomOut = () => {
    setHfov(prevHfov => Math.min(prevHfov + 10, 140));
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
    <div id="panorama">
      <Container >

        {/* Loading Screen */}
        <LoadingScreen isLoading={isLoading} progress={loadingProgress} />

        {/* Transition Effect */}
        <TransitionEffect
          isActive={isTransitioning}
          onTransitionEnd={handleTransitionEnd}
        />

        <PanoramaView>
          <Pannellum
            ref={pannellumRef}
            width="100%"
            height="100%"
            image={currentLocation.panoramaImage}
            yaw={currentLocation.initialViewParams && currentLocation.initialViewParams.yaw ? currentLocation.initialViewParams.yaw : 0}
            pitch={currentLocation.initialViewParams && currentLocation.initialViewParams.pitch ? currentLocation.initialViewParams.pitch : 0}
            hfov={hfov}
            autoLoad
            showZoomCtrl={false}
            onLoad={() => {
              console.log('panorama loaded');
            }}
          >
            {/* Render hotspots for current location */}
            {currentLocation.hotspots && currentLocation.hotspots.map(hotspot => (
              <Pannellum.Hotspot
                yaw={hotspot.yaw}
                pitch={hotspot.pitch}
                type={hotspot.type || 'info'}  // Always use "custom" type to ensure our click handler is used
                text={hotspot.text}
                cssClass={`custom-hotspot ${activeHotspotId === hotspot.id ? 'clicked' : ''}`}
                scale={hotspot.scale}
                id={hotspot.id}
                handleClick={() => handleHotspotClick(hotspot.id)}
              />
            ))}
          </Pannellum>
        </PanoramaView>

        {/* Navigation Menu */}
        <NavigationMenu
          locations={locations}
          currentLocation={currentLocationId}
          onLocationChange={handleLocationChange}
        />

        {/* Info Panel */}
        <InfoPanel location={currentLocation} />

        {/* Bottom Control Bar */}
        <BottomBar>
          <button
            style={buttonStyle}
            onClick={props.onClose || (() => window.location.href = '/')}
          >
            🏠 Exit Tour
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
      </Container>
    </div>
  );
}