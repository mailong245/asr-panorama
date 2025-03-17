// app/components/PanoramaAdmin/PreviewPane.js
import React, { useRef, useEffect } from 'react';
import { Pannellum } from 'pannellum-react';
import styled from 'styled-components';

const PreviewContainer = styled.div`
  width: 100%;
  height: 400px;
  position: relative;
`;

export default function PreviewPane({ location, highlightHotspotId, onAddHotspot }) {
  const pannellumRef = useRef(null);

  // Handle panorama click to add hotspot
  const handleClick = (event) => {
    if (pannellumRef.current) {
      const viewer = pannellumRef.current.getViewer();
      const coords = viewer.mouseEventToCoords(event);
      
      if (onAddHotspot) {
        onAddHotspot({
          yaw: coords[0],
          pitch: coords[1]
        });
      }
    }
  };

  if (!location) {
    return <div>Select a location to preview</div>;
  }

  return (
    <PreviewContainer>
      <Pannellum
        ref={pannellumRef}
        width="100%"
        height="100%"
        image={location.panoramaImage}
        yaw={location.initialViewParams?.yaw || 0}
        pitch={location.initialViewParams?.pitch || 0}
        hfov={location.initialViewParams?.hfov || 110}
        autoLoad
        showZoomCtrl={true}
        onLoad={() => console.log('Preview loaded')}
        onMousedown={handleClick}
      >
        {location.hotspots?.map(hotspot => (
          <Pannellum.Hotspot
            key={hotspot.id}
            yaw={hotspot.yaw}
            pitch={hotspot.pitch}
            type={hotspot.type || 'info'}
            text={hotspot.text}
            cssClass={`custom-hotspot ${hotspot.id === highlightHotspotId ? 'highlighted' : ''}`}
            scale={hotspot.scale}
            id={hotspot.id}
          />
        ))}
      </Pannellum>
      <div className="instructions">
        <p>Click on the panorama to add a hotspot at that location</p>
      </div>
    </PreviewContainer>
  );
}