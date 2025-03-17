// app/components/PanoramaAdmin/LocationEditor.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const EditorForm = styled.div`
  padding: 20px;
  flex-grow: 1;
`;

export default function LocationEditor({ location, onUpdate }) {
  const [editedLocation, setEditedLocation] = useState(location);

  useEffect(() => {
    setEditedLocation(location);
  }, [location]);

  const handleChange = (field, value) => {
    setEditedLocation({
      ...editedLocation,
      [field]: value
    });
  };

  const handleViewParamChange = (param, value) => {
    setEditedLocation({
      ...editedLocation,
      initialViewParams: {
        ...editedLocation.initialViewParams,
        [param]: parseFloat(value)
      }
    });
  };

  const handleSave = () => {
    onUpdate(editedLocation);
  };

  return (
    <EditorForm>
      <h3>Edit Location: {location.name}</h3>
      
      <div>
        <label>
          Name:
          <input
            type="text"
            value={editedLocation.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </label>
      </div>
      
      <div>
        <label>
          Panorama Image URL:
          <input
            type="text"
            value={editedLocation.panoramaImage}
            onChange={(e) => handleChange('panoramaImage', e.target.value)}
          />
        </label>
      </div>
      
      <div>
        <label>
          Description:
          <textarea
            value={editedLocation.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />
        </label>
      </div>
      
      <h4>Initial View Parameters</h4>
      <div>
        <label>
          Yaw:
          <input
            type="number"
            value={editedLocation.initialViewParams?.yaw || 0}
            onChange={(e) => handleViewParamChange('yaw', e.target.value)}
          />
        </label>
      </div>
      
      <div>
        <label>
          Pitch:
          <input
            type="number"
            value={editedLocation.initialViewParams?.pitch || 0}
            onChange={(e) => handleViewParamChange('pitch', e.target.value)}
          />
        </label>
      </div>
      
      <div>
        <label>
          Field of View (HFOV):
          <input
            type="number"
            value={editedLocation.initialViewParams?.hfov || 110}
            onChange={(e) => handleViewParamChange('hfov', e.target.value)}
          />
        </label>
      </div>
      
      <button onClick={handleSave}>Save Changes</button>
    </EditorForm>
  );
}