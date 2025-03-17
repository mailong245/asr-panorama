// app/components/PanoramaAdmin/Tabs.js
import React from 'react';
import styled from 'styled-components';

const TabContainer = styled.div`
  margin-bottom: 20px;
`;

const TabList = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  border: none;
  background: ${props => props.active ? '#4a90e2' : 'transparent'};
  color: ${props => props.active ? 'white' : 'black'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  
  &:hover {
    background: ${props => props.active ? '#4a90e2' : props.disabled ? 'transparent' : '#f0f0f0'};
  }
`;

const TabContent = styled.div`
  padding: 20px 0;
`;

export function Tabs({ children, activeTab, onChange }) {
  // Filter only Tab components
  const tabs = React.Children.toArray(children).filter(
    child => React.isValidElement(child) && child.type === Tab
  );
  
  return (
    <TabContainer>
      <TabList>
        {tabs.map(tab => (
          <TabButton
            key={tab.props.id}
            active={activeTab === tab.props.id}
            disabled={tab.props.disabled}
            onClick={() => !tab.props.disabled && onChange(tab.props.id)}
          >
            {tab.props.label}
          </TabButton>
        ))}
      </TabList>
      
      <TabContent>
        {tabs.find(tab => tab.props.id === activeTab)}
      </TabContent>
    </TabContainer>
  );
}

export function Tab({ children, id, label, disabled }) {
  return children;
}