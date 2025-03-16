// Styles for the Panorama component
const containerStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'column'
};

const panoramaStyle = {
  flex: 1,
  width: '100%',
  height: '100%'
};

const bottomBarStyle = {
  width: '100%',
  height: '60px',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '20px',
  padding: '10px',
  zIndex: 1001
};

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

export {
  containerStyle,
  panoramaStyle,
  bottomBarStyle,
  buttonStyle
}; 