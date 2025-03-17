// app/components/PanoramaAdmin/HotspotEditor.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const EditorContainer = styled.div`
  display: flex;
  width: 100%;
`;

const HotspotList = styled.div`
  width: 300px;
  border-right: 1px solid #ddd;
`;

const HotspotForm = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

export default function HotspotEditor({ 
  location, 
  selectedHotspotId, 
  onSelect, 
  onAdd, 
  onUpdate, 
  onDelete 
}) {
  const [editedHotspot, setEditedHotspot] = useState(null);
  const [newHotspot, setNewHotspot] = useState({
    type: 'info',
    text: '',
    yaw: 0,
    pitch: 0,
    scale: 1
  });

  // Find the selected hotspot
  const selectedHotspot = location.hotspots?.find(h => h.id === selectedHotspotId);

  // Update editedHotspot when selectedHotspot changes
  useEffect(() => {
    setEditedHotspot(selectedHotspot || null);
  }, [selectedHotspot]);

  const handleHotspotChange = (field, value) => {
    if (!editedHotspot) return;
    
    setEditedHotspot({
      ...editedHotspot,
      [field]: field === 'scale' || field === 'yaw' || field === 'pitch' 
        ? parseFloat(value) 
        : value
    });
  };

  const handleSaveHotspot = () => {
    if (editedHotspot) {
      onUpdate(editedHotspot);
    }
  };

  const handleAddHotspot = () => {
    if (newHotspot.text) {
      const id = `hotspot-${Date.now()}`;
      onAdd({
        ...newHotspot,
        id
      });
      setNewHotspot({
        type: 'info',
        text: '',
        yaw: 0,
        pitch: 0,
        scale: 1
      });
    }
  };

  return (
    <EditorContainer>
      <HotspotList>
        <h3>Hotspots for {location.name}</h3>
        <ul>
          {location.hotspots?.map(hotspot => (
            <li 
              key={hotspot.id}
              className={hotspot.id === selectedHotspotId ? 'selected' : ''}
              onClick={() => onSelect(hotspot.id)}
            >
              {hotspot.text || hotspot.id}
              <button onClick={(e) => {
                e.stopPropagation();
                onDelete(hotspot.id);
              }}>Delete</button>
            </li>
          ))}
        </ul>
        
        <div>
          <h4>Add New Hotspot</h4>
          <div>
            <label>
              Text:
              <input
                type="text"
                value={newHotspot.text}
                onChange={(e) => setNewHotspot({...newHotspot, text: e.target.value})}
              />
            </label>
          </div>
          
          <div>
            <label>
              Type:
              <select
                value={newHotspot.type}
                onChange={(e) => setNewHotspot({...newHotspot, type: e.target.value})}
              >
                <option value="info">Info</option>
                <option value="custom">Custom</option>
                <option value="scene">Scene</option>
              </select>
            </label>
          </div>
          
          {(newHotspot.type === 'scene' || newHotspot.type === 'custom') && (
            <div>
              <label>
                Target Scene ID:
                <input
                  type="text"
                  value={newHotspot.sceneId || ''}
                  onChange={(e) => setNewHotspot({...newHotspot, sceneId: e.target.value})}
                />
              </label>
            </div>
          )}
          
          <div>
            <label>
              Yaw:
              <input
                type="number"
                value={newHotspot.yaw}
                onChange={(e) => setNewHotspot({...newHotspot, yaw: parseFloat(e.target.value)})}
              />
            </label>
          </div>
          
          <div>
            <label>
              Pitch:
              <input
                type="number"
                value={newHotspot.pitch}
                onChange={(e) => setNewHotspot({...newHotspot, pitch: parseFloat(e.target.value)})}
              />
            </label>
          </div>
          
          <div>
            <label>
              Scale:
              <input
                type="number"
                value={newHotspot.scale}
                step="0.1"
                onChange={(e) => setNewHotspot({...newHotspot, scale: parseFloat(e.target.value)})}
              />
            </label>
          </div>
          
          <button onClick={handleAddHotspot}>Add Hotspot</button>
        </div>
      </HotspotList>
      
      {editedHotspot && (
        <HotspotForm>
          <h3>Edit Hotspot</h3>
          
          <div>
            <label>
              Text:
              <input
                type="text"
                value={editedHotspot.text}
                onChange={(e) => handleHotspotChange('text', e.target.value)}
              />
            </label>
          </div>
          
          <div>
            <label>
              Type:
              <select
                value={editedHotspot.type}
                onChange={(e) => handleHotspotChange('type', e.target.value)}
              >
                <option value="info">Info</option>
                <option value="custom">Custom</option>
                <option value="scene">Scene</option>
              </select>
            </label>
          </div>
          
          {(editedHotspot.type === 'scene' || editedHotspot.type === 'custom') && (
            <div>
              <label>
                Target Scene ID:
                <input
                  type="text"
                  value={editedHotspot.sceneId || ''}
                  onChange={(e) => handleHotspotChange('sceneId', e.target.value)}
                />
              </label>
            </div>
          )}
          
          <div>
            <label>
              Yaw:
              <input
                type="number"
                value={editedHotspot.yaw}
                onChange={(e) => handleHotspotChange('yaw', e.target.value)}
              />
            </label>
          </div>
          
          <div>
            <label>
              Pitch:
              <input
                type="number"
                value={editedHotspot.pitch}
                onChange={(e) => handleHotspotChange('pitch', e.target.value)}
              />
            </label>
          </div>
          
          <div>
            <label>
              Scale:
              <input
                type="number"
                value={editedHotspot.scale}
                step="0.1"
                onChange={(e) => handleHotspotChange('scale', e.target.value)}
              />
            </label>
          </div>
          
          <button onClick={handleSaveHotspot}>Save Changes</button>
        </HotspotForm>
      )}
    </EditorContainer>
  );
}