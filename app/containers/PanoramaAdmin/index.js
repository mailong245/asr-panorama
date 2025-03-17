// app/components/PanoramaAdmin/index.js
import React, { useState, useEffect } from 'react';
import { Tabs, Tab } from './Tabs';
import LocationsList from './LocationsList';
import LocationEditor from './LocationEditor';
import HotspotEditor from './HotspotEditor';
import PreviewPane from './PreviewPane';
import { Container, EditorContainer, PreviewContainer } from './AdminStyles';
import panoramaLocations from '../../components/Panorama/panoramaData';

export default function PanoramaAdmin() {
  // State management
  const [locations, setLocations] = useState(panoramaLocations);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [selectedHotspotId, setSelectedHotspotId] = useState(null);
  const [activeTab, setActiveTab] = useState('locations');

  // Get the currently selected location
  const selectedLocation = locations.find(loc => loc.id === selectedLocationId);
  
  // Get the currently selected hotspot
  const selectedHotspot = selectedLocation?.hotspots?.find(h => h.id === selectedHotspotId);

  // Handler functions
  const handleLocationSelect = (locationId) => {
    setSelectedLocationId(locationId);
    setSelectedHotspotId(null);
  };

  const handleHotspotSelect = (hotspotId) => {
    setSelectedHotspotId(hotspotId);
  };

  const handleLocationUpdate = (updatedLocation) => {
    setLocations(prev => 
      prev.map(loc => loc.id === updatedLocation.id ? updatedLocation : loc)
    );
  };

  const handleLocationAdd = (newLocation) => {
    setLocations(prev => [...prev, newLocation]);
    setSelectedLocationId(newLocation.id);
  };

  const handleLocationDelete = (locationId) => {
    setLocations(prev => prev.filter(loc => loc.id !== locationId));
    setSelectedLocationId(null);
    setSelectedHotspotId(null);
  };

  const handleHotspotUpdate = (locationId, updatedHotspot) => {
    setLocations(prev => 
      prev.map(loc => {
        if (loc.id === locationId) {
          return {
            ...loc,
            hotspots: loc.hotspots.map(h => 
              h.id === updatedHotspot.id ? updatedHotspot : h
            )
          };
        }
        return loc;
      })
    );
  };

  const handleHotspotAdd = (locationId, newHotspot) => {
    setLocations(prev => 
      prev.map(loc => {
        if (loc.id === locationId) {
          return {
            ...loc,
            hotspots: [...(loc.hotspots || []), newHotspot]
          };
        }
        return loc;
      })
    );
    setSelectedHotspotId(newHotspot.id);
  };

  const handleHotspotDelete = (locationId, hotspotId) => {
    setLocations(prev => 
      prev.map(loc => {
        if (loc.id === locationId) {
          return {
            ...loc,
            hotspots: loc.hotspots.filter(h => h.id !== hotspotId)
          };
        }
        return loc;
      })
    );
    setSelectedHotspotId(null);
  };

  const handleSaveData = () => {
    // In a real app, you'd save to a database or API
    // For a simple example, we'll save to localStorage
    localStorage.setItem('panoramaLocations', JSON.stringify(locations));
    alert('Panorama data saved successfully!');
    
    // Logic to update the actual panoramaData.js file would require a server endpoint
  };

  return (
    <Container>
      <h1>Panorama Administration</h1>
      
      <Tabs activeTab={activeTab} onChange={setActiveTab}>
        <Tab id="locations" label="Locations">
          <EditorContainer>
            <LocationsList 
              locations={locations}
              selectedLocationId={selectedLocationId}
              onSelect={handleLocationSelect}
              onAdd={handleLocationAdd}
              onDelete={handleLocationDelete}
            />
            
            {selectedLocation && (
              <LocationEditor
                location={selectedLocation}
                onUpdate={handleLocationUpdate}
              />
            )}
          </EditorContainer>
        </Tab>
        
        <Tab id="hotspots" label="Hotspots" disabled={!selectedLocation}>
          <EditorContainer>
            {selectedLocation && (
              <>
                <HotspotEditor
                  location={selectedLocation}
                  selectedHotspotId={selectedHotspotId}
                  onSelect={handleHotspotSelect}
                  onAdd={(hotspot) => handleHotspotAdd(selectedLocationId, hotspot)}
                  onUpdate={(hotspot) => handleHotspotUpdate(selectedLocationId, hotspot)}
                  onDelete={(hotspotId) => handleHotspotDelete(selectedLocationId, hotspotId)}
                />
              </>
            )}
          </EditorContainer>
        </Tab>
      </Tabs>
      
      <PreviewContainer>
        <h2>Preview</h2>
        <PreviewPane 
          location={selectedLocation}
          highlightHotspotId={selectedHotspotId}
          onAddHotspot={(coords) => {
            // Logic to add a hotspot at the clicked coordinates
            if (selectedLocation) {
              const newHotspot = {
                id: `hotspot-${Date.now()}`,
                yaw: coords.yaw,
                pitch: coords.pitch,
                type: 'info',
                text: 'New Hotspot',
                scale: 1
              };
              handleHotspotAdd(selectedLocationId, newHotspot);
            }
          }}
        />
      </PreviewContainer>
      
      <button onClick={handleSaveData}>Save Changes</button>
    </Container>
  );
}