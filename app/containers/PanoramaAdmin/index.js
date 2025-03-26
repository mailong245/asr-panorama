// app/components/PanoramaAdmin.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PanoramaData from '../../../data/PanoramaData.json'; // Adjust the path as necessary

const AdminContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.h1`
  text-align: center;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #357abf;
  }
`;

const LocationList = styled.ul`
  list-style: none;
  padding: 0;
`;

const LocationItem = styled.li`
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
`;

const PanoramaAdmin = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newLocation, setNewLocation] = useState({ name: '', panoramaImage: '', description: '', initialViewParams: { yaw: 0, pitch: 0, hfov: 110 }, hotspots: [] });

  // We will have fetch logic later
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = PanoramaData;
  //       setLocations(data);
  //     } catch (error) {
  //       console.error('Error fetching panorama data:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const handleAddLocation = () => {
    const id = `location-${Date.now()}`;
    setLocations([...locations, { ...newLocation, id }]);
    setNewLocation({ name: '', panoramaImage: '', description: '', initialViewParams: { yaw: 0, pitch: 0, hfov: 110 }, hotspots: [] });
  };

  const handleSaveData = () => {
    const dataStr = `const panoramaLocations = ${JSON.stringify(locations, null, 2)};\n\nexport default panoramaLocations;`;
    const blob = new Blob([dataStr], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'PanoramaData.js');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AdminContainer>
      <Header>Panorama Data Administration</Header>
      <h2>Add New Location</h2>
      <Input type="text" placeholder="Location Name" value={newLocation.name} onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })} />
      <Input type="text" placeholder="Panorama Image URL" value={newLocation.panoramaImage} onChange={(e) => setNewLocation({ ...newLocation, panoramaImage: e.target.value })} />
      <TextArea placeholder="Description" value={newLocation.description} onChange={(e) => setNewLocation({ ...newLocation, description: e.target.value })} />
      <Button onClick={handleAddLocation}>Add Location</Button>

      <h2>Existing Locations</h2>
      <LocationList>
        {locations.map(location => (
          <LocationItem key={location.id}>
            <div>{location.name}</div>
            <Button onClick={() => console.log(location)}>Edit</Button>
          </LocationItem>
        ))}
      </LocationList>

      <Button onClick={handleSaveData}>Save Changes to JSON</Button>
    </AdminContainer>
  );
};

export default PanoramaAdmin;