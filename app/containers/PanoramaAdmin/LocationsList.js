// app/components/PanoramaAdmin/LocationsList.js
import React, { useState } from 'react';
import styled from 'styled-components';

const ListContainer = styled.div`
  width: 300px;
  border-right: 1px solid #ddd;
`;

export default function LocationsList({ locations, selectedLocationId, onSelect, onAdd, onDelete }) {
  const [newLocation, setNewLocation] = useState({ name: '', panoramaImage: '' });

  const handleAddLocation = () => {
    if (newLocation.name && newLocation.panoramaImage) {
      const id = `location-${Date.now()}`;
      onAdd({
        id,
        name: newLocation.name,
        panoramaImage: newLocation.panoramaImage,
        description: 'New location',
        initialViewParams: { yaw: 0, pitch: 0, hfov: 110 },
        hotspots: []
      });
      setNewLocation({ name: '', panoramaImage: '' });
    }
  };

  return (
    <ListContainer>
      <h3>Locations</h3>
      <ul>
        {locations.map(location => (
          <li 
            key={location.id}
            className={location.id === selectedLocationId ? 'selected' : ''}
            onClick={() => onSelect(location.id)}
          >
            {location.name}
            <button onClick={(e) => {
              e.stopPropagation();
              onDelete(location.id);
            }}>Delete</button>
          </li>
        ))}
      </ul>
      
      <div>
        <h4>Add New Location</h4>
        <input
          type="text"
          placeholder="Location Name"
          value={newLocation.name}
          onChange={(e) => setNewLocation({...newLocation, name: e.target.value})}
        />
        <input
          type="text"
          placeholder="Panorama Image URL"
          value={newLocation.panoramaImage}
          onChange={(e) => setNewLocation({...newLocation, panoramaImage: e.target.value})}
        />
        <button onClick={handleAddLocation}>Add Location</button>
      </div>
    </ListContainer>
  );
}